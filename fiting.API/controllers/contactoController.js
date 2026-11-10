import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv"; 

dotenv.config(); 
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/api/contacto", async (req, res) => {
  console.log("[DIAGNÓSTICO CONTACTO] ¡Petición POST recibida en /api/contacto!");
  console.log("Datos de contacto recibidos:", req.body);

  try {
    const { nombre, empresa, correo, telefono, ciudad, pais, mensaje, autorizaDatos } = req.body;

    if (!nombre || !correo || !argCheckboxValido(autorizaDatos)) {
      return res.status(400).json({ 
        success: false,
        error: "Faltan datos obligatorios (nombre, correo) o debe autorizar el tratamiento de datos." 
      });
    }

    const codigoContacto = `CON-${Math.floor(100000 + Math.random() * 900000)}`;
    const correoDestinoVentas = process.env.EMAIL_VENTAS || "j6757984@gmail.com";

    const mailContactoOptions = {
      from: `"Formulario de Contacto Fitting Valves" <${process.env.EMAIL_USER}>`,
      to: correoDestinoVentas, 
      subject: `[NUEVO MENSAJE DE CONTACTO] Ref: ${codigoContacto} - ${nombre}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1b2533; padding: 30px; border: 1px solid #dcdcdc; border-radius: 10px; max-width: 600px; margin: auto; background-color: #f4f6f8;">
          <div style="background-color: #1b2533; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #ffc700; margin: 0; font-size: 22px; letter-spacing: 1px;">FITTING VALVES S.A.S</h1>
            <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 13px;">📩 Nueva Solicitud de Contacto Web</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 25px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
            <p style="font-size: 15px; color: #333; margin-top: 0;">Se ha recibido un mensaje desde el formulario de contacto:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold; width: 35%;">Código Ref:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0; color: #d4a017; font-weight: bold;">${codigoContacto}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Nombre:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0;">${nombre}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Empresa:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0;">${empresa || "No especificada"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Correo:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0;"><a href="mailto:${correo}" style="color: #0066cc;">${correo}</a></td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Teléfono:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0;">${telefono || "No especificado"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Ciudad / País:</td>
                <td style="padding: 10px; border: 1px solid #e0e0e0;">${ciudad || "N/A"} / ${pais || "N/A"}</td>
              </tr>
            </table>

            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ffc700; margin-bottom: 20px; border-radius: 4px;">
              <p style="margin: 0 0 5px 0; font-weight: bold; font-size: 13px; color: #555;">Mensaje:</p>
              <p style="margin: 0; font-size: 14px; color: #333; line-height: 1.5;">${mensaje || "Sin mensaje detallado"}</p>
            </div>

            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${correo}?subject=Respuesta%20Solicitud%20Contacto%20Ref:%20${codigoContacto}" style="background-color: #1b2533; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px; display: inline-block;">
                 Responder al Cliente
              </a>
            </div>
          </div>
          <p style="font-size: 11px; color: #888; text-align: center; margin-top: 20px;">Sistema Automatizado de Contacto — Fitting Valves S.A.S</p>
        </div>
      `,
    };

    await transporter.sendMail(mailContactoOptions);
    console.log(`[DIAGNÓSTICO CONTACTO] ¡Correo enviado con éxito! Ref: ${codigoContacto}`);

    return res.status(200).json({
      success: true,
      message: "Mensaje de contacto enviado con éxito.",
      codigoContacto: codigoContacto
    });

  } catch (error) {
    console.error("[DIAGNÓSTICO CONTACTO] Error crítico:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || "Error interno al procesar el mensaje." 
    });
  }
});

function argCheckboxValido(val) {
  return val === true || val === "true" || val === "on" || val === 1;
}

export default router;