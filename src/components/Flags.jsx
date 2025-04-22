const Flag = ({ flagUrl }) => {
  if (!flagUrl) return null;

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <img
        src={flagUrl}
        alt="Country flag"
        style={{
          width: '400px',  // Smaller size (adjust as needed)
          height: 'auto',
          borderRadius: '10px',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
          display: 'block',
          margin: '0 auto',
        }}
      />
    </div>
  );
};

export default Flag;


