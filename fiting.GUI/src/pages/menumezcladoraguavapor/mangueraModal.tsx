import { useState, useEffect } from "react";
import { X, Calculator, CheckCircle } from "lucide-react";
import "./mangueraModal.css";

interface MangueraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MangueraModal({ isOpen, onClose }: MangueraModalProps) {
  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: "center center",
    transform: "scale(1)",
  });

  const [modoCotizar, setModoCotizar] = useState(false);
  const [modeloSeleccionado, setModeloSeleccionado] = useState("SERIE HE");
  const [cantidad, setCantidad] = useState(1);
  const [especificaciones, setEspecificaciones] = useState("");
  const [correo, setCorreo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [exitoCotizacion, setExitoCotizacion] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      setModoCotizar(false);
      setExitoCotizacion(null);
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  const modelosManguera = [
    { nombre: "SERIE HE", enlace: "#serie-he" },
    { nombre: "STANDARD", enlace: "#standard" },
  ];

  const handleSubmitCotizacion = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const response = await fetch("http://localhost:5000/api/cotizar-express", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          producto: "MANGUERA - Strahman",
          modelo: modeloSeleccionado,
          cantidad,
          especificaciones,
          correoCliente: correo,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setExitoCotizacion(data.codigoReferencia);
      } else {
        alert(data.error || "Ocurrió un error");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor de cotizaciones.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="manguera-modal-overlay" onClick={onClose}>
      <div className="manguera-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón de cierre */}
        <button className="manguera-modal-close" onClick={onClose} aria-label="Cerrar modal">
          <X size={24} />
        </button>

        {!modoCotizar ? (
          <div className="manguera-modal-grid">
            <div
              className="manguera-zoom-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="/img/manguera.png"
                alt="Manguera Strahman"
                className="manguera-zoom-img"
                style={zoomStyle}
              />
            </div>

            <div className="manguera-info-container">
              <div className="manguera-brand-header">
                <img 
                  src="/img/strahman.png" 
                  alt="Strahman" 
                  className="manguera-logo-img" 
                />
              </div>

              <h2 className="manguera-title">MANGUERA</h2>
              
              <p className="manguera-desc">
                El conjunto de manguera premium de Strahman es una manguera de agua caliente envuelta de primera calidad de alta presión. Nuestra manguera envuelta de primera calidad está diseñada para proporcionar una flexibilidad y resistencia extremas, sin dejar de ser liviana.
              </p>
              
              <p className="manguera-desc">
                La manguera está cubierta con neopreno, lo que la hace resistente al ácido láctico y al aceite, y su construcción trenzada única resiste las torceduras, lo que la hace tan flexible como una cuerda y prácticamente indestructible.
              </p>

              <button 
                className="btn-cotizar-express"
                onClick={() => setModoCotizar(true)}
              >
                <Calculator size={18} /> COTIZAR ESTE EQUIPO AHORA
              </button>
            </div>

            <div className="manguera-sidebar">
              <ul className="manguera-models-list">
                {modelosManguera.map((modelo, index) => (
                  <li key={index}>
                    <a 
                      href={modelo.enlace} 
                      onClick={(e) => {
                        e.preventDefault();
                        setModeloSeleccionado(modelo.nombre);
                        setModoCotizar(true);
                      }}
                    >
                      <span className="arrow-icon">▶</span> {modelo.nombre}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="cotizar-express-container">
            <div className="cotizar-header">
              <Calculator size={26} color="#ffc700" />
              <h2>Cotización Express - Manguera Strahman</h2>
            </div>

            {exitoCotizacion ? (
              <div className="cotizar-exito">
                <CheckCircle size={50} color="#2e7d32" />
                <h3>¡Cotización Generada con Éxito!</h3>
                <p>Código de referencia: <strong>{exitoCotizacion}</strong></p>
                <p>Hemos enviado los detalles a tu correo. Un asesor comercial se comunicará contigo de inmediato.</p>
                <button className="btn-volver" onClick={() => { setModoCotizar(false); setExitoCotizacion(null); }}>
                  Volver al producto
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitCotizacion} className="cotizar-form-express">
                <div className="form-group">
                  <label>Modelo Seleccionado:</label>
                  <select 
                    value={modeloSeleccionado} 
                    onChange={(e) => setModeloSeleccionado(e.target.value)}
                  >
                    {modelosManguera.map((m, idx) => (
                      <option key={idx} value={m.nombre}>{m.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Cantidad requerida:</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={cantidad} 
                    onChange={(e) => setCantidad(Number(e.target.value))} 
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Especificaciones técnicas (Opcional):</label>
                  <textarea 
                    placeholder="Longitud en metros, diámetro, presión máxima..."
                    value={especificaciones}
                    onChange={(e) => setEspecificaciones(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Tu Correo Electrónico:</label>
                  <input 
                    type="email" 
                    placeholder="ventas@tuempresa.com" 
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <div className="cotizar-buttons">
                  <button type="button" className="btn-cancelar" onClick={() => setModoCotizar(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-enviar" disabled={enviando}>
                    {enviando ? "Generando..." : "Enviar Cotización"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MangueraModal;