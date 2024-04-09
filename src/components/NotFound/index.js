import {Link} from 'react-router-dom'
import {FaArrowLeft} from 'react-icons/fa'
import Header from '../Header'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <Header />
    <div>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button className="back-button" type="button">
          <FaArrowLeft className="back-icon" />
          <p className="back-text">Home Page</p>
        </button>
      </Link>
      <div className="not-found-text-container">
        <img
          src="https://res.cloudinary.com/dorxrzhje/image/upload/v1712323712/Frame_153_qdswqk.png"
          alt="page not found"
          className="page-not-found-img"
        />
        <h1 className="page-not-found">Page Not Found</h1>
      </div>
    </div>
  </div>
)

export default NotFound
