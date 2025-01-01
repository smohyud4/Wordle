/* eslint-disable react/prop-types */
import './Header.css';

export default function Header({title}) {
  return (
    <header>
      <h1 id='title'>{title}</h1>
    </header>
  );
}