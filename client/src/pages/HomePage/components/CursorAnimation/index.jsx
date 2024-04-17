import React, { useEffect, useRef } from 'react'
import './style.css'

export default function CursorAnimation() {
    const cursorDotRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorDotRef.current.style.top = e.clientY + 'px';
      cursorDotRef.current.style.left = e.clientX + 'px';
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <div ref={cursorDotRef} className="hidden md:block cursor-dot"></div>
  )
}
