import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./db.js";
import tripRoutes from "./routes/trips.js"
import userRouter from "./routes/user.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:8835", // Ersetze dies mit der URL deiner Frontend-App
    credentials: true, // Erlaube Cookies von der Frontend-App
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Für Formulardaten
app.use(cookieParser());

app.use("/api",userRouter); // 
// ✅ Route-Registrierung NACH den Middlewares
app.use("/api/trips", tripRoutes); // 👈 hier registrierst du die Trips-Routen

// Testroute
app.get("/api/test", (req, res) => {
  res.json({ message: "🎉 API läuft!" });
});

// MongoDB verbinden und Server starten
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
  });
});
