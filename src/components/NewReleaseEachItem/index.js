import {Link} from 'react-router-dom'

import './index.css'

const NewReleaseEachItem = props => {
  const {newReleaseDetails} = props
  const {id, images, name} = newReleaseDetails

  return (
    <Link to={`/album/${id}`} style={{textDecoration: 'none'}}>
      <li className="each-editor-item">
        <img
          src={images[0].url}
          alt="new release album"
          className="each-editor-img"
        />
        <p className="each-editor-name">{name}</p>
      </li>
    </Link>
  )
}
export default NewReleaseEachItem
