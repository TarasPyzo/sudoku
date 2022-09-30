import React, { useState, useEffect } from 'react';

import GameGrid from './GameGrid';
import Toast from './Toast';
import initialData from '../helpers/initialData';
import { checkRows, checkColumns, checkSubgrids } from '../helpers/checkers';
import '../styles/App.css';

function App() {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleChange = (rowIdx, columnIdx, event) => {
    if (event.target.value.length > 1) event.target.value = event.target.value.charAt(0);
    if (event.target.value.match(/[1-9]/) === null) {
      event.target.value = '';
      return;
    }

    const temp = [...data];
    temp[rowIdx][columnIdx] = { value: parseInt(event.target.value) };
    setData(temp);
  };

  const handleCheckAnswers = () => {
    // check repetition
    let isRepetition = false;

    isRepetition = checkRows(data);
    if (isRepetition) {
      setIsError(isRepetition);
      return;
    }

    isRepetition = checkColumns(data);
    if (isRepetition) {
      setIsError(isRepetition);
      return;
    }

    isRepetition = checkSubgrids(data);
    setIsError(isRepetition);
    if (isRepetition) return;

    // check passing
    const totalCountOfDigits = 9 * 9;
    let countOfDigits = 0;
    data.forEach(row => {
      row.forEach(cell => {
        if (Number.isInteger(cell.value)) countOfDigits++;
      });
    });

    if (countOfDigits === totalCountOfDigits) setIsCompleted(true);
  };

  useEffect(() => {
    setData(JSON.parse(JSON.stringify(initialData)));
  }, []);

  return (
    <div className="container">
      <button className="btn-check-answers" onClick={handleCheckAnswers}>Check answers</button>
      <GameGrid
        data={data}
        handleChange={handleChange}
      />
      <Toast isError={isError} isCompleted={isCompleted} />
    </div>
  );
}

export default App;
