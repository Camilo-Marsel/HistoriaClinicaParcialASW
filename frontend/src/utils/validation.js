/**
 * Validaciones para formularios
 */

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateCedula = (cedula) => {
  return cedula && cedula.trim().length > 0 && !isNaN(cedula);
};

export const validateAge = (age) => {
  const numAge = parseInt(age);
  return numAge >= 0 && numAge <= 150;
};

export const validateProfessionalId = (id) => {
  return id && id.trim().length > 0;
};

export const validateMedicalForm = (data) => {
  const errors = {};

  // Validar paciente
  if (!data.paciente.nombre?.trim()) errors.patientName = 'El nombre del paciente es requerido';
  if (!data.paciente.apellido?.trim()) errors.patientLastName = 'El apellido del paciente es requerido';
  if (!validateCedula(data.paciente.cedula)) errors.patientCedula = 'La cédula debe ser válida';
  if (!validateAge(data.paciente.edad)) errors.patientAge = 'La edad debe estar entre 0 y 150';
  if (!data.paciente.genero) errors.patientGender = 'El género es requerido';

  // Validar doctor
  if (!data.doctor.nombre?.trim()) errors.doctorName = 'El nombre del doctor es requerido';
  if (!validateProfessionalId(data.doctor.cedulaProfesional)) 
    errors.doctorProfessionalId = 'La cédula profesional es requerida';
  if (!data.doctor.especialidad?.trim()) errors.doctorSpecialty = 'La especialidad es requerida';

  // Validar historia clínica
  if (!data.motivoConsulta?.trim()) errors.reason = 'El motivo de consulta es requerido';
  if (!data.diagnostico?.trim()) errors.diagnosis = 'El diagnóstico es requerido';
  if (!data.tratamiento?.trim()) errors.treatment = 'El tratamiento es requerido';
  if (!data.fecha) errors.date = 'La fecha es requerida';

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSearchCedula = (cedula) => {
  return validateCedula(cedula);
};
