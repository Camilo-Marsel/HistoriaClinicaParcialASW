/**
 * Componente reutilizable para mostrar mensaje de estado
 */

import React from 'react';
import { colors, utilStyles } from '../styles/theme';

const StatusMessage = ({ type = 'info', message, onClose }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#d4edda';
      case 'error':
        return '#f8d7da';
      case 'warning':
        return '#fff3cd';
      case 'info':
      default:
        return '#d1ecf1';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.danger;
      case 'warning':
        return colors.warning;
      case 'info':
      default:
        return colors.primary;
    }
  };

  const styles = {
    container: {
      padding: '12px 16px',
      marginBottom: '16px',
      borderRadius: '4px',
      backgroundColor: getBackgroundColor(),
      color: getTextColor(),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: 'inherit',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <span>{message}</span>
      {onClose && (
        <button 
          style={styles.closeButton}
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default StatusMessage;
