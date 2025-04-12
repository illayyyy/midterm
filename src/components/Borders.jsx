const Borders = ({ borders }) => {
    if (!borders || borders.length === 0) return <p style={styles.noBorders}>No bordering countries</p>;
  
    return (
      <div style={styles.bordersContainer}>
        <strong>Borders:</strong>
        <ul style={styles.bordersList}>
          {borders.map((code) => (
            <li key={code} style={styles.bordersItem}>{code}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  const styles = {
    bordersContainer: {
      marginTop: '20px',
      textAlign: 'left',
    },
    bordersList: {
      listStyleType: 'none',
      padding: 0,
    },
    bordersItem: {
      padding: '5px 0',
    },
    noBorders: {
      color: '#ff6f61',
      fontStyle: 'italic',
    }
  };
  
  export default Borders;
  