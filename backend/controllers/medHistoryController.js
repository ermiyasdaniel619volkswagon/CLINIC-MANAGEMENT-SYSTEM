// import Appointment from "../models/appointmentModel.js";
// import Doctor from "../models/doctorModel.js";
// import MedHistory from "../models/med_historyModel.js";
// import Patient from "../models/patientModel.js";
import { json } from "sequelize";
import { db } from "../models/index.js";

export const createMedHistory = async (req, res) => {
  try {
    const history = await db.MedHistory.create(req.body);

    res.status(201).json({
      status: "success",
      data: { history },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getPatientHistory = async (req, res) => {
  try {
    // const { patientId } = req.query;
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({
        status: "fail",
        message: "patientId query parameter is required",
      });
    }
    
    const history = await db.MedHistory.findAll({
      where: { patient_id: patientId },
      include:[
        {
          model: db.Doctor,
          as: 'doctor'
        },{
          model: db.Patient,
          as: 'patient'
        },{
          model: db.Appointment,
          as: 'med_appointment'
        }
      ]
    });

    res.status(200).json({
      status: "success",
      results: history.length,
      data: { history },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
       
      message: error.message,

    });
  }
};