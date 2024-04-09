import React from 'react'
import {FiPlay, FiPause} from 'react-icons/fi'
import {BiVolumeFull} from 'react-icons/bi'
import {BsSkipForward, BsSkipBackward} from 'react-icons/bs'
import AlbumDisplayInfo from '../AlbumDisplayInfo'
import SongItem from '../SongItem'

import './index.css'

class PlaySong extends React.Component {
  state = {
    ...this.props,
    index: 0,
    pause: false,
    activeSongClass: 0,
    currTime: '0:00',
    seek: 0,
    volume: 5,
    screenSize: window.innerWidth,
    // duration: 0,
  }

  componentDidMount() {
    this.playerRef.addEventListener('timeupdate', this.timeUpdate)
    this.playerRef.addEventListener('ended', this.nextSong)
    this.playerRef.addEventListener('volumechange', this.adjustVolume)
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    this.playerRef.removeEventListener('timeupdate', this.timeUpdate)
    this.playerRef.removeEventListener('ended', this.nextSong)
    this.playerRef.removeEventListener('volumechange', this.adjustVolume)
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    this.setState({screenSize: window.innerWidth})
  }

  // retrieves the artist name from the current song
  getArtistName = artist => {
    const {displayInfo} = this.state
    if (artist !== undefined) {
      return artist[0].name
    }
    return displayInfo.artistName
  }

  // retrieves the album image and artist name from the current song
  getAlbumImageArtist = currentSong => {
    const {album, artists} = currentSong
    const {displayInfo} = this.state
    let image
    let artist

    if (album !== undefined) {
      image = album.images.reduce((prev, curr) =>
        prev.height < curr.height ? prev : curr,
      )
      image = image.url
    } else {
      image = '/img/no-album-image.png'
    }

    if (artists !== undefined) {
      artist = artists[0].name
    } else {
      artist = displayInfo.artistName
    }

    return {albumImage: image, albumArtist: artist}
  }

  // select the prev song and Pauses playback if it's the first song
  prevSong = () => {
    const {index, activeSongClass, pause} = this.state

    if (index - 1 >= 0 && activeSongClass - 1 >= 0) {
      this.setState(
        {
          index: index - 1,
          activeSongClass: activeSongClass - 1,
        },
        this.updatePlayer,
      )
    } else {
      this.playerRef.pause()
      this.setState({pause: !pause})
    }
  }

  // Pause playback if it's the last song
  nextSong = () => {
    const {index, musicList} = this.state
    if (index + 1 < musicList.length) {
      this.setState(
        {
          index: index + 1,
          activeSongClass: index + 1,
        },
        this.updatePlayer,
      )
    } else {
      this.playerRef.pause()
    }
  }

  // Toggles between playing and pausing the current song
  playOrPause = () => {
    const {musicList, index, pause} = this.state
    const currentSong = musicList[index]
    const audio = new Audio(currentSong.audio)
    console.log(audio)

    if (!pause) {
      this.playerRef.play()
    } else {
      this.playerRef.pause()
    }
    this.setState(prevState => ({
      pause: !prevState.pause,
    }))
  }

  // Updates the audio player with the current song's details and loads it for playback.
  updatePlayer = () => {
    const {musicList, index, pause} = this.state

    const currentSong = musicList[index]
    const audio = new Audio(currentSong.audio)
    console.log(audio)

    this.playerRef.src = currentSong.previewUrl
    this.playerRef.currentTime = 0
    // this.setState({duration: currentSong.durationMs / 1000})

    this.playerRef.load()

    if (pause) {
      this.playerRef.play()
    } else {
      this.playerRef.pause()
    }
  }
  // updatePlayer = () => {
  //   const {musicList, index, pause} = this.state

  //   const currentSong = musicList[index]

  //   // Create an audio element
  //   const audio = new Audio(currentSong.audio)
  //   this.playerRef.currentTime = 0

  //   // Set the source of the audio
  //   audio.src = currentSong.previewUrl
  //   console.log(currentSong.previewUrl)

  //   // When the metadata has loaded, set the duration
  //   // audio.addEventListener('loadedmetadata', () => {
  //   //   this.setState({duration: audio.duration})
  //   // })

  //   // // When the song ends, play the next song
  //   // audio.addEventListener('ended', this.nextSong)

  //   // Play or pause based on the current state
  //   if (pause) {
  //     audio.play()
  //   } else {
  //     audio.pause()
  //   }

  //   // Store the audio element in the playerRef
  //   this.playerRef = audio
  // }

  // updatePlayer = () => {
  //   const {musicList, index, pause} = this.state

  //   const currentSong = musicList[index]
  //   const audio = new Audio(currentSong.audio)
  //   console.log(audio)

  //   this.playerRef.src = currentSong.previewUrl
  //   this.playerRef.currentTime = 0
  //   this.setState({duration: currentSong.durationMs / 1000})

  //   this.playerRef.load()

  //   if (pause) {
  //     this.playerRef.play()
  //   } else {
  //     this.playerRef.pause()
  //   }
  // }

  // Updates the current time and progress of the song during playback.
  timeUpdate = () => {
    const {currentTime} = this.playerRef

    const inMins = Math.floor(currentTime / 60)
    const inSecs = Math.floor(currentTime % 60)
    const progress = 100 * (currentTime / this.playerRef.duration)

    if (inSecs < 10) {
      this.setState({currTime: `${inMins}:0${inSecs}`, seek: progress})
    } else {
      this.setState({currTime: `${inMins}:${inSecs}`, seek: progress})
    }
  }

