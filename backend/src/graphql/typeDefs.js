const gql = require('graphql-tag');

const typeDefs = gql`
  type Patient {
    id: ID!
    nombre: String!
    apellido: String!
    cedula: String!
    edad: Int!
    genero: String!
    createdAt: String
    updatedAt: String
  }

  type Doctor {
    id: ID!
    nombre: String!
    cedulaProfesional: String!
    especialidad: String!
    createdAt: String
    updatedAt: String
  }

  type MedicalRecord {
    id: ID!
    paciente: Patient!
    doctor: Doctor!
    motivoConsulta: String!
    diagnostico: String!
    tratamiento: String!
    fecha: String!
    createdAt: String
    updatedAt: String
  }

  input PatientInput {
    nombre: String!
    apellido: String!
    cedula: String!
    edad: Int!
    genero: String!
  }

  input DoctorInput {
    nombre: String!
    cedulaProfesional: String!
    especialidad: String!
  }

  input MedicalRecordInput {
    paciente: PatientInput!
    doctor: DoctorInput!
    motivoConsulta: String!
    diagnostico: String!
    tratamiento: String!
    fecha: String
  }

  type Query {
    # Obtener historia clínica por cédula del paciente
    getMedicalRecordByCedula(cedula: String!): [MedicalRecord!]!
    
    # Obtener todas las historias clínicas (útil para testing)
    getAllMedicalRecords: [MedicalRecord!]!
    
    # Obtener todos los pacientes
    getAllPatients: [Patient!]!
    
    # Obtener todos los doctores
    getAllDoctors: [Doctor!]!
  }

  type Mutation {
    # Registrar una nueva historia clínica
    createMedicalRecord(input: MedicalRecordInput!): MedicalRecord!
    
    # Crear un paciente individual (opcional, para testing)
    createPatient(input: PatientInput!): Patient!
    
    # Crear un doctor individual (opcional, para testing)
    createDoctor(input: DoctorInput!): Doctor!
  }
`;

module.exports = typeDefs;
