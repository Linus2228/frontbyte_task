import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../../hooks'
import { validateLoginForm as validate } from '../../utils/validation'

const initialUserData = {
  User: 'Admin',
  Password: 'Demo2020',
  Company: 'DemoCompany'
}

const Login = ({ loginUser, loginFormInt }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    loginUser,
    validate,
    initialUserData
  )

  return (
    <div className="section is-fullheight">
      <div className="container">
        <div className="column is-4 is-offset-3">
          <div className="box">
            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label className="label">{loginFormInt.name}</label>
                <div className="control">
                  <input
                    autoComplete="on"
                    className={`input ${errors.User && 'is-danger'}`}
                    type="text"
                    name="User"
                    onChange={handleChange}
                    value={values.User || ''}
                    required
                  />
                  {errors.User && (
                    <p className="help is-danger">{errors.User}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">{loginFormInt.company}</label>
                <div className="control">
                  <input
                    autoComplete="on"
                    className={`input ${errors.Company && 'is-danger'}`}
                    type="text"
                    name="Company"
                    onChange={handleChange}
                    value={values.Company || ''}
                    required
                  />
                  {errors.Company && (
                    <p className="help is-danger">{errors.Company}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">{loginFormInt.password}</label>
                <div className="control">
                  <input
                    autoComplete="on"
                    className={`input ${errors.Password && 'is-danger'}`}
                    type="password"
                    name="Password"
                    onChange={handleChange}
                    value={values.Password || ''}
                    required
                  />
                  {errors.Password && (
                    <p className="help is-danger">{errors.Password}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="button is-block is-info is-fullwidth"
              >
                {loginFormInt.login}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginFormInt: PropTypes.object.isRequired
}

export default Login
