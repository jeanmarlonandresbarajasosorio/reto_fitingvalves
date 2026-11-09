import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  Search,
  Menu,
  X,
  Award,
  Clock3,
  Star,
  CheckCircle2,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api from "./services/api";
import MenuSistemasDeVaporPage from "./pages/menusistemasdevapor/MenuSistemasDeVaporPage";
import MenuMezcladorAguaVaporPage from "./pages/menumezcladoraguavapor/MenuMezcladorAguaVaporPage";
import QuienSomospage from "./pages/quiensomos/quiensomosPage";

import "./App.css";

function App() {
  const [mensaje, setMensaje] = useState("Conectando con el servidor...");
  const [apiActiva, setApiActiva] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busquedaAbierta, setBusquedaAbierta] = useState(false);
  const [termino, setTermino] = useState("");
  const [submenuProductosVisible, setSubmenuProductosVisible] = useState(false);
  
  const [vistaActual, setVistaActual] = useState<"home" | "sistemas-vapor" | "mezclador-agua-vapor" | "quien-somos">("home");

  const [representacionesIndex, setRepresentacionesIndex] = useState(0);
  const [nuestrosClientesIndex, setNuestrosClientesIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [emailCotizacion, setEmailCotizacion] = useState("");

  const heroBanners = [
    { img: "/img/principal1.png" },
    { img: "/img/principal2.png" },
    { img: "/img/principal3.png" },
    { img: "/img/principal4.png" },
    { img: "/img/principal5.png" },
    { img: "/img/principal6.png" },
    { img: "/img/principal7.png" },
  ];

  const marcas = [
    { nombre: "Watson McDaniel", img: "/img/distribuciones1.png" },
    { nombre: "Strahman", img: "/img/distribuciones2.png" },
    { nombre: "BTL", img: "/img/distribuciones3.png" },
    { nombre: "Genebre", img: "/img/distribuciones4.png" },
    { nombre: "Steeltrade", img: "/img/distribuciones5.png" },
    { nombre: "Bray", img: "/img/distribuciones6.png" },
    { nombre: "Fivalco", img: "/img/distribuciones7.png" },
    { nombre: "Luvuan", img: "/img/distribuciones8.png" },
    { nombre: "BMA", img: "/img/distribuciones9.png" },
  ];

  const clientesPrincipales = [
    { id: "cocacola", nombre: "Coca-Cola", img: "/img/cocacola.png" },
    { id: "ecopetrol", nombre: "Ecopetrol", img: "/img/ecopetrol.png" },
    { id: "ibios", nombre: "Grupo Bios", img: "/img/ibios.png" },
    { id: "itacol", nombre: "Italcol", img: "/img/itacol.png" },
    { id: "macpollo", nombre: "Macpollo", img: "/img/macpollo.png" },
    { id: "manuelita", nombre: "Manuelita", img: "/img/manuelita.png" },
    { id: "nutresa", nombre: "Grupo Nutresa", img: "/img/nutresa.png" },
    { id: "palmasdelcesar", nombre: "Palmas del César", img: "/img/palmasdelcesar.png" },
    { id: "postobon", nombre: "Postobón", img: "/img/postobon.png" },
  ];

  const categoriasProductos = [
    { 
      nombre: "SISTEMAS DE VAPOR WATSON MCDANIEL", 
      accion: () => { setVistaActual("sistemas-vapor"); cerrarMenu(); }, 
      tieneFlecha: true 
    },
    { 
      nombre: "MEZCLADOR AGUA VAPOR STRAHMAN", 
      accion: () => { setVistaActual("mezclador-agua-vapor"); cerrarMenu(); }, 
      tieneFlecha: true 
    },
    { nombre: "VÁLVULAS", accion: () => { alert("Próximamente"); cerrarMenu(); }, tieneFlecha: true },
    { nombre: "ACCESORIOS", accion: () => { alert("Próximamente"); cerrarMenu(); }, tieneFlecha: true },
    { nombre: "BRIDAS", accion: () => { alert("Próximamente"); cerrarMenu(); }, tieneFlecha: true },
    { nombre: "TUBERIA", accion: () => { alert("Próximamente"); cerrarMenu(); }, tieneFlecha: false },
    { nombre: "EMPAQUES", accion: () => { alert("Próximamente"); cerrarMenu(); }, tieneFlecha: true },
  ];

  useEffect(() => {
    const verificarConexion = async () => {
      try {
        const response = await api.get("/");
        setMensaje(response.data.message);
        setApiActiva(true);
      } catch (error) {
        console.error("Error de conexión con la API:", error);
        setMensaje("No se pudo conectar con el servidor");
        setApiActiva(false);
      }
    };
    verificarConexion();
  }, []);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroBanners.length);
    }, 4500);
    return () => clearInterval(heroTimer);
  }, [heroBanners.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRepresentacionesIndex((prev) => (prev + 1) % marcas.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [marcas.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNuestrosClientesIndex((prev) => (prev + 1) % clientesPrincipales.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [clientesPrincipales.length]);

  const nextRepresentacion = () => {
    setRepresentacionesIndex((prev) => (prev + 1) % marcas.length);
  };

  const prevRepresentacion = () => {
    setRepresentacionesIndex((prev) => (prev - 1 + marcas.length) % marcas.length);
  };

  const nextNuestrosClientes = () => {
    setNuestrosClientesIndex((prev) => (prev + 1) % clientesPrincipales.length);
  };

  const prevNuestrosClientes = () => {
    setNuestrosClientesIndex((prev) => (prev - 1 + clientesPrincipales.length) % clientesPrincipales.length);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
    setSubmenuProductosVisible(false);
  };

  const enlaces = [
    { nombre: "INICIO", href: "#inicio", accion: () => { setVistaActual("home"); } },
    { nombre: "QUIÉNES SOMOS", href: "#nosotros", accion: () => { setVistaActual("quien-somos"); } },
    { nombre: "PRODUCTOS", href: "#productos", esDropdown: true },
    { nombre: "TRABAJE CON NOSOTROS", href: "#trabaje", accion: () => { setVistaActual("home"); } },
    { nombre: "CONTACTO", href: "#contacto", accion: () => { setVistaActual("home"); } },
    { nombre: "NOTICIAS", href: "#noticias", accion: () => { setVistaActual("home"); } },
  ];

  const handleCotizacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailCotizacion.trim()) {
      alert(`Gracias. Recibimos tu solicitud de cotización para: ${emailCotizacion}`);
      setEmailCotizacion("");
    }
  };

  return (
    <div className="app">
      <div className="topbar">
        <a className="topbar-phone" href="tel:+573156338300">
          <Phone size={16} fill="currentColor" />
          <span>Llámanos: + (57) 3156338300</span>
        </a>

        <a className="topbar-email" href="mailto:ventas@fittingvalves.com">
          <Mail size={17} />
          <span>Email: ventas@fittingvalves.com</span>
        </a>
      </div>
      <header className="main-header" id="inicio">
        <a 
          href="#inicio" 
          className="brand" 
          onClick={(e) => {
            e.preventDefault();
            setVistaActual("home");
            cerrarMenu();
          }}
        >
          <img 
            src="/img/logofittingvalves.png" 
            alt="Fitting Valves Logo" 
            className="brand-logo-img" 
          />
        </a>

        <button
          className="mobile-menu-button"
          aria-label="Abrir menú"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`navigation ${menuAbierto ? "navigation-open" : ""}`}>
          {enlaces.map((enlace) => {
            if (enlace.esDropdown) {
              return (
                <div
                  key={enlace.nombre}
                  className="nav-item-dropdown"
                  onMouseEnter={() => setSubmenuProductosVisible(true)}
                  onMouseLeave={() => setSubmenuProductosVisible(false)}
                >
                  <a
                    href={enlace.href}
                    className={`nav-link ${submenuProductosVisible ? "active-dropdown" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.innerWidth <= 768) {
                        setSubmenuProductosVisible(!submenuProductosVisible);
                      }
                    }}
                  >
                    {enlace.nombre}
                  </a>

                  {submenuProductosVisible && (
                    <ul className="dropdown-menu">
                      {categoriasProductos.map((item, index) => (
                        <li key={index}>
                          <a 
                            href="#producto" 
                            onClick={(e) => {
                              e.preventDefault();
                              item.accion();
                            }}
                          >
                            <span>{item.nombre}</span>
                            {item.tieneFlecha && <ChevronRight size={15} className="dropdown-arrow" />}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }

            return (
              <a
                key={enlace.nombre}
                href={enlace.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (enlace.accion) enlace.accion();
                  cerrarMenu();
                }}
              >
                {enlace.nombre}
              </a>
            );
          })}
        </nav>

        <div className="header-search-wrapper">
          <button
            className="search-button"
            aria-label="Buscar"
            onClick={() => setBusquedaAbierta(!busquedaAbierta)}
          >
            {busquedaAbierta ? <X size={20} /> : <Search size={20} />}
          </button>
        </div>
      </header>

      {busquedaAbierta && (
        <div className="search-panel">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const texto = termino.trim().toLowerCase();
              const destino = enlaces.find((enlace) =>
                enlace.nombre.toLowerCase().includes(texto)
              );
              if (destino) {
                if (destino.accion) destino.accion();
                setBusquedaAbierta(false);
              }
            }}
          >
            <input
              type="search"
              placeholder="Type Word Then Enter.."
              value={termino}
              onChange={(event) => setTermino(event.target.value)}
              autoFocus
            />
            <button type="submit">
              <Search size={20} />
            </button>
          </form>
        </div>
      )}
      <main>
        {vistaActual === "sistemas-vapor" ? (
          <MenuSistemasDeVaporPage />
        ) : vistaActual === "mezclador-agua-vapor" ? (
          <MenuMezcladorAguaVaporPage />
        ) : vistaActual === "quien-somos" ? (
          <QuienSomospage />
        ) : (
          <>
            <section className="hero-section">
              <div
                className="hero-slider-track"
                style={{ transform: `translateX(-${heroIndex * 100}%)` }}
              >
                {heroBanners.map((banner, idx) => (
                  <div
                    key={idx}
                    className="hero-slide"
                    style={{ backgroundImage: `url(${banner.img})` }}
                  ></div>
                ))}
              </div>
            </section>

            <section className="features-section" id="nosotros">
              <article className="feature-card">
                <div className="feature-icon">
                  <Award size={36} />
                </div>
                <h3>Calidad garantizada</h3>
                <p>
                  Productos industriales respaldados por marcas reconocidas a nivel mundial.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">
                  <Clock3 size={36} />
                </div>
                <h3>Experiencia</h3>
                <p>
                  Soluciones especializadas para diferentes sectores industriales.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">
                  <Star size={36} />
                </div>
                <h3>Compromiso</h3>
                <p>
                  Acompañamiento y atención personalizada para nuestros clientes.
                </p>
              </article>
            </section>

            <section className="company-section">
              <div className="company-grid">
                <div className="company-images">
                  <div className="img-box real-img-box">
                    <img src="/img/nuestraempresa.png" alt="Instalaciones Fitting Valves" />
                  </div>
                  <div className="img-box real-img-box">
                    <img src="/img/nuestraempresa1.png" alt="Bodega Fitting Valves" />
                  </div>
                </div>

                <div className="company-info">
                  <div className="section-title-wrapper">
                    <span className="title-bar"></span>
                    <h2>NUESTRA EMPRESA</h2>
                  </div>
                  <p>
                    Es una Compañía Colombiana creada en el año 2007, empresa dedicada a la importación y comercialización de equipos, maquinaria, válvulas, tuberías, accesorios, sistemas de vapor para los sectores de petroquímica, petróleo, gas, palma, papel, alimentos, farmacéuticos e industria en general; ofreciendo a nuestros clientes la logística de embarque, entrega, agilidad, calidad y cumplimiento de sus productos.
                  </p>
                  <p>
                    Nos hemos convertido en una excelente opción para la realización de sus proyectos, esto lo confirma nuestro galardón en el año 2014 como mejor proveedor con el PREMIO "SUME MÁS" a la EXCELENCIA otorgado por ECOPETROL y todas sus empresas aliadas.
                  </p>

                  <div className="company-buttons">
                    <button className="btn-yellow">
                      <Star size={18} /> Política de calidad
                    </button>
                    <button className="btn-yellow">
                      <Target size={18} /> Objetivos de calidad
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="awards-section">
              <div className="awards-container">
                <div className="award-card ecopetrol-card">
                  <h4>RECONOCIMIENTO OTORGADO POR ECOPETROL</h4>
                  <div className="award-badge">
                    <Award size={65} color="#ffc700" />
                    <span>e+ SUME+ 2014</span>
                  </div>
                  <p>
                    Fitting Valves recibió en el año 2014 el premio "SUME+" a la excelencia en el servicio por ser uno de los proveedores más destacados para Ecopetrol.
                  </p>
                  <span className="quote-text">"La Excelencia es el comienzo"</span>
                </div>

                <div className="award-card sgs-card">
                  <h4>CERTIFICACIÓN ISO 9001</h4>
                  <p className="iso-desc">
                    FITTING VALVES S.A.S cumple con las exigencias generadas en la calidad obteniendo la recalificación en la norma ISO-9001 en la versión 2015.
                  </p>
                  <div className="iso-logo">
                    <CheckCircle2 size={75} color="#e05600" />
                    <div>
                      <strong>SYSTEM CERTIFICATION</strong>
                      <br />
                      <span>ISO 9001 - SGS</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="clients-section">
              <div className="clients-header">
                <h2>REPRESENTACIONES Y DISTRIBUCIONES</h2>
                <div className="yellow-underline"></div>
              </div>

              <div className="carousel-container">
                <button className="carousel-btn prev" onClick={prevRepresentacion}>
                  <ChevronLeft size={26} />
                </button>

                <div className="carousel-track-wrapper">
                  <div
                    className="carousel-track"
                    style={{
                      transform: `translateX(-${(representacionesIndex % marcas.length) * 33.33}%)`,
                    }}
                  >
                    {marcas.map((item, i) => (
                      <div key={i} className="carousel-item">
                        <div className="brand-card">
                          <div className="brand-card-img-wrapper">
                            <img src={item.img} alt={item.nombre} className="carousel-real-img" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="carousel-btn next" onClick={nextRepresentacion}>
                  <ChevronRight size={26} />
                </button>
              </div>
            </section>

            <section className="our-clients-section">
              <div className="clients-header">
                <h2>NUESTROS CLIENTES</h2>
                <div className="yellow-underline"></div>
              </div>

              <div className="carousel-container">
                <button className="carousel-btn prev" onClick={prevNuestrosClientes}>
                  <ChevronLeft size={26} />
                </button>

                <div className="carousel-track-wrapper">
                  <div
                    className="carousel-track"
                    style={{
                      transform: `translateX(-${(nuestrosClientesIndex % clientesPrincipales.length) * 25}%)`,
                    }}
                  >
                    {clientesPrincipales.map((cliente, idx) => (
                      <div key={idx} className="carousel-item-4">
                        <div className="client-card">
                          <div className="client-logo-wrapper">
                            <img src={cliente.img} alt={cliente.nombre} className="client-real-img" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="carousel-btn next" onClick={nextNuestrosClientes}>
                  <ChevronRight size={26} />
                </button>
              </div>
            </section>
          </>
        )}

        <div className="quotation-section-container">
          <div className="quotation-box">
            <div className="quotation-info">
              <Mail size={38} color="#ffc700" />
              <span>Realiza tu cotización aquí</span>
            </div>
            <form onSubmit={handleCotizacion} className="quotation-form">
              <input
                type="email"
                placeholder="Correo"
                value={emailCotizacion}
                onChange={(e) => setEmailCotizacion(e.target.value)}
                required
              />
              <button type="submit">ENVIAR</button>
            </form>
          </div>
        </div>
      </main>

      <footer className="footer" id="trabaje">
        <div className="footer-sedes-grid">
          <div className="sede-column">
            <h5>Bucaramanga</h5>
            <p>Cra. 27 # 54-38 Panamericana a 300m Contigo</p>
            <p>PBX: +57 (607) 6434400</p>
            <p>Email: ventas@fittingvalves.com</p>
          </div>
          <div className="sede-column">
            <h5>Bogotá D.C.</h5>
            <p>Teléfono: +57 (601) 7447488</p>
            <p>Email: ventas@fittingvalves.com</p>
          </div>
          <div className="sede-column">
            <h5>Barranquilla</h5>
            <p>Cra 53 # 76-239 Oficina 301 Vintage Avenida</p>
            <p>Teléfono: +57 (605) 3858181</p>
            <p>Email: ventas@fittingvalves.com</p>
          </div>
          <div className="sede-column">
            <h5>Barrancabermeja</h5>
            <p>Calle 50 # 18-58 Br. Colombia</p>
            <p>Teléfono: +57 (607) 6010537</p>
            <p>Email: ventas@fittingvalves.com</p>
          </div>
        </div>

        <div className="footer-top">
          <div className="footer-brand">
            <img 
              src="/img/logofittingvalves.png" 
              alt="Fitting Valves Footer Logo" 
              style={{ height: '40px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} 
            />
            <p style={{ marginTop: '5px' }}>Importadores Industriales</p>
          </div>

          <div className="footer-contact">
            <p>
              <Phone size={18} /> + (57) 3156338300
            </p>
            <p>
              <Mail size={18} /> ventas@fittingvalves.com
            </p>
          </div>
        </div>

        <div className="footer-bottom" id="noticias">
          <p>
            © {new Date().getFullYear()} Fitting Valves. Todos los derechos reservados.
          </p>
          <div className={`api-status ${apiActiva ? "online" : "offline"}`}>
            <span></span>
            {mensaje}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;