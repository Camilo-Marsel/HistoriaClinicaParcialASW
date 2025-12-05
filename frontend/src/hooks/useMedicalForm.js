/**
 * Hook personalizado para manejar formularios
 */

import { useState, useCallback } from 'react';
import { validateMedicalForm, validateSearchCedula } from '../utils/validation';
import { getInitialFormData } from '../utils/formatters';

export const useMedicalForm = (onSubmit) => {
  const [formData, setFormData] = useState(getInitialFormData());
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleInputChange = useCallback((e, section) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
    // Limpiar error del campo cuando cambia
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const handleGeneralInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  }, []);

  const validateForm = useCallback(() => {
    const validation = validateMedicalForm(formData);
    setErrors(validation.errors);
    return validation.isValid;
  }, [formData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        paciente: {
          ...formData.paciente,
          edad: parseInt(formData.paciente.edad),
        },
        doctor: formData.doctor,
        motivoConsulta: formData.motivoConsulta,
        diagnostico: formData.diagnostico,
        tratamiento: formData.tratamiento,
        fecha: formData.fecha,
      });
    }
  }, [formData, validateForm, onSubmit]);

  const resetForm = useCallback(() => {
    setFormData(getInitialFormData());
    setErrors({});
    setTouched({});
  }, []);

  return {
    formData,
    setFormData,
    errors,
    touched,
    handleInputChange,
    handleGeneralInputChange,
    handleBlur,
    validateForm,
    handleSubmit,
    resetForm,
  };
};

export const useSearchCedula = () => {
  const [cedula, setCedula] = useState('');
  const [searchCedula, setSearchCedula] = useState('');
  const [error, setError] = useState('');

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setError('');
    
    if (!validateSearchCedula(cedula)) {
      setError('Por favor ingresa una cédula válida');
      return;
    }
    
    setSearchCedula(cedula);
  }, [cedula]);

  const clearSearch = useCallback(() => {
    setCedula('');
    setSearchCedula('');
    setError('');
  }, []);

  return {
    cedula,
    setCedula,
    searchCedula,
    setSearchCedula,
    error,
    setError,
    handleSearch,
    clearSearch,
  };
};
