import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <h2 style={styles.title}>Sistema de Gestión de Historias Clínicas</h2>
          <p style={styles.description}>
            Aplicación para la gestión de historias clínicas en hospitales, implementada con GraphQL, 
            React y MongoDB. Arquitectura de Software - Parcial Práctico.
          </p>
        </div>

        <div style={styles.featuresGrid}>
          <div style={styles.feature}>
            <h3 style={styles.featureTitle}>GraphQL API</h3>
            <p style={styles.featureText}>
              API flexible y eficiente con queries y mutations para gestionar historias clínicas.
            </p>
          </div>
          <div style={styles.feature}>
            <h3 style={styles.featureTitle}>Gestión Completa</h3>
            <p style={styles.featureText}>
              Registro de pacientes, doctores e historias clínicas con relaciones entre entidades.
            </p>
          </div>
          <div style={styles.feature}>
            <h3 style={styles.featureTitle}>Docker Support</h3>
            <p style={styles.featureText}>
              Fully containerized with Docker for consistent development and deployment.
            </p>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Technology Stack</h3>
          <ul style={styles.list}>
            <li>Backend: Express.js with Node.js</li>
            <li>Frontend: React with Vite</li>
            <li>Database: MongoDB Atlas</li>
            <li>Containerization: Docker & Docker Compose</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#f5f5f5',
    minHeight: 'calc(100vh - 120px)',
    padding: '32px 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
  },
  hero: {
    backgroundColor: 'white',
    padding: '48px 32px',
    borderRadius: '8px',
    marginBottom: '32px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#2c3e50',
  },
  description: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  feature: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#2c3e50',
  },
  featureText: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  section: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#2c3e50',
  },
  list: {
    margin: 0,
    paddingLeft: '24px',
    color: '#666',
  },
};

export default HomePage;
