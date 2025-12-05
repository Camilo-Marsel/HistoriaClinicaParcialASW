/**
 * Componente contenedor reutilizable
 */

import React from 'react';
import { baseStyles, spacing, titleStyles, colors } from '../styles/theme';

const FormContainer = ({ title, children, style = {} }) => {
  const styles = {
    container: {
      backgroundColor: colors.light,
      padding: spacing.xxxl,
      borderRadius: '8px',
      marginBottom: spacing.xxxl,
      ...style,
    },
    title: {
      ...titleStyles.h2,
      marginTop: 0,
    },
  };

  return (
    <div style={styles.container}>
      {title && <h2 style={styles.title}>{title}</h2>}
      {children}
    </div>
  );
};

export default FormContainer;
