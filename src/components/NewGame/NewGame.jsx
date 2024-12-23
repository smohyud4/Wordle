/* eslint-disable react/prop-types */
import './NewGame.css'

export default function NewGame({message, reset}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>{message || "Game over"}</h1>
        <button onClick={() => reset()}>
            New Game
        </button>
      </div>
    </div>
  )
}