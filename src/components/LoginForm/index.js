import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isLoginError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({isLoginError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, isLoginError, errorMsg} = this.state
    return (
      <div className="bg-container">
        <div className="card-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <img
              src="https://res.cloudinary.com/dorxrzhje/image/upload/v1711444523/music_geglcu.svg"
              alt="login website logo"
              className="logo"
            />
            <h1 className="login-heading">Spotify Remix</h1>
            <div className="each-input-container">
              <label className="login-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="login-input"
                value={username}
                onChange={this.onChangeUsername}
              />
              <label className="login-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                className="login-input"
                id="password"
                value={password}
                onChange={this.onChangePassword}
              />
              <button type="submit" className="login-btn">
                LOGIN
              </button>
              {isLoginError && <p className="error-msg">*{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
