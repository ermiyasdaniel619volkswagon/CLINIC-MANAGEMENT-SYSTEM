import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Appointment = sequelize.define(
  "Appointment",
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
    appointment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointment_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Scheduled", "Completed", "Cancelled"),
      allowNull: false,
      defaultValue: "Scheduled",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ["doctor_id", "appointment_date", "appointment_time"],
        unique: true,
        name: "unique_doctor_timeslot",
      },
      {
        fields: ["patient_id"],
      },
      {
        fields: ["doctor_id"],
      },
      {
        fields: ["status"],
      },
    ],
  }
);

// Don't define associations here to avoid circular dependencies
// Define them in models/index.js

export default Appointment;