  // Formats the given time in seconds into a readable format (MM:SS).
  formatTime = secs => {
    const inMins = Math.floor(secs / 60)
    const inSecs = Math.floor(secs % 60)

    if (inSecs < 10) {
      return `${inMins}:0${inSecs}`
    }
    return `${inMins}:${inSecs}`
  }

  // Sets the selected song as active when clicked.
  onClickSelectSong = indx => {
    this.setState(
      {
        index: indx,
        activeSongClass: indx,
        pause: true,
      },
      this.updatePlayer,
    )
  }

  // Changes the current playback time based on the seek slider's position.
  changeCurrTime = () => {
    const {seek} = this.state
    this.playerRef.currentTime = (this.playerRef.duration * seek) / 100
  }

  // Adjusts the volume of the audio player based on the volume slider's position.
  adjustVolume = () => {
    const {volume} = this.state
    this.playerRef.volume = volume / 10
  }

  // Updates the seek slider's position and changes the current playback time accordingly.
  changeSeekSlider = event => {
    this.setState({seek: event.target.value}, this.changeCurrTime)
  }

  // Updates the volume slider's position and adjusts the volume accordingly.
  changeVolumeSlider = event => {
    this.setState({volume: event.target.value}, this.adjustVolume)
  }

  // Implement your mobile view rendering here
  renderMusicControlsMobileView = () => {
    const {musicList, index, pause} = this.state
    const currentSong = musicList[index]
    const {albumImage, albumArtist} = this.getAlbumImageArtist(currentSong)

    return (
      <>
        <audio
          ref={ref => {
            this.playerRef = ref
          }}
        >
          <source src={currentSong.previewUrl} type="audio/mp3" />
          <track kind="captions" srcLang="en" />
        </audio>
        <img src={albumImage} alt="album" className="album-img" />
        <div className="album-info">
          <p className="album-name">{currentSong.name}</p>
          <div className="artist-div">
            <span className="artist-name">{albumArtist}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={this.prevSong}
          className="next-prev-button"
        >
          <BsSkipBackward aria-label="button" className="next-prev-icon" />
        </button>
        <button
          type="button"
          onClick={this.playOrPause}
          className="play-pause-button"
        >
          {!pause ? (
            <FiPlay className="play-pause-icon" />
          ) : (
            <FiPause className="play-pause-icon" />
          )}
        </button>
        <button
          type="button"
          onClick={this.nextSong}
          className="next-prev-button"
        >
          <BsSkipForward aria-label="button" className="next-prev-icon" />
        </button>
      </>
    )
  }

  // Implement your desktop view rendering here
  renderMusicControlsDesktopView = () => {
    const {musicList, index, pause, currTime, seek, volume} = this.state

    const currentSong = musicList[index]
    const {durationMs} = currentSong

    const {albumImage, albumArtist} = this.getAlbumImageArtist(currentSong)

    return (
      <>
        <audio
          ref={ref => {
            this.playerRef = ref
          }}
        >
          <source src={currentSong.previewUrl} type="audio/mp3" />
          <track kind="captions" srcLang="en" />
        </audio>
        <img src={albumImage} alt="album" className="album-img" />
        <div className="album-info">
          <p className="album-name">{currentSong.name}</p>
          <div className="artist-div">
            <span className="artist-name">{albumArtist}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={this.prevSong}
          className="next-prev-button"
        >
          <BsSkipBackward aria-label="button" className="next-prev-icon" />
        </button>
        <button
          type="button"
          onClick={this.playOrPause}
          className="play-pause-button"
        >
          {!pause ? (
            <FiPlay className="play-pause-icon" />
          ) : (
            <FiPause className="play-pause-icon" />
          )}
        </button>
        <button
          type="button"
          onClick={this.nextSong}
          className="next-prev-button"
        >
          <BsSkipForward aria-label="button" className="next-prev-icon" />
        </button>
        <span className="time-update">
          {this.formatTime(durationMs / 1000)}
        </span>
        <input
          type="range"
          className="seek-slider"
          value={seek.toString()}
          onChange={this.changeSeekSlider}
          max="100"
        />
        <span className="time-update">{currTime}</span>
        <BiVolumeFull className="volume-icon" />
        <input
          type="range"
          max="10"
          value={volume}
          className="volume-slider"
          onChange={this.changeVolumeSlider}
        />
      </>
    )
  }

  // Implement your songs list rendering here
  renderSongsList = () => {
    const {musicList, activeSongClass, displayInfo} = this.state

    return (
      <>
        {musicList.map((item, key = 0) => (
          <SongItem
            songData={item}
            displayInfo={displayInfo}
            selectSong={this.onClickSelectSong}
            isActive={activeSongClass === key}
            index={key}
            key={key}
          />
        ))}
      </>
    )
  }

  render() {
    const {displayInfo, section, screenSize} = this.state

    return (
      <>
        <div className="playlist-container">
          <AlbumDisplayInfo displayInfo={displayInfo} section={section} />
          {screenSize >= 768 && (
            <div className="columns-row" style={{width: '95%'}}>
              <p className="column-name">Track</p>
              <p className="column-name">Album</p>
              <p className="column-name">Time</p>
              <p className="column-name">Artist</p>
              <p className="column-name">Added</p>
            </div>
          )}
          <ul className="playlist">{this.renderSongsList()}</ul>
        </div>
        <div className="music-controls">
          {screenSize >= 768
            ? this.renderMusicControlsDesktopView()
            : this.renderMusicControlsMobileView()}
        </div>
      </>
    )
  }
}

export default PlaySong
