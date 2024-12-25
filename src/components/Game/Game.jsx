import { useState, useEffect, useRef } from 'react';
import KeyBoard from '../KeyBoard/KeyBoard';
import NewGame from '../NewGame/NewGame';
import { generate } from "random-words";
import './Game.css';

const map = ['one', 'two', 'three', 'four', 'five', 'six'];
const rowOne = "QWERTYUIOP";
const rowTwo = "ASDFGHJKL";
const rowThree = "ZXCVBNM";

export default function Game() {

  const [word, setWord] = useState('');
  const [words, setWords] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: ''
  });
  const [guess, setGuess] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [winnerMessage, setWinnerMessage] = useState("Wordle");
  const [time, setTime] = useState(0);

  const length = useRef(5);
  const colors = useRef([]);
  const inputRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (!gameOver) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [gameOver]);

  useEffect(() => {
    // Focus the input field whenever the guess changes
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [words]); 

  useEffect(() => { 
    if (guess != 0 && checkGuess()) {
      setGameOver(true);
      setWinnerMessage("You Win!");
    }
    else if ((guess == 5 && length.current == 7) || guess == 6) {
      setGameOver(true);
      setWinnerMessage(`The word was ${word}!`);
    }

  }, [guess]);

  function formatTime() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function resetGame() {
    setWords({
      one: '',
      two: '',
      three: '',
      four: '',
      five: '',
      six: ''
    });

    setWord(generate({ minLength: length.current, maxLength: length.current }));
    setGuess(0);
    setTime(0);
    colors.current = [];

    const keys = document.querySelectorAll('.keyBoardContainer button');
    keys.forEach((key) => {
      if (key.className != 'action')
        key.className = '';
    });

    setGameOver(false);
  }


  function checkGuess() {
    let winner = true;

    const potential = [];
    const charColors = Array.from({ length: length });
    const freq = {};
    for (const char of word) {
      freq[char] = (freq[char] || 0) + 1;
    }

    /*
      In one loop, mark all exact matches in green and letters not included in the word at all as gray
      With the remaining letters:
         Mark them as yellow WHILE the temp freq[letter] > 0
    */

    for (let i=0; i < length.current; i++) {
      const char = words[map[guess-1]][i].toLowerCase();
      const charTag = document.getElementById(`${guess}${i}`);
      const keyTag = document.getElementById(char.toUpperCase());
 
      if (char === word[i]) {
        charTag.classList.add("correct");
        keyTag.classList.add("correct");
        charColors[i] = "correct"
        freq[char]--;
      }
      else if (!word.includes(char)) {
        charTag.classList.add("blank");
        keyTag.classList.add("blank");
        charColors[i] = "blank";
        winner = false;
      }
      else {
        potential.push({char, i});
        winner = false;
      }

      charTag.style.color = 'white';
    }

    for (const {char, i} of potential) {
      const charTag = document.getElementById(`${guess}${i}`);
      const keyTag = document.getElementById(char.toUpperCase());

      if (freq[char] > 0) {
        charTag.classList.add("correct-position");
        keyTag.classList.add("correct-position");
        charColors[i] = "correct-position";
        freq[char]--;
      } 
      else {
        charTag.classList.add("blank");
        keyTag.classList.add("blank");
        charColors[i] = "blank";
      } 
    }

    colors.current.push(charColors);
    return winner;
  }

  function handleClick(char) {
    if (words[map[guess]].length >= length.current) return; // Prevent adding more than 5 characters

    setWords((prevWords) => {
      const newWords = { ...prevWords }; // Create a shallow copy of the state
      newWords[map[guess]] += char; // Append the key to the current word
      return newWords;
    });
  }

  function handleDelete() {
    setWords((prevWords) => {
      const newWords = { ...prevWords }; // Create a shallow copy of the state
      newWords[map[guess]] = newWords[map[guess]].slice(0, -1); // Remove the last character
      return newWords;
    });
  }

  function handleInput(event) {
    const {name, value} = event.target;
    const char = value.charCodeAt(value.length-1)

    if ((char < '65' || char > '90') && // A-Z
       (char < '97' || char > '122')) {
      return;
    }

    setWords((prevWords) => ({
      ...prevWords,
      [name]: value.toUpperCase(),
    }));
  }

  function takeGuess() {
    if (words[map[guess]].length == length.current) {
      console.log('valid');
      setGuess(prev => prev+1);
    }
    else {
      alert('Not enough letters');
    }
  }

  return <>
    {gameOver && (
      <NewGame 
        message={winnerMessage} 
        time={formatTime()}
        colors={colors.current}
        length={length}
        reset={resetGame}
      />
    )}
    <div className="container">
    <h2>{formatTime()}</h2>
      <div className="grid-item" style={{width: `${(length.current/5)*50}%`}}> 
        {words.one.split('').map((char, index) => {
          return (
            <span id={`1${index}`} key={index}>
              {char}
            </span> 
          )
        })}
      </div>
      <div className="grid-item" style={{width: `${(length.current/5)*50}%`}}>
        {words.two.split('').map((char, index) => {
          return (
            <span id={`2${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      <div className="grid-item" style={{width: `${(length.current/5)*50}%`}}> 
        {words.three.split('').map((char, index) => {
          return (
            <span id={`3${index}`} key={index}>
              {char}
            </span> 
          )
        })}
      </div>
      <div className="grid-item" style={{width: `${(length.current/5)*50}%`}}>
        {words.four.split('').map((char, index) => {
          return (
            <span id={`4${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      <div className="grid-item" style={{width: `${(length.current/5)*50}%`}}>
        {words.five.split('').map((char, index) => {
          return (
            <span id={`5${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      {length.current != 7 &&
        <div className="grid-item" style={{width: `${(length.current/5)*50}%`}}>
          {words.six.split('').map((char, index) => {
            return (
              <span id={`6${index}`} key={index}>
                {char}
              </span> 
            )
          })} 
        </div>
      }
      <input
        ref={inputRef}
        id='guessInput' 
        type='text' 
        maxLength={length.current}
        name={map[guess]}
        value={words[map[guess]]}
        onChange={handleInput}
        placeholder='Enter your guess'
        onKeyUp={(event) => {
          if (event.key === "Enter") takeGuess();
        }}
      />
      <KeyBoard 
        rowOne={rowOne} 
        rowTwo={rowTwo} 
        rowThree={rowThree} 
        handleClick={handleClick}
        handleEnter={takeGuess}
        handleDelete={handleDelete}
      />
    </div>
    </>
}; 


