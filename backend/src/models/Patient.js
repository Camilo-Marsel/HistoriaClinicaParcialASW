const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del paciente es requerido'],
    trim: true
  },
  apellido: {
    type: String,
    required: [true, 'El apellido del paciente es requerido'],
    trim: true
  },
  cedula: {
    type: String,
    required: [true, 'La cédula del paciente es requerida'],
    unique: true,
    trim: true
  },
  edad: {
    type: Number,
    required: [true, 'La edad del paciente es requerida'],
    min: [0, 'La edad no puede ser negativa'],
    max: [150, 'La edad no puede ser mayor a 150']
  },
  genero: {
    type: String,
    required: [true, 'El género del paciente es requerido'],
    enum: ['Masculino', 'Femenino', 'Otro']
  }
}, {
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
