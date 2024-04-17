import React from 'react';
import './style.css';

export default function HomeButton(props) {
  return (
    <button className="ui-btn">
      <span>{props.title}</span>
    </button>
  );
}
