import DataTypes from "sequelize";
import sequelize from "../config/database.js";

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false
  },
   phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique:true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
   availability: {
    type: DataTypes.TEXT, 
    allowNull: true,
  },
},
{
  timestamps: true,
  indexes: [
    {
      fields: ['phone'],
      unique: true
    },
    {
      fields: ['email'],
      unique: true
    }
  ]
})
export default Doctor;