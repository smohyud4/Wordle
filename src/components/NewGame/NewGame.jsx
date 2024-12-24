/* eslint-disable react/prop-types */
import './NewGame.css'

export default function NewGame({
  message, 
  time, 
  colors,  
  length, 
  reset
}) {

  function handleChange(event) {
    console.log("Value:" + event.target.value);
    length.current = parseInt(event.target.value);
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>{message || "Game over"}</h1>
        {message != "Wordle" &&
          <>
            <h2>Time: {time}</h2>
            <div 
              className="colorGrid" 
              style={{
                gridTemplateRows: `repeat(${colors.length}, 1fr)`, 
                gridTemplateColumns: `repeat(${length.current}, 1fr)`,
                width: `${length.current*20 + (length.current-1)*2}px`,  
              }}
            >
              {colors.flat().map((color, index) => (
                <div key={index} className={color}></div>
              ))}
            </div>
          </>
        }
        <br/>
        <div className="inputContainer">
          <label>Easy</label>
          <input
            type="radio"
            name="difficulty"
            value={4}
            onChange={handleChange}
          />
          <label>Medium</label>
          <input
            type="radio"
            name="difficulty"
            value={5}
            onChange={handleChange}
          />
          <label>Hard</label>
          <input
            type="radio"
            name="difficulty"
            value={7}
            onChange={handleChange}
          />
        </div>
        <br/>
        <div className="buttonContainer">
          <button onClick={() => reset()}>
            New Game
          </button>
        </div>
      </div>
    </div>
  )
}
