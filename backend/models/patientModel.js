import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Patient = sequelize.define(
  "Patient",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    woreda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kebele: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergency_contact_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergency_contact_phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ["phone"],
        unique: true,
      },
    ],
  }
);

// Don't define associations here to avoid circular dependencies
// Define them in models/index.js

export default Patient;