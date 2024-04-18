import React from 'react';

export default function FromLabel(props) {
  return (
    <label className="text-sm">
      {props.title}
      <span className="text-xs">*</span>
    </label>
  );
}
