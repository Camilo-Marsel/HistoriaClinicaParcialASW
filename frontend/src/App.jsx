import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MedicalRecordsPage from './pages/MedicalRecordsPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="app">
      <Header />
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <button
            onClick={() => setCurrentPage('home')}
            style={{
              ...styles.navButton,
              backgroundColor: currentPage === 'home' ? '#3498db' : '#95a5a6',
            }}
          >
            Inicio
          </button>
          <button
            onClick={() => setCurrentPage('records')}
            style={{
              ...styles.navButton,
              backgroundColor: currentPage === 'records' ? '#3498db' : '#95a5a6',
            }}
          >
            Historias Clínicas
          </button>
        </div>
      </nav>

      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'records' && <MedicalRecordsPage />}
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2024 Software Architecture Course. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  nav: {
    backgroundColor: '#34495e',
    padding: '16px 0',
    borderBottom: '1px solid #2c3e50',
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    gap: '8px',
  },
  navButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  footer: {
    backgroundColor: '#2c3e50',
    color: 'white',
    textAlign: 'center',
    padding: '24px 16px',
    marginTop: '32px',
  },
};

export default App;
