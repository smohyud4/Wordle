/* eslint-disable react/prop-types */
import "./KeyBoard.css";

export default function KeyBoard({
  rowOne, 
  rowTwo, 
  rowThree, 
  handleClick,
  handleEnter,
  handleDelete
}) {

  return <>
    <div className="keyBoardContainer">
      <div id="rowOne">
        {rowOne.split('').map((char, index)=> {
          return (
            <button
              id={char}
              key={index}
              className='keyButton'
              onClick={() => handleClick(char)} 
            >
              {char}
            </button>
          )
        })}
      </div>
      <div id="rowTwo">
        {rowTwo.split('').map((char, index)=> {
          return (
            <button
              id={char}
              key={index}
              className='keyButton'
              onClick={() => handleClick(char)}  
            >
              {char}
            </button>
          )
        })}
      </div>
      <div id="rowThree">
        <button className='action' onClick={() => handleEnter()}>
          Enter
        </button>
        {rowThree.split('').map((char, index)=> {
          return (
            <button
              id={char}
              key={index}
              className='keyButton'
              onClick={() => handleClick(char)}  
            >
              {char}
            </button>
          )
        })}
        <button className='action' onClick={() => handleDelete()}>
          Delete
        </button>
       </div>
    </div>
  </>;
}