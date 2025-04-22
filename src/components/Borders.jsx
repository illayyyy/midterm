const Borders = ({ borders, onBorderClick }) => {
  if (!borders || borders.length === 0)
    return <p className="no-borders">No bordering countries</p>;

  return (
    <div className="borders-container">
      <strong>Borders:</strong>
      <ul className="borders-list">
        {borders.map((code) => (
          <li
            key={code}
            className="borders-item"
            onClick={() => onBorderClick(code)}
            style={{
              cursor: 'pointer',
              color: '#1976d2',
              textDecoration: 'blink',
            }}
          >
            {code}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Borders;
