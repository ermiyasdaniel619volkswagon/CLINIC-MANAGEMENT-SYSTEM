import express from 'express';
import { 
    createMedHistory, 
    getPatientHistory 
} from '../controllers/medHistoryController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const medHistoryRouter = express.Router();

medHistoryRouter.use(protect);

// medHistoryRouter.route('/')
medHistoryRouter.route('/:patientId')
  .get(getPatientHistory)
  .post(restrictTo('Doctor', 'Admin'), createMedHistory);

export default medHistoryRouter;