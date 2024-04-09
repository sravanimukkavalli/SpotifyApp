import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import SideBar from '../SideBar'
import EditorChoiceEachItem from '../EditorChoiceEachItem'
import GenreMoodEachItem from '../GenreMoodEachItem'
import NewReleaseEachItem from '../NewReleaseEachItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    editorPicksList: [],
    genresMoodsList: [],
    newReleasesList: [],
    apiStatusGenreMood: apiStatusConstants.initial,
    apiStatusEditor: apiStatusConstants.initial,
    apiStatusNewReleases: apiStatusConstants.initial,
    screenSize: window.innerWidth,
  }

  componentDidMount() {
    this.getEditorPicks()
    this.getGenresMoodList()
    this.getNewReleases()
  }

  getNewReleases = async () => {
    this.setState({apiStatusNewReleases: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/new-releases'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.albums.items.map(each => ({
        albumType: each.album_type,
        artists: each.artists.map(artist => ({
          spotify: artist.external_urls.spotify,
          href: artist.href,
          id: artist.id,
          name: artist.name,
          type: artist.type,
          uri: artist.uri,
        })),
        spotify: each.external_urls.spotify,
        href: each.href,
        id: each.id,
        images: each.images.map(image => ({
          url: image.url,
        })),
        name: each.name,
        releaseDate: each.release_date,
        releaseDatePrecision: each.release_date_precision,
        totalTracks: each.total_tracks,
        type: each.type,
      }))
      this.setState({
        newReleasesList: updatedData,
        apiStatusNewReleases: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusNewReleases: apiStatusConstants.failure})
    }
  }

  getGenresMoodList = async () => {
    this.setState({apiStatusGenreMood: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/categories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.categories.items.map(each => ({
        href: each.href,
        url: each.icons[0].url,
        id: each.id,
        name: each.name,
      }))
      this.setState({
        genresMoodsList: updatedData,
        apiStatusGenreMood: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusGenreMood: apiStatusConstants.failure})
    }
  }

  getEditorPicks = async () => {
    this.setState({apiStatusEditor: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.playlists.items.map(each => ({
        description: each.description,
        spotify: each.external_urls.spotify,
        href: each.href,
        id: each.id,
        url: each.images[0].url,
        name: each.name,
        owner: each.owner,
        tracks: each.tracks,
        snapshotId: each.snapshot_id,
        type: each.type,
        uri: each.uri,
      }))
      this.setState({
        editorPicksList: updatedData,
        apiStatusEditor: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusEditor: apiStatusConstants.failure})
    }
  }

  loadingEditorView = () => (
    <div className="loading-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dorxrzhje/image/upload/v1711444523/music_geglcu.svg"
        alt="loading"
        className="loading-icon"
      />
      <p className="loading-text">Loading...</p>
    </div>
  )

  loadingGenreView = () => (
    <div className="loading-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dorxrzhje/image/upload/v1711444523/music_geglcu.svg"
        alt="loading"
        className="loading-icon"
      />
      <p className="loading-text">Loading...</p>
    </div>
  )

  loadingNewReleasesView = () => (
    <div className="loading-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dorxrzhje/image/upload/v1711444523/music_geglcu.svg"
        alt="loading"
        className="loading-icon"
      />
      <p className="loading-text">Loading...</p>
    </div>
  )

  onClickEditorRetry = () => {
    this.getEditorPicks()
  }

  failureEditorView = () => (
    <div className="failure-container">
      <div className="failure-card-container">
        <img
          src="https://res.cloudinary.com/dorxrzhje/image/upload/v1711451869/alert-triangle_zrf45r.svg"
          alt="failure view"
          className="failure-icon"
        />
        <p className="failure-info">Something went wrong. Please try again</p>
        <button
          type="button"
          onClick={this.onClickEditorRetry}
          className="try-again-btn"
        >
          Try again
        </button>
      </div>
    </div>
  )

  onClickGenreRetry = () => {
    this.getGenresMoodList()
  }

  failureGenreView = () => (
    <div className="failure-container">
      <div className="failure-card-container">
        <img
          src="https://res.cloudinary.com/dorxrzhje/image/upload/v1711451869/alert-triangle_zrf45r.svg"
          alt="failure view"
          className="failure-icon"
        />
        <p className="failure-info">Something went wrong. Please try again</p>
        <button
          type="button"
          onClick={this.onClickGenreRetry}
          className="try-again-btn"
        >
          Try again
        </button>
      </div>
    </div>
  )

  onClickNewReleasesRetry = () => {
    this.getNewReleases()
  }

  failureNewReleasesView = () => (
    <div className="failure-container">
      <div className="failure-card-container">
        <img
          src="https://res.cloudinary.com/dorxrzhje/image/upload/v1711451869/alert-triangle_zrf45r.svg"
          alt="failure view"
          className="failure-icon"
        />
        <p className="failure-info">Something went wrong. Please try again</p>
        <button
          type="button"
          onClick={this.onClickNewReleasesRetry}
          className="try-again-btn"
        >
          Try again
        </button>
      </div>
    </div>
  )

  renderEditorSuccessView = () => {
    const {editorPicksList} = this.state
    return (
      <ul className="editor-success-unordered-list">
        {editorPicksList.map(each => (
          <EditorChoiceEachItem editorDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderGenreMoodSuccessView = () => {
    const {genresMoodsList} = this.state
    return (
      <ul className="editor-success-unordered-list">
        {genresMoodsList.map(each => (
          <GenreMoodEachItem genreDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderNewReleasesSuccessView = () => {
    const {newReleasesList} = this.state
    return (
      <ul className="editor-success-unordered-list">
        {newReleasesList.map(each => (
          <NewReleaseEachItem newReleaseDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderEditorsList = () => {
    const {apiStatusEditor} = this.state
    switch (apiStatusEditor) {
      case apiStatusConstants.failure:
        return this.failureEditorView()
      case apiStatusConstants.inProgress:
        return this.loadingEditorView()
      case apiStatusConstants.success:
        return this.renderEditorSuccessView()
      default:
        return null
    }
  }

  renderGenreMoodsList = () => {
    const {apiStatusGenreMood} = this.state
    switch (apiStatusGenreMood) {
      case apiStatusConstants.failure:
        return this.failureGenreView()
      case apiStatusConstants.inProgress:
        return this.loadingGenreView()
      case apiStatusConstants.success:
        return this.renderGenreMoodSuccessView()
      default:
        return null
    }
  }

  renderNewReleases = () => {
    const {apiStatusNewReleases} = this.state
    switch (apiStatusNewReleases) {
      case apiStatusConstants.failure:
        return this.failureNewReleasesView()
      case apiStatusConstants.inProgress:
        return this.loadingNewReleasesView()
      case apiStatusConstants.success:
        return this.renderNewReleasesSuccessView()
      default:
        return null
    }
  }

  render() {
    const {screenSize} = this.state

    return (
      <div className="home-container">
        {screenSize <= 767 && <Header />}
        {screenSize >= 768 && <SideBar />}
        <div className="music-list-container">
          <h1 className="editor-picks-heading">Editors picks</h1>
          {this.renderEditorsList()}
          <h1 className="editor-picks-heading">Genres & Moods</h1>
          {this.renderGenreMoodsList()}
          <h1 className="editor-picks-heading">New Releases</h1>
          {this.renderNewReleases()}
        </div>
      </div>
    )
  }
}
export default Home
