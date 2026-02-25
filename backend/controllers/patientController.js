import Patient from '../models/patientModel.js';
import { db } from '../models/index.js'; // Import from index

// Register New Patient
export const registerPatient = async (req, res) => {
  try {
    const patient = await db.Patient.create(req.body);
    res.status(201).json({ status: 'success', data: { patient } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// View All Patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await db.Patient.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ 
      status: 'success', 
      results: patients.length, 
      data: { patients } 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Patient by ID
export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const patient = await db.Patient.findByPk(id, {
      include: [
        {
          model: db.Appointment,
          as: 'appointments',
          attributes: ['id', 'appointment_date', 'appointment_time', 'status']
        },
        {
          model: db.Billing,
          as: 'bills',  // This now matches the association alias
          attributes: ['id', 'amount', 'payment_status', 'bill_date']
        }
      ]
    });

    if (!patient) {
      return res.status(404).json({ 
        status: 'fail', 
        message: 'Patient not found' 
      });
    }

    res.status(200).json({ 
      status: 'success', 
      data: { patient } 
    });
  } catch (error) {
    console.error('Get patient by ID error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};

// Update Patient
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    
    const patient = await db.Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ 
        status: 'fail', 
        message: 'Patient not found' 
      });
    }

    // Check if phone number is being updated and if it already exists
    if (req.body.phone && req.body.phone !== patient.phone) {
      const existingPatient = await db.Patient.findOne({ 
        where: { phone: req.body.phone } 
      });
      if (existingPatient) {
        return res.status(409).json({
          status: 'fail',
          message: 'Phone number already exists'
        });
      }
    }

    await patient.update(req.body);

    res.status(200).json({ 
      status: 'success', 
      message: 'Patient updated successfully',
      data: { patient } 
    });
  } catch (error) {
    res.status(400).json({ 
      status: 'fail', 
      message: error.message 
    });
  }
};

// Delete Patient
// export const deletePatient = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const patient = await db.Patient.findByPk(id);

//     if (!patient) {
//       return res.status(404).json({ 
//         status: 'fail', 
//         message: 'Patient not found' 
//       });
//     }

//     // Check if patient has any appointments
//     const appointments = await db.Appointment.findAll({
//       where: { patient_id: id }
//     });

//     if (appointments.length > 0) {
//       return res.status(400).json({
//         status: 'fail',
//         message: 'Cannot delete patient with existing appointments. Please cancel all appointments first.'
//       });
//     }

//     // Check if patient has any unpaid bills
//     const unpaidBills = await db.Billing.findAll({
//       where: { 
//         patient_id: id,
//         payment_status: 'Unpaid'
//       }
//     });

//     if (unpaidBills.length > 0) {
//       return res.status(400).json({
//         status: 'fail',
//         message: 'Cannot delete patient with unpaid bills. Please settle all bills first.'
//       });
//     }

//     // Delete associated bills first
//     await db.Billing.destroy({
//       where: { patient_id: id }
//     });

//     // Delete the patient
//     await patient.destroy();

//     res.status(200).json({ 
//       status: 'success', 
//       message: 'Patient deleted successfully' 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       status: 'error', 
//       message: error.message 
//     });
//   }
// };

// Search Patients
export const searchPatients = async (req, res) => {
  try {
    const { search } = req.query;
    
    if (!search || search.trim() === '') {
      return res.status(400).json({
        status: 'fail',
        message: 'Search query is required'
      });
    }

    const { Op } = require('sequelize');
    
    const patients = await db.Patient.findAll({
      where: {
        [Op.or]: [
          { full_name: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } }
        ]
      },
      order: [['full_name', 'ASC']]
    });

    res.status(200).json({
      status: 'success',
      results: patients.length,
      data: { patients }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};