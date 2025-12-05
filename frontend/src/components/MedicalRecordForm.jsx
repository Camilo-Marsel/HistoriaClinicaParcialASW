/**
 * Componente reutilizable para formulario de historia clínica
 */

import React from 'react';
import { spacing, utilStyles, baseStyles, colors } from '../styles/theme';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import SelectInput from './SelectInput';
import Button from './Button';
import FormSection from './FormSection';

const MedicalRecordForm = ({ 
  formData, 
  errors, 
  touched,
  onInputChange, 
  onSubmit, 
  isLoading = false 
}) => {
  const styles = {
    form: {
      ...baseStyles.flexColumn,
      gap: spacing.lg,
    },
    row: {
      ...utilStyles.flexRow,
    },
    genderOptions: [
      { value: 'Masculino', label: 'Masculino' },
      { value: 'Femenino', label: 'Femenino' },
      { value: 'Otro', label: 'Otro' },
    ],
  };

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      {/* Información del Paciente */}
      <FormSection title="Información del Paciente">
        <div style={styles.row}>
          <TextInput
            name="nombre"
            label="Nombre"
            value={formData.paciente.nombre}
            onChange={(e) => onInputChange(e, 'paciente')}
            placeholder="Nombre del paciente"
            required
            error={errors.patientName}
          />
          <TextInput
            name="apellido"
            label="Apellido"
            value={formData.paciente.apellido}
            onChange={(e) => onInputChange(e, 'paciente')}
            placeholder="Apellido del paciente"
            required
            error={errors.patientLastName}
          />
        </div>

        <div style={styles.row}>
          <TextInput
            name="cedula"
            label="Cédula"
            value={formData.paciente.cedula}
            onChange={(e) => onInputChange(e, 'paciente')}
            placeholder="Número de cédula"
            required
            error={errors.patientCedula}
          />
          <TextInput
            name="edad"
            label="Edad"
            type="number"
            value={formData.paciente.edad}
            onChange={(e) => onInputChange(e, 'paciente')}
            placeholder="Edad"
            required
            error={errors.patientAge}
          />
          <SelectInput
            name="genero"
            label="Género"
            value={formData.paciente.genero}
            onChange={(e) => onInputChange(e, 'paciente')}
            options={styles.genderOptions}
            required
            error={errors.patientGender}
          />
        </div>
      </FormSection>

      {/* Información del Doctor */}
      <FormSection title="Información del Doctor">
        <div style={styles.row}>
          <TextInput
            name="nombre"
            label="Nombre del Doctor"
            value={formData.doctor.nombre}
            onChange={(e) => onInputChange(e, 'doctor')}
            placeholder="Nombre completo"
            required
            error={errors.doctorName}
          />
          <TextInput
            name="cedulaProfesional"
            label="Cédula Profesional"
            value={formData.doctor.cedulaProfesional}
            onChange={(e) => onInputChange(e, 'doctor')}
            placeholder="Ej: MED-2018-001"
            required
            error={errors.doctorProfessionalId}
          />
          <TextInput
            name="especialidad"
            label="Especialidad"
            value={formData.doctor.especialidad}
            onChange={(e) => onInputChange(e, 'doctor')}
            placeholder="Ej: Cardiología"
            required
            error={errors.doctorSpecialty}
          />
        </div>
      </FormSection>

      {/* Historia Clínica */}
      <FormSection title="Historia Clínica">
        <TextAreaInput
          name="motivoConsulta"
          label="Motivo de Consulta"
          value={formData.motivoConsulta}
          onChange={onInputChange}
          placeholder="Describe el motivo de la consulta"
          required
          error={errors.reason}
          rows={3}
        />
        <TextAreaInput
          name="diagnostico"
          label="Diagnóstico"
          value={formData.diagnostico}
          onChange={onInputChange}
          placeholder="Diagnóstico realizado"
          required
          error={errors.diagnosis}
          rows={3}
        />
        <TextAreaInput
          name="tratamiento"
          label="Tratamiento"
          value={formData.tratamiento}
          onChange={onInputChange}
          placeholder="Tratamiento recomendado"
          required
          error={errors.treatment}
          rows={3}
        />
        <TextInput
          name="fecha"
          label="Fecha de la Consulta"
          type="date"
          value={formData.fecha}
          onChange={onInputChange}
          required
          error={errors.date}
        />
      </FormSection>

      <Button 
        type="submit" 
        variant="secondary"
        loading={isLoading}
        fullWidth
      >
        Guardar Historia Clínica
      </Button>
    </form>
  );
};

export default MedicalRecordForm;
