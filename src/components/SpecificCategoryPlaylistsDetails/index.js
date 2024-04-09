import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaArrowLeft} from 'react-icons/fa'
import Header from '../Header'
import SideBar from '../SideBar'
import SpecificCategoryItem from '../SpecificCategoryItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class SpecificCategoryPlaylistsDetails extends Component {
  state = {
    specificPlaylist: [],
    apiStatus: apiStatusConstants.initial,
    screenSize: window.innerWidth,
  }

  componentDidMount() {
    this.getSpecificPlaylist()
  }

  getSpecificPlaylist = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const updatedData = data.playlists.items.map(each => ({
      collaborative: each.collaborative,
      description: each.description,
      id: each.id,
      href: each.href,
      name: each.name,
      totalTracks: each.tracks.total,
      imageUrl: each.images[0].url,
    }))
    if (response.ok === true) {
      this.setState({
        specificPlaylist: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  loadingView = () => (
    <div className="loading-container">
      <img
        src="https://res.cloudinary.com/dorxrzhje/image/upload/v1711444523/music_geglcu.svg"
        alt="loading"
        className="loading-icon"
      />
      <p className="loading-text">Loading...</p>
    </div>
  )

  onClickRetry = () => {
    this.getSpecificPlaylist()
  }

  failureView = () => (
    <div className="failure-container">
      <div className="failure-card-container">
        <img
          src="https://res.cloudinary.com/dorxrzhje/image/upload/v1711451869/alert-triangle_zrf45r.svg"
          alt="failure icon"
          className="failure-icon"
        />
        <p className="failure-info">Something went wrong. Please try again</p>
        <button
          type="button"
          onClick={this.onClickRetry}
          className="try-again-btn"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {specificPlaylist} = this.state
    return (
      <div className="playlists-success-container">
        <h1 className="podcasts">Podcasts</h1>
        <ul className="unordered-playlists-category-container">
          {specificPlaylist.map(each => (
            <SpecificCategoryItem key={each.id} categoryDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderPlaylistBasedOnApi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    const {screenSize} = this.state

    return (
      <div className="specific-playlists-details-container">
        <div className="header-lg-container">
          {screenSize <= 767 && <Header />}
          {screenSize >= 768 && <SideBar />}
        </div>
        <div className="main-specific-playlists">
          <button
            className="back-button"
            type="button"
            onClick={this.onClickBack}
          >
            <FaArrowLeft className="back-icon" />
            <p className="back-text">Back</p>
          </button>
          {this.renderPlaylistBasedOnApi()}
        </div>
      </div>
    )
  }
}
export default SpecificCategoryPlaylistsDetails
