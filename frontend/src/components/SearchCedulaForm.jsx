/**
 * Componente reutilizable para búsqueda por cédula
 */

import React from 'react';
import { colors, spacing, baseStyles, utilStyles, titleStyles } from '../styles/theme';

const SearchCedulaForm = ({ cedula, onCedulaChange, onSearch, isLoading }) => {
  const styles = {
    container: {
      display: 'flex',
      gap: spacing.md,
      marginBottom: spacing.xxxl,
      alignItems: 'center',
    },
    form: {
      display: 'flex',
      gap: spacing.md,
      flex: 1,
    },
    input: {
      ...baseStyles.input,
      flex: 1,
    },
    button: {
      ...baseStyles.button,
      backgroundColor: colors.primary,
      color: 'white',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={onSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Ingrese cédula del paciente"
          value={cedula}
          onChange={(e) => onCedulaChange(e.target.value)}
          style={styles.input}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
    </div>
  );
};

export default SearchCedulaForm;
