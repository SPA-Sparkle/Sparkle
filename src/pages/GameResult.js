import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GameResult = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('buttonClicks')) || [];
    setResults(storedResults);
  }, []);

  return (
    <div>
      <h1>버튼 클릭 결과</h1>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
      <Link to="/Game">
        <button>게임으로 돌아가기</button>
      </Link>
    </div>
  );
};

export default GameResult;
