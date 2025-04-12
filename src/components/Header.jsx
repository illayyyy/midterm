import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>Country Information</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#ffb6c1',
    color: '#fff',
    padding: '20px 0',
    fontSize: '36px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    borderRadius: '10px',
  },
};

export default Header;
