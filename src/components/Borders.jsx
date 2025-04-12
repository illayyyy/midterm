const Borders = ({ borders }) => {
    if (!borders || borders.length === 0) return <p>No bordering countries</p>;
  
    return (
      <div>
        <strong>Borders:</strong>
        <ul>
          {borders.map((code) => (
            <li key={code}>{code}</li> // Optional: Map codes to names if needed
          ))}
        </ul>
      </div>
    );
  };
  
  export default Borders;
  