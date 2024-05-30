import React from 'react';

const Buttons = ({ buttonTexts, handleClick }) => {
  return (
    <div className="buttons">
      {buttonTexts.map((btnText, index) => (
        <button key={index} className="button" onClick={handleClick}>{btnText}</button>
      ))}
    </div>
  );
};

export default Buttons;