const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del doctor es requerido'],
    trim: true
  },
  cedulaProfesional: {
    type: String,
    required: [true, 'La cédula profesional del doctor es requerida'],
    unique: true,
    trim: true
  },
  especialidad: {
    type: String,
    required: [true, 'La especialidad del doctor es requerida'],
    trim: true
  }
}, {
  timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
