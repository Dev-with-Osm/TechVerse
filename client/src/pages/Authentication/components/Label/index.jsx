import React from 'react';

export default function FromLabel(props) {
  return (
    <label className="text-sm flex items-center gap-1">
      {props.title}
      <span className="text-xs text-red-300 ">*</span>
    </label>
  );
}
