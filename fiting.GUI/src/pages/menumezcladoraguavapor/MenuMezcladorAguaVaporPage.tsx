// MenuMezcladorAguaVaporPage.tsx
import { useState } from "react";
import MezcladorVaporModal from "./mezcladorvaporModal";
import MangueraModal from "./mangueraModal";
import PistolaModal from "./pistolaModal";
import "./MenuMezcladorAguaVaporPage.css";

export interface ProductoMezclador {
  id: string;
  nombre: string;
  imagen: string;
  enlace: string;
}

const productosMezclador: ProductoMezclador[] = [
  {
    id: "mezclador-vapor",
    nombre: "Mezclador Vapor",
    imagen: "/img/mezcladorvapor.png",
    enlace: "#mezclador-vapor",
  },
  {
    id: "manguera",
    nombre: "Manguera",
    imagen: "/img/manguera.png",
    enlace: "#manguera",
  },
  {
    id: "pistola",
    nombre: "Pistola",
    imagen: "/img/pistola.png",
    enlace: "#pistola",
  },
];

export function MenuMezcladorAguaVaporPage() {
  const [modalMezcladorAbierto, setModalMezcladorAbierto] = useState(false);
  const [modalMangueraAbierto, setModalMangueraAbierto] = useState(false);
  const [modalPistolaAbierto, setModalPistolaAbierto] = useState(false);

  return (
    <div className="mezclador-vapor-container">
      <main className="mezclador-vapor-main">
        <div className="productos-grid">
          {productosMezclador.map((producto) => (
            <a
              key={producto.id}
              href={producto.enlace}
              className="producto-card"
              onClick={(e) => {
                e.preventDefault();
                if (producto.id === "mezclador-vapor") {
                  setModalMezcladorAbierto(true);
                } else if (producto.id === "manguera") {
                  setModalMangueraAbierto(true);
                } else if (producto.id === "pistola") {
                  setModalPistolaAbierto(true);
                }
              }}
            >
              <div className="producto-imagen-container">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="producto-imagen"
                />
              </div>
              <h3 className="producto-titulo">{producto.nombre}</h3>
            </a>
          ))}
        </div>
      </main>

      {/* Modal detallado con zoom para Mezclador Vapor */}
      <MezcladorVaporModal
        isOpen={modalMezcladorAbierto}
        onClose={() => setModalMezcladorAbierto(false)}
      />

      {/* Modal detallado con zoom para Manguera */}
      <MangueraModal
        isOpen={modalMangueraAbierto}
        onClose={() => setModalMangueraAbierto(false)}
      />

      {/* Modal detallado con zoom para Pistola */}
      <PistolaModal
        isOpen={modalPistolaAbierto}
        onClose={() => setModalPistolaAbierto(false)}
      />
    </div>
  );
}

export default MenuMezcladorAguaVaporPage;