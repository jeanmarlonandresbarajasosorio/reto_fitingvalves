import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import cotizacionRoutes from "./controllers/cotizacionController.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API Fitting Valves funcionando correctamente",
        version: "1.0.0"
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Servidor activo"
    });
});

app.use("/", cotizacionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("------------------------------------");
    console.log(" FITTING VALVES API");
    console.log("------------------------------------");
    console.log(`Servidor: http://localhost:${PORT}`);
    console.log("Estado: Activo");
});