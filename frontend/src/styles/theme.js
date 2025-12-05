/**
 * Estilos centralizados para la aplicación
 * Facilita la consistencia y facilita cambios globales
 */

export const colors = {
  primary: '#3498db',
  secondary: '#2980b9',
  success: '#27ae60',
  danger: '#e74c3c',
  warning: '#f39c12',
  light: '#ecf0f1',
  dark: '#2c3e50',
  border: '#bdc3c7',
  text: '#34495e',
  placeholder: '#7f8c8d',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px',
};

export const baseStyles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${spacing.lg}`,
  },
  input: {
    padding: `${spacing.md} ${spacing.lg}`,
    fontSize: '16px',
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    fontFamily: 'inherit',
    '&:focus': {
      outline: 'none',
      borderColor: colors.primary,
    },
  },
  button: {
    padding: `${spacing.md} ${spacing.xl}`,
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    '&:hover': {
      opacity: 0.9,
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
  textarea: {
    padding: `${spacing.md} ${spacing.lg}`,
    fontSize: '16px',
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    minHeight: '100px',
    resize: 'vertical',
    fontFamily: 'inherit',
    fontFamily: 'inherit',
  },
  card: {
    backgroundColor: 'white',
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  section: {
    marginBottom: spacing.xxxl,
  },
};

export const titleStyles = {
  h1: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: spacing.xxxl,
    color: colors.dark,
    textAlign: 'center',
  },
  h2: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: spacing.xl,
    color: colors.text,
  },
  h3: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    color: colors.placeholder,
  },
};

export const utilStyles = {
  flexRow: {
    display: 'flex',
    gap: spacing.md,
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  grid2Col: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.lg,
  },
  grid3Col: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing.lg,
  },
  textCenter: {
    textAlign: 'center',
  },
  textError: {
    color: colors.danger,
    fontSize: '14px',
  },
  textSuccess: {
    color: colors.success,
    fontSize: '14px',
  },
};
