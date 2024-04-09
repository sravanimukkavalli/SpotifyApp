import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaArrowLeft} from 'react-icons/fa'
import Header from '../Header'
import SideBar from '../SideBar'
import NewReleasesPlaySong from '../NewReleasesPlaySong'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class SpecificNewReleasesRoute extends Component {
  state = {
    specificPlaylist: {},
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
    const url = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const updatedData = {
      collaborative: data.collaborative,
      description: data.description,
      externalUrls: data.external_urls,
      href: data.href,
      id: data.id,
      images: data.images,
      name: data.name,
      owner: data.owner,
      primaryColor: data.primary_color,
      public: data.public,
      snapshotId: data.snapshot_id,
      type: data.type,
      uri: data.uri,
      label: data.label,
      popularity: data.popularity,
      releaseDate: data.release_date,
      artistName: data.artists[0].name,
      tracks: data.tracks.items.map(item => ({
        album: {
          images: data.images,
          release_date: data.release_date,
          albumName: data.name,
        },
        artistName: item.artists[0].name,
        artists: item.artists,
        availableMarkets: item.available_markets,
        discNumber: item.disc_number,
        durationMs: item.duration_ms,
        explicit: item.explicit,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        isLocal: item.is_local,
        name: item.name,
        popularity: item.popularity,
        previewUrl: item.preview_url,
        trackNumber: item.track_number,
        type: item.type,
        uri: item.uri,
      })),
    }
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
    console.log(specificPlaylist)
    return (
      <NewReleasesPlaySong
        displayInfo={specificPlaylist}
        musicList={specificPlaylist.tracks}
        section="New Releases"
      />
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
export default SpecificNewReleasesRoute
