/**
 * Componente reutilizable para botón
 */

import React from 'react';
import { baseStyles, colors } from '../styles/theme';

const Button = ({
  onClick,
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  ...props
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return colors.success;
      case 'danger':
        return colors.danger;
      case 'warning':
        return colors.warning;
      case 'secondary':
        return colors.secondary;
      case 'primary':
      default:
        return colors.primary;
    }
  };

  const styles = {
    button: {
      ...baseStyles.button,
      backgroundColor: getBackgroundColor(),
      color: 'white',
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled || loading ? 0.6 : 1,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={styles.button}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
};

export default Button;
