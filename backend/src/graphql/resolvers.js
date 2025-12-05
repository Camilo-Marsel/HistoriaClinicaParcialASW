const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const MedicalRecord = require('../models/MedicalRecord');

const resolvers = {
  Query: {
    getMedicalRecordByCedula: async (_, { cedula }) => {
      try {
        const patient = await Patient.findOne({ cedula });
        
        if (!patient) {
          throw new Error(`No se encontró un paciente con la cédula: ${cedula}`);
        }

        const medicalRecords = await MedicalRecord.find({ paciente: patient._id });
        
        return medicalRecords;
      } catch (error) {
        throw new Error(`Error al obtener historias clínicas: ${error.message}`);
      }
    },

    getAllMedicalRecords: async () => {
      try {
        const medicalRecords = await MedicalRecord.find();
        return medicalRecords;
      } catch (error) {
        throw new Error(`Error al obtener historias clínicas: ${error.message}`);
      }
    },

    getAllPatients: async () => {
      try {
        const patients = await Patient.find();
        return patients;
      } catch (error) {
        throw new Error(`Error al obtener pacientes: ${error.message}`);
      }
    },

    getAllDoctors: async () => {
      try {
        const doctors = await Doctor.find();
        return doctors;
      } catch (error) {
        throw new Error(`Error al obtener doctores: ${error.message}`);
      }
    }
  },

  Mutation: {
    createMedicalRecord: async (_, { input }) => {
      try {
        let patient = await Patient.findOne({ cedula: input.paciente.cedula });
        
        if (!patient) {
          patient = new Patient({
            nombre: input.paciente.nombre,
            apellido: input.paciente.apellido,
            cedula: input.paciente.cedula,
            edad: input.paciente.edad,
            genero: input.paciente.genero
          });
          await patient.save();
        }

        let doctor = await Doctor.findOne({ cedulaProfesional: input.doctor.cedulaProfesional });
        
        if (!doctor) {
          doctor = new Doctor({
            nombre: input.doctor.nombre,
            cedulaProfesional: input.doctor.cedulaProfesional,
            especialidad: input.doctor.especialidad
          });
          await doctor.save();
        }

        const medicalRecord = new MedicalRecord({
          paciente: patient._id,
          doctor: doctor._id,
          motivoConsulta: input.motivoConsulta,
          diagnostico: input.diagnostico,
          tratamiento: input.tratamiento,
          fecha: input.fecha || new Date()
        });

        await medicalRecord.save();
        await medicalRecord.populate('paciente');
        await medicalRecord.populate('doctor');

        return medicalRecord;
      } catch (error) {
        throw new Error(`Error al crear historia clínica: ${error.message}`);
      }
    },

    createPatient: async (_, { input }) => {
      try {
        const patient = new Patient(input);
        await patient.save();
        return patient;
      } catch (error) {
        throw new Error(`Error al crear paciente: ${error.message}`);
      }
    },

    createDoctor: async (_, { input }) => {
      try {
        const doctor = new Doctor(input);
        await doctor.save();
        return doctor;
      } catch (error) {
        throw new Error(`Error al crear doctor: ${error.message}`);
      }
    }
  },

  MedicalRecord: {
    id: (parent) => parent._id.toString(),
    paciente: (parent) => parent.paciente,
    doctor: (parent) => parent.doctor,
    fecha: (parent) => parent.fecha.toISOString(),
    createdAt: (parent) => parent.createdAt?.toISOString(),
    updatedAt: (parent) => parent.updatedAt?.toISOString()
  },

  Patient: {
    id: (parent) => parent._id.toString(),
    createdAt: (parent) => parent.createdAt?.toISOString(),
    updatedAt: (parent) => parent.updatedAt?.toISOString()
  },

  Doctor: {
    id: (parent) => parent._id.toString(),
    createdAt: (parent) => parent.createdAt?.toISOString(),
    updatedAt: (parent) => parent.updatedAt?.toISOString()
  }
};

module.exports = resolvers;
