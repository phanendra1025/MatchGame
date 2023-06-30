import './index.css'

const ThumbnailItem = props => {
  const {thumbnailDetails, checkTheMatchImage} = props
  const {id, thumbnailUrl} = thumbnailDetails
  const check = () => {
    checkTheMatchImage(id)
  }
  return (
    <li className="thumbnail-item">
      <button className="thumbnail-button" onClick={check} type="button">
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
      </button>
    </li>
  )
}

export default ThumbnailItem
