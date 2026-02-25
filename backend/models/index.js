// models/index.js
import sequelize from '../config/database.js';

// Import models
import User from './userModel.js';
import Patient from './patientModel.js';
import Doctor from './doctorModel.js';
import Appointment from './appointmentModel.js';
import Billing from './billModel.js';
import MedHistory from './med_historyModel.js';


// Initialize models
const db = {
  sequelize,
  User,
  Patient,
  Doctor,
  Appointment,
  Billing,
  MedHistory
};

// Set up associations
db.Patient.hasMany(db.Appointment, {
  foreignKey: 'patient_id',
  as: 'appointments'
});

db.Appointment.belongsTo(db.Patient, {
  foreignKey: 'patient_id',
  as: 'patient'
});

db.Doctor.hasMany(db.Appointment, {
  foreignKey: 'doctor_id',
  as: 'appointments'
});

db.Appointment.belongsTo(db.Doctor, {
  foreignKey: 'doctor_id',
  as: 'doctor'
});

// Medical History Relationships
db.MedHistory.belongsTo(db.Patient, { foreignKey: 'patient_id', as: 'patient' });
db.MedHistory.belongsTo(db.Doctor, { foreignKey: 'doctor_id', as: 'doctor' });
db.MedHistory.belongsTo(db.Appointment, { foreignKey: 'appointment_id', as: 'med_appointment' });


db.Patient.hasMany(db.Billing, {
  foreignKey: 'patient_id',
  as: 'bills'  // Changed from 'bill' to 'bills' to match controller
});

db.Billing.belongsTo(db.Patient, {
  foreignKey: 'patient_id',
  as: 'patient'
});

db.Appointment.hasOne(db.Billing, {
  foreignKey: 'appointment_id',
  as: 'bill'
});

db.Billing.belongsTo(db.Appointment, {
  foreignKey: 'appointment_id',
  as: 'appointment'
});

// Sync all models
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('Database synchronized successfully');
    
    // Create initial admin user if no users exist
    const userCount = await db.User.count();
    if (userCount === 0) {
      await db.User.create({
        name: 'Admin User',
        email: 'admin@clinic.com',
        password: 'Admin@123',
        role: 'Admin',
        status: 'active'
      });
      console.log('Initial admin user created');
    }
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

export { db, syncDatabase };