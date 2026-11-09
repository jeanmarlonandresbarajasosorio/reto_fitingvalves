// MenuSistemasDeVaporPage.tsx
import { useState } from "react";
import TrompasModal from "./trompasModal";
import BombasDeRetornoModal from "./bombasderetornocondensadoModal";
import ValvulasModal from "./valvulasModal";
import "./MenuSistemasDeVaporPage.css";

export interface ProductoVapor {
  id: string;
  nombre: string;
  imagen: string;
  enlace: string;
}

const productosVapor: ProductoVapor[] = [
  {
    id: "trampas",
    nombre: "Trampas",
    imagen: "/img/Trampas.png",
    enlace: "#trampas",
  },
  {
    id: "bomba-retorno",
    nombre: "Bomba Retorno Condensado",
    imagen: "/img/bombaretornocondensado.png",
    enlace: "#bomba-retorno",
  },
  {
    id: "valvulas-vapor",
    nombre: "Válvulas",
    imagen: "/img/valvulas.png",
    enlace: "#valvulas",
  },
];

export function MenuSistemasDeVaporPage() {
  const [modalTrampasAbierto, setModalTrampasAbierto] = useState(false);
  const [modalBombaAbierto, setModalBombaAbierto] = useState(false);
  const [modalValvulasAbierto, setModalValvulasAbierto] = useState(false);

  return (
    <div className="sistemas-vapor-container">
      <main className="sistemas-vapor-main">
        <div className="productos-grid">
          {productosVapor.map((producto) => (
            <a
              key={producto.id}
              href={producto.enlace}
              className="producto-card"
              onClick={(e) => {
                e.preventDefault();
                if (producto.id === "trampas") {
                  setModalTrampasAbierto(true);
                } else if (producto.id === "bomba-retorno") {
                  setModalBombaAbierto(true);
                } else if (producto.id === "valvulas-vapor") {
                  setModalValvulasAbierto(true);
                } else {
                  alert(`Seleccionaste: ${producto.nombre}`);
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

      {/* Modal de Trampas */}
      <TrompasModal
        isOpen={modalTrampasAbierto}
        onClose={() => setModalTrampasAbierto(false)}
      />

      {/* Modal de Bomba de Retorno de Condensado */}
      <BombasDeRetornoModal
        isOpen={modalBombaAbierto}
        onClose={() => setModalBombaAbierto(false)}
      />

      {/* Modal de Válvulas */}
      <ValvulasModal
        isOpen={modalValvulasAbierto}
        onClose={() => setModalValvulasAbierto(false)}
      />
    </div>
  );
}

export default MenuSistemasDeVaporPage;