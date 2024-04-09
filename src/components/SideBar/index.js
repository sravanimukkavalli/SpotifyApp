import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const SideBar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dorxrzhje/image/upload/v1711444523/music_geglcu.svg"
          alt="website logo"
          className="header-icon"
        />
      </Link>
      <div className="">
        <button
          className="button logout-text logout-container"
          type="button"
          onClick={onClickLogout}
        >
          <img
            src="https://res.cloudinary.com/dorxrzhje/image/upload/v1711457819/log-out-04_tptb4j.svg"
            alt="logout"
            className="logout-icon"
          />
          Logout
        </button>
      </div>
    </div>
  )
}
export default withRouter(SideBar)
