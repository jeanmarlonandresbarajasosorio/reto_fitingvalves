import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import "./ContactoPage.css";

export function ContactoPage() {
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [autorizaDatos, setAutorizaDatos] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!autorizaDatos) {
      alert("Debes autorizar el tratamiento de datos personales.");
      return;
    }

    setEnviando(true);

    try {
      const response = await fetch("http://localhost:5000/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          empresa,
          correo,
          telefono,
          ciudad,
          pais,
          mensaje,
          autorizaDatos,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setExito(data.codigoContacto);
      } else {
        alert(data.error || "Ocurrió un error al enviar el mensaje.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="contacto-page-container">
      <div className="contacto-content-wrapper">
        <div className="contacto-form-section">
          <div className="contacto-header-title">
            <span className="title-bar-yellow"></span>
            <h2>Contáctanos</h2>
          </div>

          {exito ? (
            <div className="contacto-exito">
              <h3>¡Mensaje Enviado con Éxito!</h3>
              <p>Código de referencia: <strong>{exito}</strong></p>
              <p>Hemos recibido tu solicitud de contacto. Nos comunicaremos contigo a la brevedad posible.</p>
              <button 
                className="btn-reiniciar" 
                onClick={() => {
                  setExito(null);
                  setNombre("");
                  setEmpresa("");
                  setCorreo("");
                  setTelefono("");
                  setCiudad("");
                  setPais("");
                  setMensaje("");
                  setAutorizaDatos(false);
                }}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contacto-form">
              <input 
                type="text" 
                placeholder="nombre" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                required 
              />
              
              <input 
                type="text" 
                placeholder="Empresa" 
                value={empresa} 
                onChange={(e) => setEmpresa(e.target.value)} 
              />
              
              <input 
                type="email" 
                placeholder="Correo" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                required 
              />
              
              <input 
                type="tel" 
                placeholder="Telefono" 
                value={telefono} 
                onChange={(e) => setTelefono(e.target.value)} 
              />
              
              <input 
                type="text" 
                placeholder="Ciudad" 
                value={ciudad} 
                onChange={(e) => setCiudad(e.target.value)} 
              />
              
              <input 
                type="text" 
                placeholder="Pais" 
                value={pais} 
                onChange={(e) => setPais(e.target.value)} 
              />
              
              <textarea 
                placeholder="Escribe tu mensaje aquí..."
                rows={6}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />

              <div className="contacto-aviso-privacidad">
                Consulte aquí <strong>Política de Privacidad.</strong>
              </div>

              <div className="checkbox-group-contacto">
                <input 
                  type="checkbox" 
                  id="autoriza" 
                  checked={autorizaDatos} 
                  onChange={(e) => setAutorizaDatos(e.target.checked)} 
                  required
                />
                <label htmlFor="autoriza">
                  Autorizo el tratamiento de mis datos personales por parte de fittingvalves, de acuerdo a la Política de Privacidad.
                </label>
              </div>

              <button type="submit" className="btn-enviar-contacto" disabled={enviando}>
                {enviando ? "ENVIANDO..." : "ENVIAR"}
              </button>
            </form>
          )}
        </div>
        <div className="contacto-info-sidebar">
          <h3>Información de contacto</h3>
          <div className="contacto-info-item">
            <span className="icon-wrapper"><MapPin size={20} color="#ffc700" /></span>
            <p>Kilómetro 6 Via Bucaramanga-Girón Bodega 1</p>
          </div>
          <div className="contacto-info-item">
            <span className="icon-wrapper"><Phone size={20} color="#ffc700" /></span>
            <p>PBX (7) 7000350</p>
          </div>
          <div className="contacto-info-item">
            <span className="icon-wrapper"><Mail size={20} color="#ffc700" /></span>
            <p>ventas@fittingvalves.com</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ContactoPage;