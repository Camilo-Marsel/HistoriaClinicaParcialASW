const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'El paciente es requerido']
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'El doctor es requerido']
  },
  motivoConsulta: {
    type: String,
    required: [true, 'El motivo de consulta es requerido'],
    trim: true
  },
  diagnostico: {
    type: String,
    required: [true, 'El diagnóstico es requerido'],
    trim: true
  },
  tratamiento: {
    type: String,
    required: [true, 'El tratamiento es requerido'],
    trim: true
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es requerida'],
    default: Date.now
  }
}, {
  timestamps: true
});

// Populate automático al hacer queries
medicalRecordSchema.pre(/^find/, function(next) {
  this.populate('paciente').populate('doctor');
  next();
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

module.exports = MedicalRecord;
