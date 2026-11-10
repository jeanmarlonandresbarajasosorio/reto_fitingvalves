import React, { useState } from "react";
import "./BancodeTalentosPage.css";

export function BancodeTalentosPage() {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [profesion, setProfesion] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [areaInteres, setAreaInteres] = useState("");
  const [cargoAplica, setCargoAplica] = useState("");
  const [hojaDeVida, setHojaDeVida] = useState<File | null>(null);
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

    const formData = new FormData();
    formData.append("nombres", nombres);
    formData.append("apellidos", apellidos);
    formData.append("celular", celular);
    formData.append("correo", correo);
    formData.append("profesion", profesion);
    formData.append("experiencia", experiencia);
    formData.append("areaInteres", areaInteres);
    formData.append("cargoAplica", cargoAplica);
    if (hojaDeVida) {
      formData.append("hojaDeVida", hojaDeVida);
    }
    formData.append("autorizaDatos", String(autorizaDatos));

    try {
      const response = await fetch("http://localhost:5000/api/talentos", {
        method: "POST",
        body: formData, 
      });

      const data = await response.json();
      if (response.ok) {
        setExito(data.codigoTalento);
      } else {
        alert(data.error || "Ocurrió un error al enviar la postulación.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="talentos-page-container">
      <div className="talentos-card">
        <h1 className="talentos-title">Banco de talentos fittingvalves</h1>
        <p className="talentos-subtitle">
          A través del siguiente formulario podrá inscribirse, adjuntar su hoja de vida y hacer parte de nuestro banco de talentos de fittingvalves
        </p>

        {exito ? (
          <div className="talentos-exito">
            <h3>¡Postulación Enviada con Éxito!</h3>
            <p>Tu código de referencia es: <strong>{exito}</strong></p>
            <p>Hemos recibido tus datos y hoja de vida correctamente. Nos pondremos en contacto contigo.</p>
            <button 
              className="btn-reiniciar" 
              onClick={() => { 
                setExito(null); 
                setNombres(""); 
                setApellidos(""); 
                setCelular(""); 
                setCorreo(""); 
                setProfesion(""); 
                setExperiencia(""); 
                setAreaInteres(""); 
                setCargoAplica(""); 
                setHojaDeVida(null); 
                setAutorizaDatos(false); 
              }}
            >
              Enviar otra postulación
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="talentos-form">
            <input 
              type="text" 
              placeholder="Nombres" 
              value={nombres} 
              onChange={(e) => setNombres(e.target.value)} 
              required 
            />

            <input 
              type="text" 
              placeholder="Apellidos" 
              value={apellidos} 
              onChange={(e) => setApellidos(e.target.value)} 
              required 
            />

            <input 
              type="tel" 
              placeholder="Celular" 
              value={celular} 
              onChange={(e) => setCelular(e.target.value)} 
            />

            <input 
              type="email" 
              placeholder="Correo" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} 
              required 
            />

            <input 
              type="text" 
              placeholder="Profesión" 
              value={profesion} 
              onChange={(e) => setProfesion(e.target.value)} 
            />

            <input 
              type="text" 
              placeholder="En que campos tiene experiencia" 
              value={experiencia} 
              onChange={(e) => setExperiencia(e.target.value)} 
            />

            <select 
              value={areaInteres} 
              onChange={(e) => setAreaInteres(e.target.value)}
              required
            >
              <option value="" disabled>—Please choose an option—</option>
              <option value="Comercial y Ventas">Comercial y Ventas</option>
              <option value="Ingeniería y Soporte Técnico">Ingeniería y Soporte Técnico</option>
              <option value="Administrativo y Financiero">Administrativo y Financiero</option>
              <option value="Logística y Operaciones">Logística y Operaciones</option>
            </select>

            <input 
              type="text" 
              placeholder="Cargo al que aplica" 
              value={cargoAplica} 
              onChange={(e) => setCargoAplica(e.target.value)} 
            />

            <div className="file-input-wrapper">
              <input 
                type="file" 
                id="file-upload"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setHojaDeVida(e.target.files ? e.target.files[0] : null)} 
                required
              />
              <span className="file-name-display">
                {hojaDeVida ? hojaDeVida.name : "SIN ARCHIVO...ECCIONADOS"}
              </span>
            </div>

            <div className="checkbox-group">
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

            <button type="submit" className="btn-enviar-talento" disabled={enviando}>
              {enviando ? "ENVIANDO..." : "ENVIAR"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default BancodeTalentosPage;