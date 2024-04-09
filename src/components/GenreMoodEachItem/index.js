import {Link} from 'react-router-dom'

import './index.css'

const GenreMoodEachItem = props => {
  const {genreDetails} = props
  const {id, url, name} = genreDetails

  return (
    <Link to={`/category/${id}/playlists`} style={{textDecoration: 'none'}}>
      <li className="each-editor-item">
        <img src={url} alt="category" className="each-editor-img" />
        <p className="each-editor-name">{name}</p>
      </li>
    </Link>
  )
}
export default GenreMoodEachItem
