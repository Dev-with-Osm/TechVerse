import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

export default function HomeButton(props) {
  return (
    <Link to={'/sign-in'} className="ui-btn">
      <span>{props.title}</span>
    </Link>
  );
}
