import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.title}>Sistema de Historias Clínicas</h1>
        <p style={styles.subtitle}>Gestión Hospitalaria con GraphQL & React</p>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '32px 0',
    marginBottom: '32px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '32px',
    fontWeight: 'bold',
  },
  subtitle: {
    margin: '0',
    fontSize: '16px',
    opacity: 0.9,
  },
};

export default Header;
