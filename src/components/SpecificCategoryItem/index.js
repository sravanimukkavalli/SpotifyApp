import {Link} from 'react-router-dom'
import './index.css'

const SpecificCategoryItem = props => {
  const {categoryDetails} = props
  const {name, imageUrl, totalTracks, id} = categoryDetails
  return (
    <Link to={`/playlist/${id}`} style={{textDecoration: 'none'}}>
      <li className="each-category-item-container">
        <img src={imageUrl} alt={name} className="category-img" />
        <div className="category-text-container">
          <p className="category-name">{name}</p>
          <p className="category-tracks">{totalTracks} Tracks</p>
        </div>
      </li>
    </Link>
  )
}
export default SpecificCategoryItem
