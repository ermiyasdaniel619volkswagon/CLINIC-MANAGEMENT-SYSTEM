// import express from "express";
// import seedDatabase from "./seed/seed-database.js";
import bodyParser from "body-parser";
// import "dotenv/config";

// import patientRouter from "./routes/patientRoute.js";
// import doctorRouter from "./routes/doctorRoute.js";
// import userRouter from "./routes/userRoute.js";
// import appoRouter from "./routes/appointmentRoute.js";
// import medHistoryRouter from "./routes/medHistoryRoute.js";
// import billRouter from "./routes/billRoute.js";

// // App Config
// const app = express();
// const port = process.env.PORT || 4000;

// seedDatabase()
//   .then(() => {
//     console.log("\n Database ready");
//   })
//   .catch((err) => {
//     console.error("Failed to seed database:", err);
//   });

// app.use(bodyParser.json());

// // API endpoints
// app.use("/user", userRouter);
// app.use("/patient", patientRouter);
// app.use("/doctor", doctorRouter);
// app.use("/appointment", appoRouter);
// app.use('/med-history', medHistoryRouter);
// app.use('/billing', billRouter);

// app.get("/", (req, res) => {
//   res.send("API is working!");
// });

// app.listen(port, () => {
//   console.log(`Server running on port: http://localhost:${port}`);
// });

// server.js or app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { syncDatabase } from './models/index.js';
import userRouter from './routes/userRoute.js';
import patientRouter from './routes/patientRoute.js';
import appointmentRouter from './routes/appointmentRoute.js';
import billRouter from './routes/billRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import medHistoryRouter from "./routes/medHistoryRoute.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
// app.use(express.json());
app.use(bodyParser.json());


// Routes
app.use('/api/users', userRouter);
app.use('/api/patients', patientRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/bills', billRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/med-historys', medHistoryRouter);


// Database sync and server start
syncDatabase(false).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});