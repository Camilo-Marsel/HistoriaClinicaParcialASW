import { gql } from '@apollo/client';

// Query para obtener historias clínicas por cédula
export const GET_MEDICAL_RECORD_BY_CEDULA = gql`
  query GetMedicalRecordByCedula($cedula: String!) {
    getMedicalRecordByCedula(cedula: $cedula) {
      id
      motivoConsulta
      diagnostico
      tratamiento
      fecha
      paciente {
        id
        nombre
        apellido
        cedula
        edad
        genero
      }
      doctor {
        id
        nombre
        cedulaProfesional
        especialidad
      }
      createdAt
      updatedAt
    }
  }
`;

// Query para obtener todas las historias clínicas
export const GET_ALL_MEDICAL_RECORDS = gql`
  query GetAllMedicalRecords {
    getAllMedicalRecords {
      id
      motivoConsulta
      diagnostico
      tratamiento
      fecha
      paciente {
        id
        nombre
        apellido
        cedula
        edad
        genero
      }
      doctor {
        id
        nombre
        cedulaProfesional
        especialidad
      }
      createdAt
      updatedAt
    }
  }
`;

// Query para obtener todos los pacientes
export const GET_ALL_PATIENTS = gql`
  query GetAllPatients {
    getAllPatients {
      id
      nombre
      apellido
      cedula
      edad
      genero
      createdAt
      updatedAt
    }
  }
`;

// Query para obtener todos los doctores
export const GET_ALL_DOCTORS = gql`
  query GetAllDoctors {
    getAllDoctors {
      id
      nombre
      cedulaProfesional
      especialidad
      createdAt
      updatedAt
    }
  }
`;

// Mutation para crear una historia clínica completa
export const CREATE_MEDICAL_RECORD = gql`
  mutation CreateMedicalRecord($input: MedicalRecordInput!) {
    createMedicalRecord(input: $input) {
      id
      motivoConsulta
      diagnostico
      tratamiento
      fecha
      paciente {
        id
        nombre
        apellido
        cedula
        edad
        genero
      }
      doctor {
        id
        nombre
        cedulaProfesional
        especialidad
      }
      createdAt
      updatedAt
    }
  }
`;

// Mutation para crear un paciente
export const CREATE_PATIENT = gql`
  mutation CreatePatient($input: PatientInput!) {
    createPatient(input: $input) {
      id
      nombre
      apellido
      cedula
      edad
      genero
      createdAt
      updatedAt
    }
  }
`;

// Mutation para crear un doctor
export const CREATE_DOCTOR = gql`
  mutation CreateDoctor($input: DoctorInput!) {
    createDoctor(input: $input) {
      id
      nombre
      cedulaProfesional
      especialidad
      createdAt
      updatedAt
    }
  }
`;
