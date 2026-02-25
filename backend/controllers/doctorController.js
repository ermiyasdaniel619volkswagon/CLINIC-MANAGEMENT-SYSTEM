// import Doctor from '../models/doctorModel.js';
import { db } from "../models/index.js";

export const addDoctor = async (req, res) => {
    try {
        const doctor = await db.Doctor.create(req.body);
        res.status(201).json({ status: 'success', data: { doctor } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await db.Doctor.findAll();
        res.status(200).json({ status: 'success', data: { doctors } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};