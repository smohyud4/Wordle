/* eslint-disable react/prop-types */

export default function KeyRow({rowVals}) {
  return (
    <>
      {rowVals.split('').map((char, index)=>{
        return(
        <li
          id={char}
          key={index} 
        >
          {char}
        </li>
        )
      })}
    </>
  )
}