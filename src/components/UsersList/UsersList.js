import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useProtectRoute } from '../../hooks'
import {
  getUsers,
  getNationalities,
  getNationalitiesHash
} from '../../actions/companyActions'
import { CircularLoader as Loader } from '../Loaders'
import UsersTable from './UsersTable'
import { UsersListInt } from '../../utils/int'
import { selectUsers } from '../../utils/selectors'

const initialNationalitiesHash = {}

const UsersList = () => {
  const [search, setSearch] = useState('')
  const { data: fetchedUsers, loading: isUsersLoading } = useSelector(
    state => state.company.users
  )
  const filteredUsers = useSelector(selectUsers(search))
  const { data: nationalities, loading: isNationalitiesLoading } = useSelector(
    state => state.company.nationalities
  )
  const isNationalities = nationalities.length !== 0
  const isFetchedUsers = fetchedUsers.length !== 0
  const nationalitiesHash = useSelector(
    state => state.company.nationalitiesHash
  )
  const lang = useSelector(state => state.controls.lang.value)
  const { title, searchTitle } = UsersListInt[lang]

  const dispatch = useDispatch()
  const isLoading =
    !isFetchedUsers ||
    !isNationalities ||
    isUsersLoading ||
    isNationalitiesLoading

  const isNationalitiesHash = Object.keys(nationalitiesHash).length !== 0

  const getActions = () => {
    const actions = []
    if (!isNationalities) {
      actions.push(getNationalities())
    }
    if (!isFetchedUsers) {
      actions.push(getUsers())
    }
    return actions
  }

  useProtectRoute(getActions())

  if (isLoading) return <Loader />

  const getNationalityObject = code => {
    const nationalityObject = nationalities.find(item => item.Id === code)
    initialNationalitiesHash[code] = nationalityObject
    return nationalityObject
  }

  const users = filteredUsers
    .map((user, index, array) => {
      const nationalityCode = user.Nationality
      let nationalityObject

      if (isNationalitiesHash) {
        nationalityObject = nationalitiesHash[nationalityCode]
      } else {
        nationalityObject =
        initialNationalitiesHash[nationalityCode] ||
        getNationalityObject(nationalityCode)

        if (index === array.length - 1 && !isNationalitiesHash) {
          dispatch(getNationalitiesHash(initialNationalitiesHash))
        }
      }
      const { Name, Order } = nationalityObject
      return { ...user, NationalityName: Name, Order }
    })
    .sort((a, b) => a.Order - b.Order)

  return (
    <div>
      <h1>{title}</h1>
      <label>
        {searchTitle}
        <input
          type="text"
          name="name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </label>
      <UsersTable users={users} search={search} lang={lang} />
    </div>
  )
}

export default UsersList
