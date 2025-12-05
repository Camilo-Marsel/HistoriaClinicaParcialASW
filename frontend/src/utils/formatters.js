/**
 * Funciones auxiliares para formateo de datos médicos
 */

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateInput = (date) => {
  if (!date) return new Date().toISOString().split('T')[0];
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export const formatPatientInfo = (patient) => {
  if (!patient) return '';
  return `${patient.nombre} ${patient.apellido} (CC: ${patient.cedula})`;
};

export const formatDoctorInfo = (doctor) => {
  if (!doctor) return '';
  return `${doctor.nombre} - ${doctor.especialidad} (C.P.: ${doctor.cedulaProfesional})`;
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const getInitialFormData = () => ({
  paciente: {
    nombre: '',
    apellido: '',
    cedula: '',
    edad: '',
    genero: 'Masculino',
  },
  doctor: {
    nombre: '',
    cedulaProfesional: '',
    especialidad: '',
  },
  motivoConsulta: '',
  diagnostico: '',
  tratamiento: '',
  fecha: formatDateInput(),
});
