/**
 * Componente reutilizable para selects
 */

import React from 'react';
import { baseStyles, utilStyles } from '../styles/theme';

const SelectInput = ({
  name,
  label,
  value,
  onChange,
  options = [],
  required = false,
  error = '',
  disabled = false,
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
    select: {
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
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        style={styles.select}
      >
        <option value="">Selecciona una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span style={styles.errorText}>{error}</span>}
    </div>
  );
};

export default SelectInput;
