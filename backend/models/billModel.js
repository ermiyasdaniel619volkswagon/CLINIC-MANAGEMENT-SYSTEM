import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Billing = sequelize.define(
  "Billing",
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
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Appointments",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    payment_status: {
      type: DataTypes.ENUM("Paid", "Unpaid"),
      allowNull: false,
      defaultValue: "Unpaid",
    },
    payment_method: {
      type: DataTypes.ENUM("Cash", "Chapa"),
      allowNull: false,
    },
    bill_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ["patient_id"],
      },
      {
        fields: ["payment_status"],
      },
      {
        fields: ["bill_date"],
      },
    ],
  }
);

// Define associations (don't define them here, define them in models/index.js)
// This prevents circular dependencies

export default Billing;