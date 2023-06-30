import {Component} from 'react'
import TabItem from '../TabItem'
import ThumbnailItem from '../ThumbnailItem'
import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = this.props
    this.state = {
      activeTab: tabsList[0],
      matchImage: imagesList[0],
      score: 0,
      isGameStarted: true,
      seconds: 60,
      isTimerRunning: true,
    }
  }

  componentDidMount() {
    this.startTheTimer()
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  startTheTimer = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning) {
      this.intervalID = setInterval(() => {
        this.tick()
      }, 1000)
      this.setState({isTimerRunning: false})
    }
  }

  stopTheTimer = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      clearInterval(this.intervalID)

      this.setState({isGameStarted: false})
    }
  }

  tick = () => {
    const {seconds} = this.state

    if (seconds > 0) {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    } else {
      this.stopTheTimer()
      this.setState({isGameStarted: false})
    }
  }

  getTheRandomImage = () => {
    const {imagesList} = this.props
    const randomIndex = Math.ceil(Math.random() * imagesList.length - 1)
    const randomImage = imagesList[randomIndex]
    this.setState({matchImage: randomImage})
  }

  changeTheActiveTabId = id => {
    const {tabsList} = this.props
    const activeIdTab = tabsList.filter(eachTab => eachTab.tabId === id)
    this.setState({activeTab: activeIdTab[0]})
  }

  getTheFilterImagesList = () => {
    const {activeTab} = this.state
    const {imagesList} = this.props
    const filterList = imagesList.filter(
      eachImage => eachImage.category === activeTab.tabId,
    )
    return filterList
  }

  checkTheMatchImage = id => {
    const {imagesList} = this.props
    const {matchImage} = this.state
    console.log(matchImage)
    const filterMatchImageById = imagesList.filter(
      eachImage => eachImage.id === id,
    )

    const isMatched = matchImage.id === filterMatchImageById[0].id
    if (isMatched) {
      this.setState(prevState => ({score: prevState.score + 1}))
      this.getTheRandomImage()
    } else {
      this.setState({isGameStarted: false, isTimerRunning: true})
      this.stopTheTimer()
    }
  }

  restartTheGame = () => {
    const {tabsList, imagesList} = this.props
    this.setState({
      isGameStarted: true,
      isTimerRunning: true,
      seconds: 60,
      score: 0,
      activeTab: tabsList[0],
      matchImage: imagesList[0],
    })
    this.startTheTimer()
  }

  getTheScoreCard = () => {
    const {score} = this.state

    return (
      <div className="score-card-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png "
          alt="trophy"
          className="trophy-image"
        />
        <p className="your-score-text">YOUR SCORE</p>
        <p className="final-score">{score}</p>
        <button
          type="button"
          onClick={this.restartTheGame}
          className="play-again-button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png "
            alt="reset"
            className="reset-image"
          />
          <p className="play-again-text">PLAY AGAIN</p>
        </button>
      </div>
    )
  }

  render() {
    const {tabsList} = this.props
    const {activeTab, matchImage, score, isGameStarted, seconds} = this.state
    const {imageUrl} = matchImage
    const filterImagesList = this.getTheFilterImagesList()
    return (
      <div>
        <nav className="nav-bar">
          <img
            className="website-logo-image"
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png "
            alt="website logo"
          />
          <ul className="score-and-timer-container">
            <li>
              <p className="score">
                Score: <span className="score-count"> {score}</span>
              </p>
            </li>
            <li>
              <div className="timer-container">
                <img
                  className="timer-image"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                  alt="timer"
                />
                <p className="seconds">{seconds} sec</p>
              </div>
            </li>
          </ul>
        </nav>
        <div className="match-image-container">
          {isGameStarted ? (
            <>
              <div className="image-container">
                <img className="match-image" src={imageUrl} alt="match" />
              </div>

              <ul className="tabs-container">
                {tabsList.map(eachTab => (
                  <TabItem
                    tabDetails={eachTab}
                    key={eachTab.tabId}
                    isActive={eachTab.tabId === activeTab.tabId}
                    changeTheActiveId={this.changeTheActiveTabId}
                  />
                ))}
              </ul>
              <ul className="thumbnails-container">
                {filterImagesList.map(eachImage => (
                  <ThumbnailItem
                    thumbnailDetails={eachImage}
                    checkTheMatchImage={this.checkTheMatchImage}
                    key={eachImage.id}
                  />
                ))}
              </ul>
            </>
          ) : (
            this.getTheScoreCard()
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
