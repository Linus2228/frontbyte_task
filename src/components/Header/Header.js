import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import LanguageControl from '../LanguageControl/LanguageControl'
import { HeaderInt } from '../../utils/int'

import './header.css'

const useStyles = makeStyles(theme => ({
  button: {
    padding: '2px',
    textTransform: 'none'
  }
}))

const Header = ({ isUser, handleLogout }) => {
  const classes = useStyles()
  const lang = useSelector(state => state.controls.lang.value)
  const { home, dashboard, users, logout } = HeaderInt[lang]

  return (
    <div className="header-wrapper">
      <ul className="header">
        <li>
          <Link to="/">{home}</Link>
        </li>
        {isUser && (
          <>
            <li>
              <Link to="/dashboard">{dashboard}</Link>
            </li>
            <li>
              <Link to="/users">{users}</Link>
            </li>
            <Button
              className={classes.button}
              variant="contained"
              onClick={handleLogout}
            >
              {logout}
            </Button>
          </>
        )}
      </ul>
      <LanguageControl />
    </div>
  )
}

Header.propTypes = {
  isUser: PropTypes.bool,
  handleLogout: PropTypes.func.isRequired
}

export default Header
