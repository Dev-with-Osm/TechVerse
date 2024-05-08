import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function HomeButton(props) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Link to={currentUser ? '/new-post' : 'sign-in'} className="ui-btn">
      <span>{props.title}</span>
    </Link>
  );
}
