/**
 * Componente reutilizable para sección de formulario
 */

import React from 'react';
import { spacing, titleStyles } from '../styles/theme';

const FormSection = ({ title, children, style = {} }) => {
  const styles = {
    container: {
      marginBottom: spacing.xxl,
    },
    title: {
      ...titleStyles.h3,
      marginTop: 0,
    },
  };

  return (
    <div style={{ ...styles.container, ...style }}>
      {title && <h3 style={styles.title}>{title}</h3>}
      {children}
    </div>
  );
};

export default FormSection;
