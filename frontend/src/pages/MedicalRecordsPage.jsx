import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MEDICAL_RECORD_BY_CEDULA, CREATE_MEDICAL_RECORD } from '../graphql/queries';

const MedicalRecordsPage = () => {
  const [cedula, setCedula] = useState('');
  const [searchCedula, setSearchCedula] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    paciente: {
      nombre: '',
      apellido: '',
      cedula: '',
      edad: '',
      genero: 'Masculino'
    },
    doctor: {
      nombre: '',
      cedulaProfesional: '',
      especialidad: ''
    },
    motivoConsulta: '',
    diagnostico: '',
    tratamiento: '',
    fecha: new Date().toISOString().split('T')[0]
  });

  // Query para buscar por cédula
  const { data, loading, error, refetch } = useQuery(GET_MEDICAL_RECORD_BY_CEDULA, {
    variables: { cedula: searchCedula },
    skip: !searchCedula,
  });

  // Mutation para crear historia clínica
  const [createMedicalRecord, { loading: creating }] = useMutation(CREATE_MEDICAL_RECORD, {
    onCompleted: () => {
      alert('Historia clínica creada exitosamente');
      setShowForm(false);
      resetForm();
      if (searchCedula) {
        refetch();
      }
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchCedula(cedula);
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const input = {
      paciente: {
        ...formData.paciente,
        edad: parseInt(formData.paciente.edad)
      },
      doctor: formData.doctor,
      motivoConsulta: formData.motivoConsulta,
      diagnostico: formData.diagnostico,
      tratamiento: formData.tratamiento,
      fecha: formData.fecha
    };

    createMedicalRecord({ variables: { input } });
  };

  const resetForm = () => {
    setFormData({
      paciente: {
        nombre: '',
        apellido: '',
        cedula: '',
        edad: '',
        genero: 'Masculino'
      },
      doctor: {
        nombre: '',
        cedulaProfesional: '',
        especialidad: ''
      },
      motivoConsulta: '',
      diagnostico: '',
      tratamiento: '',
      fecha: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sistema de Historias Clínicas</h1>

      {/* Search Form */}
      <div style={styles.searchSection}>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Ingrese cédula del paciente"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Buscar</button>
        </form>
        <button 
          onClick={() => setShowForm(!showForm)} 
          style={{ ...styles.button, ...styles.createButton }}
        >
          {showForm ? 'Cancelar' : 'Nueva Historia Clínica'}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div style={styles.formSection}>
          <h2 style={styles.subtitle}>Registrar Nueva Historia Clínica</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            
            <h3 style={styles.sectionTitle}>Información del Paciente</h3>
            <div style={styles.row}>
              <input
                name="nombre"
                placeholder="Nombre"
                value={formData.paciente.nombre}
                onChange={(e) => handleInputChange(e, 'paciente')}
                style={styles.input}
                required
              />
              <input
                name="apellido"
                placeholder="Apellido"
                value={formData.paciente.apellido}
                onChange={(e) => handleInputChange(e, 'paciente')}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.row}>
              <input
                name="cedula"
                placeholder="Cédula"
                value={formData.paciente.cedula}
                onChange={(e) => handleInputChange(e, 'paciente')}
                style={styles.input}
                required
              />
              <input
                name="edad"
                type="number"
                placeholder="Edad"
                value={formData.paciente.edad}
                onChange={(e) => handleInputChange(e, 'paciente')}
                style={styles.input}
                required
              />
              <select
                name="genero"
                value={formData.paciente.genero}
                onChange={(e) => handleInputChange(e, 'paciente')}
                style={styles.input}
                required
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <h3 style={styles.sectionTitle}>Información del Doctor</h3>
            <div style={styles.row}>
              <input
                name="nombre"
                placeholder="Nombre del Doctor"
                value={formData.doctor.nombre}
                onChange={(e) => handleInputChange(e, 'doctor')}
                style={styles.input}
                required
              />
              <input
                name="cedulaProfesional"
                placeholder="Cédula Profesional"
                value={formData.doctor.cedulaProfesional}
                onChange={(e) => handleInputChange(e, 'doctor')}
                style={styles.input}
                required
              />
              <input
                name="especialidad"
                placeholder="Especialidad"
                value={formData.doctor.especialidad}
                onChange={(e) => handleInputChange(e, 'doctor')}
                style={styles.input}
                required
              />
            </div>

            <h3 style={styles.sectionTitle}>Historia Clínica</h3>
            <textarea
              name="motivoConsulta"
              placeholder="Motivo de Consulta"
              value={formData.motivoConsulta}
              onChange={handleInputChange}
              style={{ ...styles.input, ...styles.textarea }}
              required
            />
            <textarea
              name="diagnostico"
              placeholder="Diagnóstico"
              value={formData.diagnostico}
              onChange={handleInputChange}
              style={{ ...styles.input, ...styles.textarea }}
              required
            />
            <textarea
              name="tratamiento"
              placeholder="Tratamiento"
              value={formData.tratamiento}
              onChange={handleInputChange}
              style={{ ...styles.input, ...styles.textarea }}
              required
            />
            <input
              name="fecha"
              type="date"
              value={formData.fecha}
              onChange={handleInputChange}
              style={styles.input}
              required
            />

            <button type="submit" disabled={creating} style={styles.submitButton}>
              {creating ? 'Guardando...' : 'Guardar Historia Clínica'}
            </button>
          </form>
        </div>
      )}

      {/* Results */}
      {loading && <p style={styles.message}>Buscando...</p>}
      {error && <p style={styles.error}>Error: {error.message}</p>}
      
      {data && data.getMedicalRecordByCedula && (
        <div style={styles.resultsSection}>
          <h2 style={styles.subtitle}>
            Historias Clínicas - {data.getMedicalRecordByCedula[0]?.paciente.nombre} {data.getMedicalRecordByCedula[0]?.paciente.apellido}
          </h2>
          {data.getMedicalRecordByCedula.length === 0 ? (
            <p style={styles.message}>No se encontraron historias clínicas para esta cédula</p>
          ) : (
            data.getMedicalRecordByCedula.map((record) => (
              <div key={record.id} style={styles.recordCard}>
                <div style={styles.cardHeader}>
                  <span style={styles.date}>{new Date(record.fecha).toLocaleDateString('es-ES')}</span>
                </div>
                
                <div style={styles.cardSection}>
                  <strong>Paciente:</strong> {record.paciente.nombre} {record.paciente.apellido} 
                  ({record.paciente.cedula}) - {record.paciente.edad} años - {record.paciente.genero}
                </div>
                
                <div style={styles.cardSection}>
                  <strong>Doctor:</strong> {record.doctor.nombre} - {record.doctor.especialidad} 
                  (C.P.: {record.doctor.cedulaProfesional})
                </div>
                
                <div style={styles.cardSection}>
                  <strong>Motivo de Consulta:</strong>
                  <p>{record.motivoConsulta}</p>
                </div>
                
                <div style={styles.cardSection}>
                  <strong>Diagnóstico:</strong>
                  <p>{record.diagnostico}</p>
                </div>
                
                <div style={styles.cardSection}>
                  <strong>Tratamiento:</strong>
                  <p>{record.tratamiento}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#2c3e50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#34495e',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '10px',
    color: '#7f8c8d',
  },
  searchSection: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    alignItems: 'center',
  },
  searchForm: {
    display: 'flex',
    gap: '10px',
    flex: 1,
  },
  formSection: {
    backgroundColor: '#ecf0f1',
    padding: '30px',
    borderRadius: '8px',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  row: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    flex: 1,
  },
  textarea: {
    minHeight: '100px',
    resize: 'vertical',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  createButton: {
    backgroundColor: '#27ae60',
  },
  submitButton: {
    padding: '15px',
    fontSize: '18px',
    backgroundColor: '#2980b9',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  resultsSection: {
    marginTop: '30px',
  },
  recordCard: {
    backgroundColor: 'white',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  cardHeader: {
    borderBottom: '2px solid #3498db',
    paddingBottom: '10px',
    marginBottom: '15px',
  },
  date: {
    fontSize: '14px',
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  cardSection: {
    marginBottom: '15px',
  },
  message: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#7f8c8d',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#e74c3c',
  },
};

export default MedicalRecordsPage;
