import React from 'react';
import './style.css';

/**
 * Loader component
 * @returns {JSX.Element}
 */

export default function Loader() {
  return (
    <div className="three-body">
      <div className="three-body__dot"></div>
      <div className="three-body__dot"></div>
      <div className="three-body__dot"></div>
    </div>
  );
}
