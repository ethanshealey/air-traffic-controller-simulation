import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineCaretDown } from 'react-icons/ai'
import FadeIn from 'react-fade-in'

const StartScreen = (props) => {
  
  const changeDifficulty = () => {
    const sel = document.getElementById('difficulty')
    props.setDifficulty(sel.value)
  }

  return (
    <FadeIn>
        <div className="start-screen">
            <h1 className="start-header">AIR TRAFFIC CONTROLLER</h1>
            <h1 className="start-header-kern">SIMULATOR</h1>
        
            <div className="start-screen-btn-container">
                <select id='difficulty' className="diff-btn" onChange={changeDifficulty}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <Link to="/play" className="play-btn">Play</Link>
            </div>
        </div>
    </FadeIn>
  )
}

export default StartScreen