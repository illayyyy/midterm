import React from 'react';

const Borders = ({ borders, onSelectBorder }) => {
  return (
    <div>
      <strong>Borders:</strong>
      <ul>
        {borders ? borders.map((border, index) => (
          <li key={index} onClick={() => onSelectBorder(border)}>{border}</li>
        )) : 'No borders'}
      </ul>
    </div>
  );
};

export default Borders;
