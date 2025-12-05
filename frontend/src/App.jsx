import React from 'react';
import Header from './components/Header';
import MedicalRecordsPage from './pages/MedicalRecordsPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main style={styles.main}>
        <MedicalRecordsPage />
      </main>
    </div>
  );
}

const styles = {
  main: {
    minHeight: 'calc(100vh - 200px)',
    backgroundColor: '#f5f5f5',
  },
};

export default App;
