import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Doctor from "./doctorModel.js";
import Patient from "./patientModel.js";
import Appointment from "./appointmentModel.js";

const MedHistory = sequelize.define(
  "Med_history",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Patients",
        key: "id",
      },
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Doctors",
        key: "id",
      },
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Appointments",
        key: "id",
      },
    },
    diagnosis_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);
// Define association
// MedHistory.belongsTo(Doctor, { foreignKey: "doctor_id", as: "doctor" });
// Doctor.hasMany(MedHistory, { foreignKey: "doctor_id", as: "med_history" });

// MedHistory.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });
// Patient.hasMany(MedHistory, {
//   foreignKey: "patient_id",
//   as: "patient_history",
// });

// MedHistory.belongsTo(Appointment, {
//   foreignKey: "appointment_id",
//   as: "appointment",
// });
// Appointment.hasOne(MedHistory, {
//   foreignKey: "appointment_id",
//   as: "med_history",
// });

// ////////////////////////////////////////////////

// MedHistory.belongsTo(Appointment, {
//   foreignKey: "appointment_id",
//   as: "med_appointment",
// });
// Appointment.hasOne(MedHistory, {
//   foreignKey: "appointment_id",
//   as: "med_appointment",
// });
export default MedHistory;
