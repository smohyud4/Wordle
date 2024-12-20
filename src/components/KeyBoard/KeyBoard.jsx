/* eslint-disable react/prop-types */
import KeyRow from "./KeyRow";
import "./KeyBoard.css";

export default function KeyBoard({rowOne, rowTwo, rowThree}) {

  return <>
    <div className="keyBoardContainer">
      <ul id="rowOne">
        <KeyRow rowVals={rowOne}/> 
      </ul>
       <ul id="rowTwo">
         <KeyRow rowVals={rowTwo}/> 
       </ul>
       <ul id="rowThree">
         <KeyRow rowVals={rowThree}/> 
       </ul>
    </div>
  </>;
}