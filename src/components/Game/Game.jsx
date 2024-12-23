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

  const [word, setWord] = useState(generate({ minLength: 5, maxLength: 5 }));
  console.log(word);
  const [words, setWords] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: ''
  });
  const [guess, setGuess] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("Wordle");

  const inputRef = useRef(null);

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
    else if (guess == 6) {
      setGameOver(true);
      setWinnerMessage("You Lose!");
    }

  }, [guess]);

  function resetGame() {
    setWords({
      one: '',
      two: '',
      three: '',
      four: '',
      five: '',
      six: ''
    });
    setWord(generate({ minLength: 5, maxLength: 5 }));
    setGuess(0);

    const keys = document.querySelectorAll('.keyBoardContainer button');
    keys.forEach((key) => {key.className = ''});

    setGameOver(false);
  }


  function checkGuess() {
    if (words[map[guess-1]].toLowerCase() == word) 
      return true;

    const potential = [];
    const freq = {};
    for (const char of word) {
      freq[char] = (freq[char] || 0) + 1;
    }

    /*
      In one loop, mark all exact matches in green and letters not included in the word at all as gray
      With the remaining letters:
         Mark them as yellow WHILE the temp freq[letter] > 0
    */

    for (let i=0; i < 5; i++) {
      const char = words[map[guess-1]][i].toLowerCase();
      const charTag = document.getElementById(`${guess}${i}`);
      const keyTag = document.getElementById(char.toUpperCase());
 
      if (char === word[i]) {
        charTag.classList.add("correct");
        keyTag.classList.add("correct");
        freq[char]--;
      }
      else if (!word.includes(char)) {
        charTag.classList.add("blank");
        keyTag.classList.add("blank");
      }
      else {
        potential.push({char, i});
      }

      charTag.style.color = 'white';
    }

    for (const {char, i} of potential) {
      const charTag = document.getElementById(`${guess}${i}`);
      const keyTag = document.getElementById(char.toUpperCase());

      if (freq[char] > 0) {
        charTag.classList.add("correct-position");
        keyTag.classList.add("correct-position");
        freq[char]--;
      } 
      else {
        charTag.classList.add("blank");
        keyTag.classList.add("blank");
      } 
    }

    return false;
  }

  function handleClick(char) {
    if (words[map[guess]].length >= 5) return; // Prevent adding more than 5 characters

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
    if (words[map[guess]].length === 5) {
      console.log('valid');
      setGuess(prev => prev+1);
    }
    else {
      alert('Not enough letters');
    }
  }

  return <>
    <h3>{word}</h3>
    {gameOver && <NewGame message={winnerMessage} reset={resetGame}/>} 
    <div className="container">
      <div className="grid-item"> 
        {words.one.split('').map((char, index) => {
          return (
            <span id={`1${index}`} key={index}>
              {char}
            </span> 
          )
        })}
      </div>
      <div className="grid-item">
        {words.two.split('').map((char, index) => {
          return (
            <span id={`2${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      <div className="grid-item"> 
        {words.three.split('').map((char, index) => {
          return (
            <span id={`3${index}`} key={index}>
              {char}
            </span> 
          )
        })}
      </div>
      <div className="grid-item">
        {words.four.split('').map((char, index) => {
          return (
            <span id={`4${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      <div className="grid-item">
        {words.five.split('').map((char, index) => {
          return (
            <span id={`5${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      <div className="grid-item">
        {words.six.split('').map((char, index) => {
          return (
            <span id={`6${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      <input
        ref={inputRef} 
        type='text' 
        maxLength={5}
        name={map[guess]}
        value={words[map[guess]]}
        onChange={handleInput}
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

