import {withRouter, Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

const Header = () => (
  <div className="header-container">
    <Link to="/">
      <img
        src="https://res.cloudinary.com/dorxrzhje/image/upload/v1711444523/music_geglcu.svg"
        alt="website logo"
        className="header-icon"
      />
    </Link>
    <GiHamburgerMenu aria-label="button" className="hamberger-icon" />
  </div>
)

export default withRouter(Header)
