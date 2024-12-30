/* eslint-disable react/prop-types */
import { useState } from 'react'
import './NewGame.css'

export default function NewGame({
  message, 
  time, 
  colors,  
  length,
  checkWord, 
  reset
}) {
 
  const [lengthState, setLengthState] = useState(length.current);

  function handleChange(event) {
    
    if (event.target.type === "checkbox") {
      checkWord.current = event.target.checked;
      return;
    }

    const { value } = event.target;
    const numericValue = parseInt(value, 10);

    if (!isNaN(numericValue) && numericValue >= 4 && numericValue <= 7) 
      setLengthState(numericValue); // Replace with valid input
    else if (value === "") 
      setLengthState(""); 

  }

  function handleSubmit() {
    if (lengthState === "") {
      alert("Please enter a valid number");
      return;
    }

    length.current = lengthState;
    reset();
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
          <label htmlFor="options">Word Length</label>
          <input
            type="number"
            name="options"
            value={lengthState}
            onChange={handleChange}
            min={4}
            max={7}
          />
          <label>Validate Guess</label>
          <input
            type="checkbox"
            name="difficulty"
            value={checkWord.current}
            onChange={handleChange}
          />
        </div>
        <br/>
        <div className="buttonContainer">
          <button onClick={handleSubmit}>
            New Game
          </button>
        </div>
      </div>
    </div>
  )
}
