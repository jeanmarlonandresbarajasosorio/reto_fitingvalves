import express from "express";
import nodemailer from "nodemailer";
import multer from "multer";
import dotenv from "dotenv"; 

dotenv.config(); 
const router = express.Router();

const upload = multer({ limits: { fileSize: 5 * 1024 * 1024 } }); 

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/api/talentos", upload.single("hojaDeVida"), async (req, res) => {
  console.log("[DIAGNÓSTICO TALENTOS] ¡Petición POST recibida en /api/talentos!");
  console.log("Datos del postulante:", req.body);

  try {
    const { nombres, apellidos, celular, correo, profesion, experiencia, areaInteres, cargoAplica, autorizaDatos } = req.body;

    if (!nombres || !apellidos || !correo || !argCheckboxValido(autorizaDatos)) {
      return res.status(400).json({ 
        success: false,
        error: "Faltan datos obligatorios o debe autorizar el tratamiento de datos." 
      });
    }

    const archivoCv = req.file;
    const codigoTalento = `TAL-${Math.floor(100000 + Math.random() * 900000)}`;
    const correoDestinoVentas = process.env.EMAIL_VENTAS || "j6757984@gmail.com";

    const mailTalentoOptions = {
      from: `"Banco de Talentos Fitting Valves" <${process.env.EMAIL_USER}>`,
      to: correoDestinoVentas, 
      subject: `[NUEVA POSTULACIÓN] Banco de Talentos [Ref: ${codigoTalento}] - ${nombres} ${apellidos}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1b2533; padding: 30px; border: 1px solid #dcdcdc; border-radius: 10px; max-width: 600px; margin: auto; background-color: #f4f6f8;">
          <div style="background-color: #1b2533; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #ffc700; margin: 0; font-size: 22px; letter-spacing: 1px;">FITTING VALVES S.A.S</h1>
            <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 13px;">📋 Nueva Postulación - Banco de Talentos</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 25px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
            <p style="font-size: 15px; color: #333; margin-top: 0;">Se ha registrado un nuevo candidato interesado en hacer parte de la empresa:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold; width: 40%;">Código Ref:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0; color: #d4a017; font-weight: bold;">${codigoTalento}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Nombre Completo:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0;">${nombres} ${apellidos}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Celular:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0;">${celular || "No especificado"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Correo Electrónico:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0;"><a href="mailto:${correo}" style="color: #0066cc;">${correo}</a></td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Profesión:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0;">${profesion || "No especificada"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Campos de Experiencia:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0;">${experiencia || "No especificada"}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Área de Interés:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0;">${areaInteres || "No seleccionada"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Cargo al que Aplica:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0;">${cargoAplica || "General"}</td>
              </tr>
            </table>

            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${correo}?subject=Proceso%20Selección%20Fitting%20Valves%20-%20Ref:%20${codigoTalento}" style="background-color: #1b2533; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px; display: inline-block;">
                Contactar Candidato por Correo
              </a>
            </div>
          </div>
          <p style="font-size: 11px; color: #888; text-align: center; margin-top: 20px;">Sistema Automatizado de Talento Humano — Fitting Valves S.A.S</p>
        </div>
      `,
      attachments: archivoCv ? [
        {
          filename: archivoCv.originalname,
          content: archivoCv.buffer
        }
      ] : []
    };

    await transporter.sendMail(mailTalentoOptions);
    console.log(`[DIAGNÓSTICO TALENTOS] ¡Correo de postulación enviado con éxito! Ref: ${codigoTalento}`);

    return res.status(200).json({
      success: true,
      message: "Postulación enviada con éxito.",
      codigoTalento: codigoTalento
    });

  } catch (error) {
    console.error("[DIAGNÓSTICO TALENTOS] Error crítico:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || "Error interno al procesar la postulación." 
    });
  }
});

function argCheckboxValido(val) {
  return val === true || val === "true" || val === "on" || val === 1;
}

export default router;