
import { useState, useEffect } from 'react';
import { generate } from "random-words";
import './Game.css';

const map = ['one', 'two', 'three', 'four', 'five', 'six'];

export default function Game() {

  const [word, setWord] = useState(generate({ minLength: 5, maxLength: 5 }));
  console.log(word);
  /*const [wordOne, setWordOne] = useState('');
  const [wordTwo, setWordTwo] = useState('');
  const [wordThree, setWordThree] = useState('');
  const [wordFour, setWordFour] = useState('');
  const [wordFive, setWordFive] = useState('');
  const [wordSix, setWordSix] = useState(''); */

  const [words, setWords] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: ''
  });
  
  const [guess, setGuess] = useState(0);

  useEffect(() => { 

    if (checkGuess() || guess === 6) {
      setWords({
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: ''
      });
      setWord(generate({ minLength: 5, maxLength: 5 }));
      alert('You win!');
    } 

  }, [guess]);


  function checkGuess() {
    if (guess === 0) return false;
    let gameOver = true;

    for (let i=0; i < 5; i++) {
      const char = document.getElementById(`${guess}${i}`);
      if (words[map[guess-1]] === word[i]) {
        char.classList.add("correct"); 
      }
      else {
        word.includes(words[map[guess-1]][i]) 
          ?  char.classList.add("correct-position")
          :  char.classList.add("blank");
        gameOver = false;
      }
    }

    return gameOver;
  }

  function handleInput(event) {
    const {name, value} = event.target;
    setWords((prevWords) => ({
      ...prevWords,
      [name]: value,
    }));
  }

  function takeGuess() {
    if (words[map[guess]].length === 5) {
      console.log('valid');
      setGuess(prev => prev+1);
    }
    else {
      console.log('Not enough letters');
    }
  }

  return (
    <div className="container">
      <div className="grid-item"> 
        {Array.from(words.one).map((char, index) => {
          return (
            <span id={`1${index}`} key={index}>
              {char}
            </span> 
          )
        })}
      </div>
      <div className="grid-item">
        {Array.from(words.two).map((char, index) => {
          return (
            <span id={`2${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      <div className="grid-item"> 
        {Array.from(words.three).map((char, index) => {
          return (
            <span id={`3${index}`} key={index}>
              {char}
            </span> 
          )
        })}
      </div>
      <div className="grid-item">
        {Array.from(words.four).map((char, index) => {
          return (
            <span id={`4${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      <div className="grid-item">
        {Array.from(words.five).map((char, index) => {
          return (
            <span id={`5${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      <div className="grid-item">
        {Array.from(words.six).map((char, index) => {
          return (
            <span id={`6${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      <input 
        type='text' 
        maxLength={5}
        name={map[guess]}
        value={words[map[guess]]}
        onChange={handleInput}
      />
      <button onClick={takeGuess}>
        Enter
      </button>
    </div>
  );
}; 

