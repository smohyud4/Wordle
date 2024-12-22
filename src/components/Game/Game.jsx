
import { useState, useEffect } from 'react';
import KeyBoard from '../KeyBoard/KeyBoard';
import { generate } from "random-words";
import './Game.css';

const map = ['one', 'two', 'three', 'four', 'five', 'six'];
const rowOne = "QWERTYUIOP";
const rowTwo = "ASDFGHJKL";
const rowThree = "ZXCVBNM";

export default function Game() {

  //const [word, setWord] = useState(generate({ minLength: 5, maxLength: 5 }));
  const [word, setWord] = useState('stall');

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
      setGuess(0);

      const listItems = document.querySelectorAll('li');
      listItems.forEach((li) => {li.className = ''});

      alert('You win!');
    } 

  }, [guess]);


  function checkGuess() {
    if (guess === 0) return false;
    let gameOver = true;

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
    return gameOver;
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
      <KeyBoard rowOne={rowOne} rowTwo={rowTwo} rowThree={rowThree} />
    </div>
    </>
}; 

