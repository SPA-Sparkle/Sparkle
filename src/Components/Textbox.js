import React from 'react';

const Textbox = ({ text }) => {
  return (
    <textarea
      className="textbox"
      value={text}
      readOnly
    />
  );
};

export default Textbox;
