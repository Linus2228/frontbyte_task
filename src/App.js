import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { keepAliveStart, logout } from './actions/authActions'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/Dashboard'
import UsersList from './components/UsersList/UsersList'
import UserDetails from './components/UserDetails/UserDetails'
import NotFound from './components/NotFound/NotFound'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const isUser = !!useSelector(state => state.auth.currentUser.userName)
  const dispatch = useDispatch()

  useEffect(() => {
    keepAliveStart(dispatch)
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout('See you soon!'))
  }

  return (
    <div>
      <Header isUser={isUser} handleLogout={handleLogout} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users/:id" component={UserDetails} />
        <Route path="/users" component={UsersList} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
