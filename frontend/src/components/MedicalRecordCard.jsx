/**
 * Componente reutilizable para tarjeta de historia clínica
 */

import React from 'react';
import { baseStyles, colors, spacing } from '../styles/theme';
import { formatDate, formatPatientInfo, formatDoctorInfo } from '../utils/formatters';

const MedicalRecordCard = ({ record }) => {
  const styles = {
    card: {
      ...baseStyles.card,
      borderLeft: `4px solid ${colors.primary}`,
    },
    header: {
      borderBottom: `2px solid ${colors.primary}`,
      paddingBottom: spacing.md,
      marginBottom: spacing.lg,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    date: {
      fontSize: '14px',
      color: colors.placeholder,
      fontWeight: 'bold',
    },
    section: {
      marginBottom: spacing.lg,
    },
    label: {
      fontWeight: 'bold',
      color: colors.dark,
      marginBottom: spacing.sm,
    },
    content: {
      color: colors.text,
      lineHeight: '1.6',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
    },
    sectionTitle: {
      fontWeight: 'bold',
      color: colors.primary,
      fontSize: '14px',
      textTransform: 'uppercase',
      marginBottom: spacing.md,
      marginTop: spacing.lg,
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.date}>{formatDate(record.fecha)}</div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Información del Paciente</div>
        <div style={styles.content}>{formatPatientInfo(record.paciente)} - {record.paciente.edad} años ({record.paciente.genero})</div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Doctor Asignado</div>
        <div style={styles.content}>{formatDoctorInfo(record.doctor)}</div>
      </div>

      <div style={styles.section}>
        <div style={styles.label}>Motivo de Consulta:</div>
        <div style={styles.content}>{record.motivoConsulta}</div>
      </div>

      <div style={styles.section}>
        <div style={styles.label}>Diagnóstico:</div>
        <div style={styles.content}>{record.diagnostico}</div>
      </div>

      <div style={styles.section}>
        <div style={styles.label}>Tratamiento:</div>
        <div style={styles.content}>{record.tratamiento}</div>
      </div>
    </div>
  );
};

export default MedicalRecordCard;
