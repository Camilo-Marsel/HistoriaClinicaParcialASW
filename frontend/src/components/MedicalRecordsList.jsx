/**
 * Componente para lista de resultados
 */

import React from 'react';
import { spacing, titleStyles, colors } from '../styles/theme';
import MedicalRecordCard from './MedicalRecordCard';

const MedicalRecordsList = ({ records, patientName, isLoading, error }) => {
  const styles = {
    container: {
      marginTop: spacing.xxxl,
    },
    title: {
      ...titleStyles.h2,
      marginBottom: spacing.xl,
    },
    emptyMessage: {
      textAlign: 'center',
      fontSize: '16px',
      color: colors.placeholder,
      padding: spacing.xxxl,
    },
    errorMessage: {
      textAlign: 'center',
      fontSize: '16px',
      color: colors.danger,
      padding: spacing.xxxl,
    },
    loadingMessage: {
      textAlign: 'center',
      fontSize: '16px',
      color: colors.placeholder,
      padding: spacing.xxxl,
    },
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingMessage}>Buscando historias clínicas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorMessage}>Error: {error}</div>
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyMessage}>No se encontraron historias clínicas para esta cédula</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        Historias Clínicas - {patientName}
      </h2>
      {records.map((record) => (
        <MedicalRecordCard key={record.id} record={record} />
      ))}
    </div>
  );
};

export default MedicalRecordsList;
