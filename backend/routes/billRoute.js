// import express from "express";
// import {
//   generateBill,
//   getAllBills,
//   updatePaymentStatus,
// } from "../controllers/billController.js";
// import { protect, restrictTo } from "../middleware/authMiddleware.js";

// const billRouter = express.Router();

// billRouter.use(protect);

// billRouter
//   .route("/")
//   .get(restrictTo("Admin", "Receptionist"), getAllBills)
//   .post(restrictTo("Receptionist", "Admin"), generateBill);

// billRouter
//   .route("/:id")
//   .patch(restrictTo("Receptionist", "Admin"), updatePaymentStatus);

// export default billRouter;

// billRoute.js
import express from "express";
import {
  generateBill,
  getAllBills,
  updatePaymentStatus,
  getBillById,
  getBillsByPatientId
} from "../controllers/billController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const billRouter = express.Router();

billRouter.use(protect);

billRouter
  .route("/")
  .get(restrictTo("Admin", "Receptionist"), getAllBills)
  .post(restrictTo("Receptionist", "Admin"), generateBill);

billRouter
  .route("/:id")
  .get(restrictTo("Admin", "Receptionist"), getBillById)
  .patch(restrictTo("Receptionist", "Admin"), updatePaymentStatus);

billRouter
  .route("/patient/:patientId")
  .get(restrictTo("Admin", "Receptionist"), getBillsByPatientId);

export default billRouter;
