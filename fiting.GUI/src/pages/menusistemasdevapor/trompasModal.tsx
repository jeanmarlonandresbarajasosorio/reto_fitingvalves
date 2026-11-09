import { useState, useEffect } from "react";
import { X, Calculator, CheckCircle } from "lucide-react";
import "./trompasModal.css";

interface TrompasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrompasModal({ isOpen, onClose }: TrompasModalProps) {
  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: "center center",
    transform: "scale(1)",
  });

  const [modoCotizar, setModoCotizar] = useState(false);
  const [modeloSeleccionado, setModeloSeleccionado] = useState("TD600");
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

  const modelosTrampas = [
    { nombre: "TD600", enlace: "#td600" },
    { nombre: "TD600S", enlace: "#td600s" },
    { nombre: "TD700S", enlace: "#td700s" },
    { nombre: "TD900S", enlace: "#td900s" },
    { nombre: "TD3600", enlace: "#td3600" },
  ];

  const handleSubmitCotizacion = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const response = await fetch("http://localhost:5000/api/cotizar-express", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          producto: "TRAMPAS - Trampas Termodinámicas",
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
    <div className="trompas-modal-overlay" onClick={onClose}>
      <div className="trompas-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="trompas-modal-close" onClick={onClose} aria-label="Cerrar modal">
          <X size={24} />
        </button>

        {!modoCotizar ? (
          <div className="trompas-modal-grid">
            <div
              className="trompas-zoom-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="/img/Trampas.png"
                alt="Trampas Termodinámicas"
                className="trompas-zoom-img"
                style={zoomStyle}
              />
            </div>

            <div className="trompas-info-container">
              <div className="trompas-brand-header">
                <img 
                  src="/img/watsonmcdaniel.png" 
                  alt="Watson McDaniel" 
                  className="trompas-logo-img" 
                />
              </div>
              
              <p className="trompas-desc" style={{ marginTop: "15px" }}>
                La trampa de vapor termodinámica es simple y compacta con una sola parte móvil (disco) que se abre para descargar el condensado y se cierra en presencia de vapor. Los materiales del cuerpo disponibles son aceros inoxidables y aleados para presiones de hasta 3600 psig.
              </p>
              
              <p className="trompas-desc">
                Ampliamente utilizado en aplicaciones de goteo de alta presión y aplicaciones de rastreo críticas (donde no se permite la acumulación de condensado).
              </p>

              <button 
                className="btn-cotizar-express"
                onClick={() => setModoCotizar(true)}
              >
                <Calculator size={18} /> COTIZAR ESTE EQUIPO AHORA
              </button>
            </div>

            <div className="trompas-sidebar">
              <ul className="trompas-models-list">
                {modelosTrampas.map((modelo, index) => (
                  <li key={index}>
                    <a 
                      href={modelo.enlace} 
                      onClick={(e) => {
                        e.preventDefault();
                        setModeloSeleccionado(modelo.nombre);
                        setModoCotizar(true);
                      }}
                    >
                      <span className="plus-icon">+</span> {modelo.nombre}
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
              <h2>Cotización Express - Trampas Termodinámicas</h2>
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
                    {modelosTrampas.map((m, idx) => (
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
                    placeholder="Presión de trabajo, conexiones, material..."
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

export default TrompasModal;