/**
 * Componente reutilizable para entrada de texto
 */

import React from 'react';
import { baseStyles, utilStyles } from '../styles/theme';

const TextInput = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error = '',
  type = 'text',
  disabled = false,
  pattern,
}) => {
  const styles = {
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50',
    },
    input: {
      ...baseStyles.input,
      borderColor: error ? '#e74c3c' : undefined,
      backgroundColor: disabled ? '#ecf0f1' : 'white',
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
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        pattern={pattern}
        style={styles.input}
      />
      {error && <span style={styles.errorText}>{error}</span>}
    </div>
  );
};

export default TextInput;
