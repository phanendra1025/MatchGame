import './index.css'

const TabItem = props => {
  const {tabDetails, isActive, changeTheActiveId} = props
  const {tabId, displayText} = tabDetails
  const tabItemClass = isActive ? 'active-tab-item' : 'unactive-tab-item '

  const changeId = () => {
    changeTheActiveId(tabId)
  }

  return (
    <li className="tab-item">
      <button
        type="button"
        onClick={changeId}
        className={`tab-button  ${tabItemClass}`}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
