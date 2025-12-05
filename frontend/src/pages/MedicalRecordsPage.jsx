import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MEDICAL_RECORD_BY_CEDULA, CREATE_MEDICAL_RECORD } from '../graphql/queries';
import { useMedicalForm, useSearchCedula } from '../hooks/useMedicalForm';
import { baseStyles, titleStyles, colors, spacing } from '../styles/theme';

// Componentes
import SearchCedulaForm from '../components/SearchCedulaForm';
import MedicalRecordForm from '../components/MedicalRecordForm';
import MedicalRecordsList from '../components/MedicalRecordsList';
import FormContainer from '../components/FormContainer';
import Button from '../components/Button';
import StatusMessage from '../components/StatusMessage';

const MedicalRecordsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Hook para búsqueda
  const { 
    cedula, 
    setCedula, 
    searchCedula, 
    setSearchCedula, 
    handleSearch 
  } = useSearchCedula();

  // Query para buscar por cédula
  const { data, loading, error, refetch } = useQuery(GET_MEDICAL_RECORD_BY_CEDULA, {
    variables: { cedula: searchCedula },
    skip: !searchCedula,
  });

  // Mutation para crear historia clínica
  const [createMedicalRecord, { loading: creating }] = useMutation(CREATE_MEDICAL_RECORD, {
    onCompleted: () => {
      setStatusMessage({ type: 'success', message: 'Historia clínica creada exitosamente' });
      setShowForm(false);
      resetForm();
      if (searchCedula) {
        refetch();
      }
      setTimeout(() => setStatusMessage(null), 4000);
    },
    onError: (error) => {
      setStatusMessage({ type: 'error', message: `Error: ${error.message}` });
      setTimeout(() => setStatusMessage(null), 4000);
    }
  });

  // Hook para formulario
  const {
    formData,
    errors,
    touched,
    handleInputChange,
    handleGeneralInputChange,
    handleSubmit: handleFormSubmit,
    resetForm,
  } = useMedicalForm((input) => {
    createMedicalRecord({ variables: { input } });
  });

  const handleFormToggle = () => {
    setShowForm(!showForm);
    if (showForm) {
      resetForm();
    }
  };

  const styles = {
    container: {
      ...baseStyles.container,
      padding: `${spacing.xl} ${spacing.lg}`,
    },
    title: titleStyles.h1,
    searchSection: {
      marginBottom: spacing.xxxl,
    },
    actionButtons: {
      display: 'flex',
      gap: spacing.md,
      marginBottom: spacing.xxxl,
      alignItems: 'center',
    },
  };

  const patientName = data?.getMedicalRecordByCedula?.[0]?.paciente
    ? `${data.getMedicalRecordByCedula[0].paciente.nombre} ${data.getMedicalRecordByCedula[0].paciente.apellido}`
    : '';

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sistema de Historias Clínicas</h1>

      {/* Mensaje de estado */}
      {statusMessage && (
        <StatusMessage 
          type={statusMessage.type}
          message={statusMessage.message}
          onClose={() => setStatusMessage(null)}
        />
      )}

      {/* Búsqueda */}
      <div style={styles.searchSection}>
        <SearchCedulaForm
          cedula={cedula}
          onCedulaChange={setCedula}
          onSearch={handleSearch}
          isLoading={loading}
        />
        <div style={styles.actionButtons}>
          <Button 
            onClick={handleFormToggle}
            variant={showForm ? 'danger' : 'success'}
          >
            {showForm ? 'Cancelar' : 'Nueva Historia Clínica'}
          </Button>
        </div>
      </div>

      {/* Formulario */}
      {showForm && (
        <FormContainer title="Registrar Nueva Historia Clínica">
          <MedicalRecordForm
            formData={formData}
            errors={errors}
            touched={touched}
            onInputChange={handleInputChange}
            onGeneralInputChange={handleGeneralInputChange}
            onSubmit={handleFormSubmit}
            isLoading={creating}
          />
        </FormContainer>
      )}

      {/* Resultados */}
      <MedicalRecordsList
        records={data?.getMedicalRecordByCedula}
        patientName={patientName}
        isLoading={loading}
        error={error?.message}
      />
    </div>
  );
};

export default MedicalRecordsPage;
