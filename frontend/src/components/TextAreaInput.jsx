/**
 * Componente reutilizable para textarea
 */

import React from 'react';
import { baseStyles, utilStyles } from '../styles/theme';

const TextAreaInput = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error = '',
  disabled = false,
  rows = 4,
}) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50',
    },
    textarea: {
      ...baseStyles.textarea,
      borderColor: error ? '#e74c3c' : undefined,
      backgroundColor: disabled ? '#ecf0f1' : 'white',
      minHeight: `${rows * 24}px`,
    },
    errorText: {
      ...utilStyles.textError,
    },
  };

  return (
    <div style={styles.container}>
      {label && (
        <label style={styles.label}>
          {label}
          {required && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        style={styles.textarea}
      />
      {error && <span style={styles.errorText}>{error}</span>}
    </div>
  );
};

export default TextAreaInput;
