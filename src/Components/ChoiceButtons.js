import React from 'react';

const ChoiceButtons = ({ handleChoice }) => {
    return (
        <div className="button-group">
            <button onClick={() => handleChoice(1)}>1</button>
            <button onClick={() => handleChoice(2)}>2</button>
            <button onClick={() => handleChoice(3)}>3</button>
            <button onClick={() => handleChoice(4)}>4</button>
        </div>
    );
};

export default ChoiceButtons;
