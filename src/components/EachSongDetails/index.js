import './index.css'

const EachSongDetails = props => {
  const {songDetails, onChangeSong} = props
  const {albumName, durationMs, artist, name, addedAt} = songDetails
  const getMinutes = ms => {
    const min = Math.floor(ms / 1000 / 60)
    const sec = Math.floor((ms / 1000) % 60)
    const result = min + ':' + sec
    return result
  }

  const onClickSong = () => {
    onChangeSong(songDetails)
  }

  return (
    <li>
      <button
        type="button"
        onClick={onClickSong}
        className="button each-list-playlist-item"
      >
        <p className="each-name">{name}</p>
        <p className="each-name">{albumName}</p>
        <p className="each-name">{artist}</p>
        <p className="each-name">{getMinutes(durationMs)}</p>
        <p className="each-name">{addedAt}</p>
        <div className="each-album-artist-container">
          <p className="each-song">{albumName}</p>
          <p className="each-artist">{artist}</p>
        </div>
        <p className="each-song-time">{getMinutes(durationMs)}</p>
      </button>
    </li>
  )
}
export default EachSongDetails
