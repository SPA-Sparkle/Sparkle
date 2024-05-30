import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Game.css';
import Textbox from '../Components/Textbox';
import Buttons from '../Components/Buttons';

const Game = () => {
  const [textParts, setTextParts] = useState([]);
  const [buttonParts, setButtonParts] = useState([]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

  useEffect(() => {
    fetch('/script.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        const parts = data.split('/*다음*/');
        setTextParts(parts);
      })
      .catch(error => console.error('Error fetching the script:', error));

    fetch('/Button.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        const parts = data.split('/*다음*/').map(part => part.split('\n').filter(line => line.trim() !== ''));
        setButtonParts(parts);
      })
      .catch(error => console.error('Error fetching the buttons:', error));
  }, []);

  const handleNext = (buttonText) => {
    // 버튼 텍스트를 로컬 저장소에 저장합니다
    let storedResults = JSON.parse(localStorage.getItem('buttonClicks')) || [];
    storedResults.push(buttonText);
    localStorage.setItem('buttonClicks', JSON.stringify(storedResults));

    if (currentPartIndex < textParts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };

  return (
    <div>
      <Textbox text={textParts[currentPartIndex] || ''} />
      <Buttons buttonTexts={buttonParts[currentPartIndex] || []} handleClick={(e) => handleNext(e.target.innerText)} />
      {currentPartIndex >= textParts.length - 1 && (
        <Link to="/GameResult">
          <button>결과 보기</button>
        </Link>
      )}
    </div>
  );
};

export default Game;
