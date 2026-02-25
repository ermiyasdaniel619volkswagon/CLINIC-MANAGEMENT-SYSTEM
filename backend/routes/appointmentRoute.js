import express from "express";
import {
  bookAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId
} from "../controllers/appointmentController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const appoRouter = express.Router();
appoRouter.use(protect);

appoRouter
  .route("/")
  .get(getAppointments)
  .post(restrictTo("Admin", "Receptionist"), bookAppointment);

appoRouter
  .route("/:id")
  .get(getAppointmentById)
  .put(restrictTo("Admin", "Receptionist"), updateAppointment);

appoRouter.patch("/:id/cancel", restrictTo("Admin", "Receptionist"), cancelAppointment);

appoRouter.get("/patient/:patientId", getAppointmentsByPatientId);
appoRouter.get("/doctor/:doctorId", getAppointmentsByDoctorId);

export default appoRouter;