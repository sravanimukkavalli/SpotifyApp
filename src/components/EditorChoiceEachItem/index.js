import {Link} from 'react-router-dom'

import './index.css'

const EditorChoiceEachItem = props => {
  const {editorDetails} = props
  const {id, url, name} = editorDetails

  return (
    <Link to={`/playlist/${id}`} style={{textDecoration: 'none'}}>
      <li className="each-editor-item">
        <img src={url} alt="featured playlist" className="each-editor-img" />
        <p className="each-editor-name">{name}</p>
      </li>
    </Link>
  )
}
export default EditorChoiceEachItem
