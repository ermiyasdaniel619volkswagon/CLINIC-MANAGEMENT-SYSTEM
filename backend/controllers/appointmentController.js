// import Appointment from "../models/appointmentModel.js";
// import Doctor from "../models/doctorModel.js";
// import Patient from "../models/patientModel.js";
import { Op } from "sequelize";
import { db } from "../models/index.js";

export const bookAppointment = async (req, res) => {
  try {
    const { doctor_id, appointment_date, appointment_time, patient_id } = req.body;

    // Validate required fields
    if (!doctor_id || !appointment_date || !appointment_time || !patient_id) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields: doctor_id, appointment_date, appointment_time, patient_id"
      });
    }

    // Check if the time slot is available
    const existingAppointment = await db.Appointment.findOne({
      where: { 
        doctor_id, 
        appointment_date, 
        appointment_time,
        status: { [Op.not]: 'Cancelled' }
      },
    });

    if (existingAppointment) {
      return res.status(400).json({
        status: "fail",
        message: "Doctor is already booked for this time slot."
      });
    }

    // Check if patient exists
    const patient = await db.Patient.findByPk(patient_id);
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found"
      });
    }

    // Check if doctor exists
    const doctor = await db.Doctor.findByPk(doctor_id);
    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found"
      });
    }

    const appointment = await db.Appointment.create(req.body);
    
    // Get the appointment with patient and doctor details
    const appointmentWithDetails = await db.Appointment.findByPk(appointment.id, {
      include: [
        {
          model: db.Doctor,
          as: 'doctor',
          attributes: ['id', 'full_name', 'specialization', 'phone']
        },
        {
          model: db.Patient,
          as: 'patient',
          attributes: ['id', 'full_name', 'phone', 'gender']
        }
      ]
    });

    res.status(201).json({ 
      status: "success", 
      message: "Appointment booked successfully",
      data: { appointment: appointmentWithDetails } 
    });
  } catch (error) {
    res.status(400).json({ 
      status: "fail", 
      message: error.message 
    });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const { doctor_id, patient_id, date, status } = req.query;
    const where = {};

    if (doctor_id) where.doctor_id = doctor_id;
    if (patient_id) where.patient_id = patient_id;
    if (date) where.appointment_date = date;
    if (status) where.status = status;

    const appointments = await db.Appointment.findAll({
      where,
      include: [
        {
          model: db.Doctor,
          as: 'doctor',
          attributes: ['id', 'full_name', 'specialization', 'phone']
        },
        {
          model: db.Patient,
          as: 'patient',
          attributes: ['id', 'full_name', 'phone', 'gender']
        }
      ],
      order: [['appointment_date', 'ASC'], ['appointment_time', 'ASC']]
    });

    res.status(200).json({ 
      status: "success", 
      results: appointments.length,
      data: { appointments } 
    });
  } catch (error) {
    res.status(500).json({ 
      status: "error", 
      message: error.message 
    });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const appointment = await db.Appointment.findByPk(id, {
      include: [
        {
          model: db.Doctor,
          as: 'doctor',
          attributes: ['id', 'full_name', 'specialization', 'phone', 'email']
        },
        {
          model: db.Patient,
          as: 'patient',
          attributes: ['id', 'full_name', 'phone', 'gender', 'date_of_birth']
        }
      ]
    });

    if (!appointment) {
      return res.status(404).json({
        status: "fail",
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: { appointment }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const appointment = await db.Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({
        status: "fail",
        message: "Appointment not found"
      });
    }

    // If doctor_id, date, or time is being changed, check for availability
    if (updateData.doctor_id || updateData.appointment_date || updateData.appointment_time) {
      const doctorId = updateData.doctor_id || appointment.doctor_id;
      const date = updateData.appointment_date || appointment.appointment_date;
      const time = updateData.appointment_time || appointment.appointment_time;

      const existingAppointment = await db.Appointment.findOne({
        where: {
          doctor_id: doctorId,
          appointment_date: date,
          appointment_time: time,
          status: { [Op.not]: 'Cancelled' },
          id: { [Op.not]: id } // Exclude current appointment
        }
      });

      if (existingAppointment) {
        return res.status(400).json({
          status: "fail",
          message: "Doctor is already booked for this time slot."
        });
      }
    }

    // If status is being updated to "Completed", create a bill automatically
    if (updateData.status === 'Completed' && appointment.status !== 'Completed') {
      // Bill creation logic would go here
      // You might want to call your billing service
    }

    await appointment.update(updateData);

    // Get updated appointment with details
    const updatedAppointment = await db.Appointment.findByPk(id, {
      include: [
        {
          model: db.Doctor,
          as: 'doctor',
          attributes: ['id', 'full_name', 'specialization', 'phone']
        },
        {
          model: db.Patient,
          as: 'patient',
          attributes: ['id', 'full_name', 'phone', 'gender']
        }
      ]
    });

    res.status(200).json({
      status: "success",
      message: "Appointment updated successfully",
      data: { appointment: updatedAppointment }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const appointment = await db.Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({
        status: "fail",
        message: "Appointment not found"
      });
    }

    // Check if appointment is already completed or cancelled
    if (appointment.status === 'Completed') {
      return res.status(400).json({
        status: "fail",
        message: "Cannot cancel a completed appointment"
      });
    }

    if (appointment.status === 'Cancelled') {
      return res.status(400).json({
        status: "fail",
        message: "Appointment is already cancelled"
      });
    }

    await appointment.update({ status: 'Cancelled' });

    res.status(200).json({
      status: "success",
      message: "Appointment cancelled successfully"
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    });
  }
};

// Get appointments by patient ID
export const getAppointmentsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    
    const appointments = await db.Appointment.findAll({
      where: { patient_id: patientId },
      include: [
        {
          model: db.Doctor,
          as: 'doctor',
          attributes: ['id', 'full_name', 'specialization', 'phone']
        }
      ],
      order: [['appointment_date', 'DESC']]
    });

    res.status(200).json({
      status: "success",
      results: appointments.length,
      data: { appointments }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// Get appointments by doctor ID
export const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;
    
    const where = { doctor_id: doctorId };
    if (date) where.appointment_date = date;

    const appointments = await Appointment.findAll({
      where,
      include: [
        {
          model: Patient,
          as: 'patient',
          attributes: ['id', 'full_name', 'phone', 'gender']
        }
      ],
      order: [['appointment_date', 'ASC'], ['appointment_time', 'ASC']]
    });

    res.status(200).json({
      status: "success",
      results: appointments.length,
      data: { appointments }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};