import React from 'react';

import '../styles/GameGrid.css';

function GameGrid ({ data, handleChange }) {
  return (
    <div className="gamegrid-container">
      {data.map((row, rowIdx) => (
        row.map((cell, columnIdx) => (
          <input
            key={`${rowIdx}-${columnIdx}`}
            className={`gamegrid-item ${cell.isDisabled && 'gamegrid-item_disabled'}`}
            type="number"
            min="1"
            max="9"
            value={cell.value}
            onChange={(event) => handleChange(rowIdx, columnIdx, event)}
            disabled={cell.isDisabled}
          />
        ))
      ))}
    </div>
  );
}

export default GameGrid;
