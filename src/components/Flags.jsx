const Flag = ({ flagUrl }) => {
    if (!flagUrl) return null;
  
    return (
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src={flagUrl}
          alt="Country flag"
        />
      </div>
    );
  };
  
  export default Flag;
  