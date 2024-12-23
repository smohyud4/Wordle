/* eslint-disable react/prop-types */
import './NewGame.css'

export default function NewGame({message, time, reset}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>{message || "Game over"}</h1>
        <h2>Time: {time}</h2>
        <div className="buttonContainer">
          <button onClick={() => reset()}>
            New Game
          </button>
        </div>
      </div>
    </div>
  )
}