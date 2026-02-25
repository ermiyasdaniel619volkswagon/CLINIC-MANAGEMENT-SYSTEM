import sequelize from "../config/database.js";
import Patient from "../models/patientModel.js";
import Doctor from "../models/doctorModel.js";
import User from "../models/userModel.js";
import Appointment from "../models/appointmentModel.js";
import MedHistory from "../models/med_historyModel.js";
import Billing from "../models/billModel.js";

async function seedDatabase() {
  try {
    // 1. Disable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    console.log("Foreign key checks disabled");

    // 2. Sync all models 
    await sequelize.sync({ force: true });
    console.log("Database synchronized");

    // 3. Re-enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log("Foreign key checks re-enabled");

    // Create multiple patients
    const patients = await Patient.bulkCreate([
      {
        full_name: "Abebe Alemu",
        gender: "Male",
        date_of_birth: new Date(2007, 2, 23),
        phone: "0911223344",
        nationality: "Ethiopian",
        region: "Addis Ababa",
        woreda: "Lideta",
        kebele: "02",
        emergency_contact_name: "Alem",
        emergency_contact_phone: "0922113344",
      },
      {
        full_name: "Marta Tesfaye",
        gender: "Female",
        date_of_birth: new Date(1995, 5, 15),
        phone: "0911334455",
        nationality: "Ethiopian",
        region: "Addis Ababa",
        woreda: "Bole",
        kebele: "04",
        emergency_contact_name: "Tesfaye",
        emergency_contact_phone: "0922334455",
      },
    ]);

    // Create multiple doctors
    const doctors = await Doctor.bulkCreate([
      {
        full_name: "Dr. Samuel Daniel",
        specialization: "Dentist",
        phone: "0911223311",
        email: "samuel.j@clinic.com",
        availability: "Mon-Fri: 9AM-5PM",
      },
      {
        full_name: "Dr. Helen Kassa",
        specialization: "Cardiologist",
        phone: "0911445566",
        email: "helen.s@clinic.com",
        availability: "Mon-Wed: 10AM-4PM",
      },
    ]);

    // Create users with different roles
    const users = await User.bulkCreate([
      {
        name: "System Admin",
        email: "admin@clinic.com",
        password: "Admin@123",
        role: "Admin",
        status: "Active",
      },
      {
        name: "Dr. Samuel",
        email: "doctor.samuel@clinic.com",
        password: "Doctor@123",
        role: "Doctor",
        status: "Active",
      },
      {
        name: "Receptionist User",
        email: "reception@clinic.com",
        password: "Reception@123",
        role: "Receptionist",
        status: "Active",
      },
    ],{ individualHooks: true });

    // Create appointments
    const appointments = await Appointment.bulkCreate([
      {
        patient_id: patients[0].id,
        doctor_id: doctors[0].id,
        appointment_date: new Date("2026-01-25"),
        appointment_time: "06:30:00",
        status: "Completed",
        description: "Regular dental checkup",
      },
      {
        patient_id: patients[1].id,
        doctor_id: doctors[1].id,
        appointment_date: new Date("2026-01-26"),
        appointment_time: "10:00:00",
        status: "Scheduled",
        description: "Heart consultation",
      },
    ]);

    // Create medical histories
    const medicalHistories = await MedHistory.bulkCreate([
      {
        patient_id: patients[0].id,
        doctor_id: doctors[0].id,
        appointment_id: appointments[0].id,
        diagnosis_date: new Date(),
        description:
          "Mild tooth sensitivity detected. Recommended sensitive toothpaste. Follow-up in 3 months.",
      },
      {
        patient_id: patients[1].id,
        doctor_id: doctors[1].id,
        appointment_id: appointments[1].id,
        diagnosis_date: new Date(),
        description:
          "Initial consultation. Blood pressure slightly elevated. Recommended lifestyle changes.",
      },
    ]);

    // Create billing records
    const bills = await Billing.bulkCreate([
      {
        patient_id: patients[0].id,
        appointment_id: appointments[0].id,
        amount: 1500.0,
        payment_status: "Paid",
        payment_method: "Chapa",
        bill_date: new Date(),
      },
      {
        patient_id: patients[1].id,
        appointment_id: appointments[1].id,
        amount: 2500.0,
        payment_status: "Unpaid",
        payment_method: "Cash",
        bill_date: new Date(),
      },
    ]);

    console.log("Database seeded successfully!");
    console.log(`Patients: ${patients.length}`);
    console.log(`Doctors: ${doctors.length}`);
    console.log(`Users: ${users.length}`);
    console.log(`Appointments: ${appointments.length}`);
    console.log(`Medical Histories: ${medicalHistories.length}`);
    console.log(`Bills: ${bills.length}`);

    return {
      patients,
      doctors,
      users,
      appointments,
      medicalHistories,
      bills,
    };
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

export default seedDatabase;

