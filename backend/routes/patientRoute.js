import express from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import {
  registerPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  searchPatients
} from "../controllers/patientController.js";

const patientRouter = express.Router();

patientRouter.use(protect);

patientRouter
  .route("/")
  .get(getAllPatients)
  .post(restrictTo("Admin", "Receptionist"), registerPatient);

patientRouter.get("/search", searchPatients);

patientRouter
  .route("/:id")
  .get(getPatientById)
  .put(restrictTo("Admin", "Receptionist"), updatePatient)
  // .delete(restrictTo("Admin"), deletePatient);

export default patientRouter;