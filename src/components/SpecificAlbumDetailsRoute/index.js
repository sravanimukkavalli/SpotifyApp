import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaArrowLeft} from 'react-icons/fa'
import Header from '../Header'
import SideBar from '../SideBar'
// import EachSongDetails from '../EachSongDetails'
import NewReleasesPlaySong from '../NewReleasesPlaySong'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class SpecificAlbumDetailsRoute extends Component {
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
    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
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
      artistName: data.tracks.items[0].track.artists[0].name,
      tracks: data.tracks.items.map(item => ({
        album: item.track.album,
        artists: item.track.artists,
        artistName: item.track.artists[0].name,
        availableMarkets: item.track.available_markets,
        discNumber: item.track.disc_number,
        durationMs: item.track.duration_ms,
        episode: item.track.episode,
        explicit: item.track.explicit,
        externalIds: item.track.external_ids,
        externalUrls: item.track.external_urls,
        href: item.track.href,
        id: item.track.id,
        isLocal: item.track.is_local,
        name: item.track.name,
        popularity: item.track.popularity,
        previewUrl: item.track.preview_url,
        track: item.track.track,
        trackNumber: item.track.track_number,
        type: item.track.type,
        uri: item.track.uri,
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
    this.componentDidMount()
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
      <NewReleasesPlaySong
        displayInfo={specificPlaylist}
        musicList={specificPlaylist.tracks}
        section="Album choice"
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
export default SpecificAlbumDetailsRoute
