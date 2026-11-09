// Navbar.tsx
import { useState } from "react";
import { Phone, Mail, Search, Menu, X, ChevronRight } from "lucide-react";

interface NavbarProps {
  onNavigate?: (path: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busquedaAbierta, setBusquedaAbierta] = useState(false);
  const [termino, setTermino] = useState("");
  const [submenuProductosVisible, setSubmenuProductosVisible] = useState(false);

  const enlaces = [
    { nombre: "INICIO", href: "/" },
    { nombre: "QUIÉNES SOMOS", href: "/#nosotros" },
    { nombre: "PRODUCTOS", href: "/sistemas-de-vapor", esDropdown: true },
    { nombre: "TRABAJE CON NOSOTROS", href: "/#trabaje" },
    { nombre: "CONTACTO", href: "/#contacto" },
    { nombre: "NOTICIAS", href: "/#noticias" },
  ];

  const categoriasProductos = [
    { nombre: "SISTEMAS DE VAPOR WATSON MCDANIEL", href: "/sistemas-de-vapor", tieneFlecha: true },
    { nombre: "MEZCLADOR AGUA VAPOR STRAHMAN", href: "/mezclador-strahman", tieneFlecha: true },
    { nombre: "VÁLVULAS", href: "/valvulas", tieneFlecha: true },
    { nombre: "ACCESORIOS", href: "/accesorios", tieneFlecha: true },
    { nombre: "BRIDAS", href: "/bridas", tieneFlecha: true },
    { nombre: "TUBERIA", href: "/tuberia", tieneFlecha: false },
    { nombre: "EMPAQUES", href: "/empaques", tieneFlecha: true },
  ];

  const handleNavClick = (href: string) => {
    setMenuAbierto(false);
    setSubmenuProductosVisible(false);
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <>
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

      <header className="main-header">
        <a href="/" className="brand" onClick={() => handleNavClick("/")}>
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
                      handleNavClick(enlace.href);
                    }}
                  >
                    {enlace.nombre}
                  </a>

                  {submenuProductosVisible && (
                    <ul className="dropdown-menu">
                      {categoriasProductos.map((item, index) => (
                        <li key={index}>
                          <a
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(item.href);
                            }}
                          >
                            <span>{item.nombre}</span>
                            {item.tieneFlecha && (
                              <ChevronRight size={15} className="dropdown-arrow" />
                            )}
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
                  if (enlace.href.startsWith("#") || enlace.href.includes("#")) {
                    e.preventDefault();
                    handleNavClick(enlace.href);
                  }
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
              setBusquedaAbierta(false);
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
    </>
  );
}