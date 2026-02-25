import express from "express";
import { addDoctor, getAllDoctors } from "../controllers/doctorController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const doctorRouter = express.Router();
doctorRouter.use(protect);

doctorRouter.route("/")
            .get(getAllDoctors)
            .post(restrictTo("Admin"), addDoctor)
            

export default doctorRouter;
