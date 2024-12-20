
import { useState, useEffect } from 'react';
import { generate } from "random-words";
import './Game.css';

console.log('Ready!');

export default function Game() {

  const [word, setWord] = useState(generate({ minLength: 5, maxLength: 5 }));
  const [wordOne, setWordOne] = useState('');
  const [wordTwo, setWordTwo] = useState('');
  const [wordThree, setWordThree] = useState('');
  const [wordFour, setWordFour] = useState('');
  const [wordFive, setWordFive] = useState('');
  const [wordSix, setWordSix] = useState('');
  
  const [guess, setGuess] = useState(0);

  useEffect(() => {
    let gameOver = true;

    switch (guess) {
      case 1:
        for (let i=0; i < 5; i++) {
          const char = document.getElementById(`1${i}`);
          if (wordOne[i] === word[i]) {
            char.classList.add("correct"); 
          }
          else {
            word.includes(wordOne[i]) 
              ?  char.classList.add("correct-position")
              :  char.classList.add("blank");
            gameOver = false;
          }
        }
        break;
      case 2:
        for (let i=0; i < 5; i++) {
          const char = document.getElementById(`2${i}`);
          if (wordTwo[i] === word[i]) {
            char.classList.add("correct"); 
          }
          else {
            word.includes(wordTwo[i]) 
              ?  char.classList.add("correct-position")
              :  char.classList.add("blank");
            gameOver = false;
          }
        }
        break;
      case 3:
        for (let i=0; i < 5; i++) {
          const char = document.getElementById(`3${i}`);
          if (wordThree[i] === word[i]) {
            char.classList.add("correct"); 
          }
          else {
            word.includes(wordThree[i]) 
              ?  char.classList.add("correct-position")
              :  char.classList.add("blank");
            gameOver = false;
          }
        }
        break;
      case 4:
        for (let i=0; i < 5; i++) {
          const char = document.getElementById(`4${i}`);
          if (wordFour[i] === word[i]) {
            char.classList.add("correct"); 
          }
          else {
            word.includes(wordFour[i]) 
              ?  char.classList.add("correct-position")
              :  char.classList.add("blank");
            gameOver = false;
          }
        }
        break;
      case 5:
        for (let i=0; i < 5; i++) {
          const char = document.getElementById(`5${i}`);
          if (wordFive[i] === word[i]) {
            char.classList.add("correct"); 
          }
          else {
            word.includes(wordFive[i]) 
              ?  char.classList.add("correct-position")
              :  char.classList.add("blank");
            gameOver = false;
          }
        }
        break;
      case 6:
        for (let i=0; i < 5; i++) {
          const char = document.getElementById(`6${i}`);
          if (wordSix[i] === word[i]) {
            char.classList.add("correct"); 
          }
          else {
            word.includes(wordSix[i]) 
              ?  char.classList.add("correct-position")
              :  char.classList.add("blank");
            gameOver = false;
          }
        }
        break;
      default:
        break;
    }

    if ((gameOver && guess !== 0)) {
      setGuess(0);
      setWordOne('');
      setWordTwo('');
      setWordThree('');
      setWordFour('');
      setWordFive('');
      setWordSix('');
      setWord(generate({ minLength: 5, maxLength: 5 }));
      alert('You win!');
    } 

  }, [guess]);


  function handleInput(event) {
    const val = event.target.value;
    switch (guess) {
      case 0:
        setWordOne(val);
        break;
      case 1:
        setWordTwo(val);
        break;
      case 2:
        setWordThree(val);
        break;
      case 3:
        setWordFour(val);
        break;
      case 4:
        setWordFive(val);
        break;
      case 5:
        setWordSix(val);
        break;
      default:
        break;
    }
  }

  function takeGuess() {
    switch (guess) {
      case 0:
        if (wordOne.length === 5) {
          console.log('valid');
          setGuess(prev => prev+1);
        }
        break;
      case 1:
        if (wordTwo.length === 5) {
          console.log('valid');
          setGuess(prev => prev+1);
        }
        break;
      case 2:
        if (wordThree.length === 5) {
          console.log('valid');
          setGuess(prev => prev+1);
        }
        break;
      case 3:
        if (wordFour.length === 5) {
          console.log('valid');
          setGuess(prev => prev+1);
        }
        break;
      case 4:
        if (wordFive.length === 5) {
          console.log('valid');
          setGuess(prev => prev+1);
        }
        break;
      case 5:
        if (wordSix.length === 5) {
          console.log('valid');
          setGuess(prev => prev+1);
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className="container">
      <div className="grid-item"> 
        {Array.from(wordOne).map((char, index) => {
          return (
            <span id={`1${index}`} key={index}>
              {char}
            </span> 
          )
        })}
      </div>
      <div className="grid-item">
        {Array.from(wordTwo).map((char, index) => {
          return (
            <span id={`2${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      <div className="grid-item"> 
        {Array.from(wordThree).map((char, index) => {
          return (
            <span id={`3${index}`} key={index}>
              {char}
            </span> 
          )
        })}
      </div>
      <div className="grid-item">
        {Array.from(wordFour).map((char, index) => {
          return (
            <span id={`4${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      <div className="grid-item">
        {Array.from(wordFive).map((char, index) => {
          return (
            <span id={`5${index}`} key={index}>
              {char}
            </span> 
          )
        })} 
      </div>
      <div className="grid-item">
        {Array.from(wordSix).map((char, index) => {
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
        onChange={handleInput}
      />
      <button onClick={takeGuess}>
        Enter
      </button>
    </div>
  );
}; 

