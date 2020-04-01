import { createSelector } from 'reselect'

const selectAllTrainings = state => state.company.summary.data.Trainings

export const selectTrainings = createSelector(
  selectAllTrainings,
  allTrainings =>
    allTrainings.map(item => ({
      name: item.Name,
      uv: item.Progress,
      pv: 1400,
      amt: 2400
    }))
)

const selectAllNationalities = state => state.company.nationalities.data

export const selectNationalities = createSelector(
  selectAllNationalities,
  allNationalities =>
    allNationalities
      .map(nationality => ({ ...nationality }))
      .sort((a, b) => a.Order - b.Order)
      .map(nationality => ({ value: nationality.Id, label: nationality.Name }))
)

const selectAllUsers = state => state.company.users.data

export const selectUsers = search => {
  return createSelector(
    selectAllUsers,
    allUsers =>
      allUsers.filter(user =>
        user.Firstname.toLowerCase().includes(search.toLowerCase())
      )
  )
}
