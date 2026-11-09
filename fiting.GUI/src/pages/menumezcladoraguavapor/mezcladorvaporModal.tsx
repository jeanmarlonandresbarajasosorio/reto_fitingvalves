import { useState, useEffect } from "react";
import { X, Calculator, CheckCircle } from "lucide-react";
import "./mezcladorvaporModal.css";

interface MezcladorVaporModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MezcladorVaporModal({ isOpen, onClose }: MezcladorVaporModalProps) {
  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: "center center",
    transform: "scale(1)",
  });

  const [modoCotizar, setModoCotizar] = useState(false);
  const [modeloSeleccionado, setModeloSeleccionado] = useState("M-5144TG HE");
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

  const modelosMezclador = [
    { nombre: "M-5144TG HE", enlace: "#m-5144tg" },
    { nombre: "M-5000 TG", enlace: "#m-5000" },
  ];

  const handleSubmitCotizacion = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const response = await fetch("http://localhost:5000/api/cotizar-express", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          producto: "MEZCLADOR VAPOR - Strahman",
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
    <div className="mezclador-modal-overlay" onClick={onClose}>
      <div className="mezclador-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="mezclador-modal-close" onClick={onClose} aria-label="Cerrar modal">
          <X size={24} />
        </button>

        {!modoCotizar ? (
          <div className="mezclador-modal-grid">
            <div
              className="mezclador-zoom-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="/img/mezcladorvapor.png"
                alt="Mezclador Vapor Strahman"
                className="mezclador-zoom-img"
                style={zoomStyle}
              />
            </div>

            <div className="mezclador-info-container">
              <div className="mezclador-brand-header">
                <img 
                  src="/img/strahman.png" 
                  alt="Strahman" 
                  className="mezclador-logo-img" 
                />
              </div>

              <h2 className="mezclador-title">MEZCLADOR VAPOR</h2>
              
              <p className="mezclador-desc">
                Recupere los costosos costos de servicios públicos de agua, alcantarillado y energía mejorando la eficiencia y reduciendo el uso de agua; benefíciese de un ahorro de hasta un 20%.
              </p>
              
              <p className="mezclador-desc">
                LA <strong>M-5144TG HE</strong> es una estación de mezcla de vapor y agua fría de alta eficiencia, inspirada en la estación de mezcla estándar M-5000 TG. Este es un sistema de baja presión ideal para lavado industrial donde existen diferentes presiones de agua en toda la planta y se desea un mayor rango de presión ajustable o donde el uso de una boquilla de bajo flujo es la opción preferida.
              </p>

              <button 
                className="btn-cotizar-express"
                onClick={() => setModoCotizar(true)}
              >
                <Calculator size={18} /> COTIZAR ESTE EQUIPO AHORA
              </button>
            </div>

            <div className="mezclador-sidebar">
              <ul className="mezclador-models-list">
                {modelosMezclador.map((modelo, index) => (
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
              <h2>Cotización Express - Mezclador Vapor Strahman</h2>
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
                    {modelosMezclador.map((m, idx) => (
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
                    placeholder="Presiones de vapor/agua, accesorios requeridos..."
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

export default MezcladorVaporModal;