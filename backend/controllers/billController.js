// import Appointment from "../models/appointmentModel.js";
// import Billing from "../models/billModel.js";
// import Patient from "../models/patientModel.js";
import { db } from "../models/index.js";

export const generateBill = async (req, res) => {
  try {
    const {
      patient_id,
      appointment_id,
      amount,
      payment_method,
      payment_status,
    } = req.body;

    // Validate required fields
    if (!patient_id || !appointment_id || !amount || !payment_method) {
      return res.status(400).json({
        status: "fail",
        message:
          "Missing required fields: patient_id, appointment_id, amount, payment_method",
      });
    }

    const bill = await db.Billing.create({
      patient_id,
      appointment_id,
      amount,
      payment_method,
      payment_status: payment_status || "Unpaid", // Default to "Unpaid" if not provided
      bill_date: new Date(),
    });

    res.status(201).json({
      status: "success",
      data: { bill },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_status } = req.body; // Get payment_status from request body

    if (!payment_status || !["Paid", "Unpaid"].includes(payment_status)) {
      return res.status(400).json({
        message: "Valid payment_status ('Paid' or 'Unpaid') is required",
      });
    }

    const bill = await db.Billing.findByPk(id);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    await bill.update({ payment_status });

    res.status(200).json({
      status: "success",
      message: `Payment status updated to ${payment_status}`,
      data: { bill },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllBills = async (req, res) => {
  try {
    const bills = await db.Billing.findAll({
      include: [
        {
          model: db.Patient,
          as: "patient",
        },
        {
          model: db.Appointment,
          as: "appointment",
        },
      ],
      order: [["createdAt", "DESC"]], // Sort by latest first
    });

    res.status(200).json({
      status: "success",
      results: bills.length,
      data: { bills },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bill by ID
export const getBillById = async (req, res) => {
  try {
    const { id } = req.params;

    const bill = await db.Billing.findByPk(id, {
      include: [
        {
          model: db.Patient,
          as: "patient",
        },
        {
          model: db.Appointment,
          as: "appointment",
        },
      ],
    });

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json({
      status: "success",
      data: { bill },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bills by patient ID
export const getBillsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const bills = await Billing.findAll({
      where: { patient_id: patientId },
      include: [
        {
          model: Patient,
          as: "patient",
        },
        {
          model: Appointment,
          as: "appointment",
        },
      ],
      order: [["bill_date", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      results: bills.length,
      data: { bills },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
