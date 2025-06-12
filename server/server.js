import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./db.js";
import router from "./routes/mainRouter.js";
import bodyParser from "body-parser";
import ErrorHandler from "./exceptions/errorHandlung.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Für Formulardaten
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // Für Formulardaten
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "unsere.onrender.com" // Ersetze dies mit der URL deiner Frontend-App
        : (
          "http://localhost:8835"||
          "http://localhost:8836"), // Ersetze dies mit der URL deiner Frontend-App
    credentials: true, // Erlaube Cookies von der Frontend-App
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use("/api", router); //

// Testroute
app.get("/api/test", (req, res) => {
  res.json({ message: "🎉 API läuft!" });
});

app.use((err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({
      message: err.message,
      error: err.error ,
    });
  }
  return res
    .status(500)
    .json({errors:err});
});
// MongoDB verbinden und Server starten
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
  });
});
