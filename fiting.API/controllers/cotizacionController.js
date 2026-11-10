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

router.post("/api/cotizar-express", async (req, res) => {
  console.log("[DIAGNÓSTICO] ¡Petición POST recibida en /api/cotizar-express!");
  console.log("Datos recibidos del frontend:", req.body);

  try {
    const { producto, modelo, cantidad, especificaciones, correoCliente } = req.body;

    if (!producto || !modelo || !correoCliente) {
      console.log("Faltan datos obligatorios en la petición.");
      return res.status(400).json({ 
        success: false,
        error: "Faltan datos obligatorios (producto, modelo o correo electrónico)." 
      });
    }

    const codigoReferencia = `COT-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const numeroWhatsApp = "573156338300";
    const mensajeWhatsApp = encodeURIComponent(`Hola, me comunico respecto a la cotización Express con referencia ${codigoReferencia} para el equipo ${producto} (${modelo}).`);
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;

    const correoDestinoVentas = process.env.EMAIL_VENTAS || "j6757984@gmail.com";

    const mailEmpresaOptions = {
      from: `"Cotizador Express Fitting Valves" <${process.env.EMAIL_USER}>`,
      to: correoDestinoVentas, 
      subject: `[COTIZACIÓN PENDIENTE] Nueva Solicitud [Ref: ${codigoReferencia}]`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1b2533; padding: 30px; border: 1px solid #dcdcdc; border-radius: 10px; max-width: 600px; margin: auto; background-color: #f4f6f8;">
          <div style="background-color: #1b2533; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #ffc700; margin: 0; font-size: 22px; letter-spacing: 1px;">FITTING VALVES S.A.S</h1>
            <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 13px;">⚠️ Cotización Pendiente por Gestionar</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 25px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
            <p style="font-size: 15px; color: #333; margin-top: 0;">Se ha registrado una nueva solicitud comercial pendiente de atención:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #e0e0e0; font-weight: bold; width: 38%;">Código Ref:</td>
                <td style="padding: 12px; border: 1px solid #e0e0e0; color: #d4a017; font-weight: bold;">${codigoReferencia}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e0e0e0; font-weight: bold;">Producto:</td>
                <td style="padding: 12px; border: 1px solid #e0e0e0;">${producto}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #e0e0e0; font-weight: bold;">Modelo:</td>
                <td style="padding: 12px; border: 1px solid #e0e0e0;">${modelo}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e0e0e0; font-weight: bold;">Cantidad:</td>
                <td style="padding: 12px; border: 1px solid #e0e0e0;">${cantidad || 1}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #e0e0e0; font-weight: bold;">Especificaciones:</td>
                <td style="padding: 12px; border: 1px solid #e0e0e0;">${especificaciones || "Ninguna especificada"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e0e0e0; font-weight: bold;">Correo Cliente:</td>
                <td style="padding: 12px; border: 1px solid #e0e0e0;"><a href="mailto:${correoCliente}" style="color: #0066cc; text-decoration: none; font-weight: bold;">${correoCliente}</a></td>
              </tr>
            </table>

            <div style="text-align: center; margin-top: 25px;">
              <a href="mailto:${correoCliente}?subject=Cotización%20Ref:%20${codigoReferencia}%20-%20Fitting%20Valves" style="background-color: #1b2533; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">
                Responder directamente al Cliente
              </a>
            </div>
          </div>

          <p style="font-size: 11px; color: #888; text-align: center; margin-top: 20px;">Sistema Automatizado de Gestión Industrial — Fitting Valves S.A.S</p>
        </div>
      `,
    };

    const mailClienteOptions = {
      from: `"Fitting Valves S.A.S" <${process.env.EMAIL_USER}>`,
      to: correoCliente, 
      subject: `Confirmación de Solicitud - Ref: ${codigoReferencia} | Fitting Valves`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1b2533; padding: 30px; border: 1px solid #dcdcdc; border-radius: 10px; max-width: 600px; margin: auto; background-color: #f4f6f8;">
          <div style="background-color: #1b2533; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #ffc700; margin: 0; font-size: 22px; letter-spacing: 1px;">FITTING VALVES S.A.S</h1>
            <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 13px;">Importadores Industriales</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 25px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
            <h2 style="color: #1b2533; font-size: 18px; margin-top: 0; border-bottom: 2px solid #ffc700; padding-bottom: 8px;">¡Hola! Gracias por cotizar con nosotros</h2>
            <p style="font-size: 14px; color: #555; line-height: 1.5;">Hemos recibido exitosamente tu solicitud de cotización express. Nuestro equipo técnico-comercial ya se encuentra procesando los detalles de tu requerimiento.</p>
            
            <div style="background-color: #fffde7; padding: 15px; border-left: 4px solid #ffc700; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; font-size: 13px; color: #666;">Tu Código de Referencia Único:</p>
              <p style="margin: 5px 0 0 0; font-size: 20px; color: #1b2533; font-weight: bold; letter-spacing: 1px;">${codigoReferencia}</p>
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 10px 0;">
              <p style="margin: 0; font-size: 13px; color: #444;"><strong>Equipo Solicitado:</strong> ${producto} (${modelo})</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #444;"><strong>Cantidad:</strong> ${cantidad || 1}</p>
            </div>

            <p style="font-size: 14px; color: #555; line-height: 1.5;">Un asesor especializado se pondrá en contacto contigo a la mayor brevedad posible.</p>

            <div style="text-align: center; margin: 25px 0 15px 0;">
              <p style="font-size: 13px; color: #666; margin-bottom: 10px;">¿Necesitas atención inmediata o soporte técnico urgente?</p>
              <a href="${enlaceWhatsApp}" style="background-color: #25d366; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">
                💬 Escríbenos por WhatsApp (315 633 8300)
              </a>
            </div>

            <p style="margin-top: 30px; font-size: 14px; color: #333; border-top: 1px solid #eee; padding-top: 15px;">
              Atentamente,<br>
              <strong>Departamento Comercial & Soporte Técnico</strong><br>
              <span style="color: #777; font-size: 12px;">Fitting Valves S.A.S</span>
            </p>
          </div>

          <p style="font-size: 11px; color: #888; text-align: center; margin-top: 20px;">Este es un mensaje automático, por favor no respondas directamente a este correo.</p>
        </div>
      `,
    };

    console.log("[DIAGNÓSTICO] Conectando con servidor SMTP de Gmail para enviar correos duales...");
    console.log(` -> Correo Interno (Ventas): ${correoDestinoVentas}`);
    console.log(` -> Correo Cliente: ${correoCliente}`);

    await Promise.all([
      transporter.sendMail(mailEmpresaOptions),
      transporter.sendMail(mailClienteOptions)
    ]);

    console.log(`[DIAGNÓSTICO] ¡CORREOS ENVIADOS EXITOSAMENTE! Ref: ${codigoReferencia}`);

    return res.status(200).json({
      success: true,
      message: "Cotización generada y correos enviados con éxito.",
      codigoReferencia: codigoReferencia
    });

  } catch (error) {
    console.error("[DIAGNÓSTICO] Error crítico al enviar correos con Nodemailer:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || "Error interno del servidor al procesar el envío de correos." 
    });
  }
});

export default router;