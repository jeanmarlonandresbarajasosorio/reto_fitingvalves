import "./quiensomosPage.css";

export function QuienSomospage() {
  return (
    <div className="quien-somos-container">
      <main className="quien-somos-main">
        <div className="quien-somos-grid">
          <div className="quien-somos-img-wrapper">
            <img 
              src="/img/nuestraempresa.png" 
              alt="Instalaciones Fitting Valves S.A.S" 
              className="quien-somos-img" 
            />
          </div>

          <div className="quien-somos-info">
            <div className="section-title-wrapper">
              <span className="title-bar"></span>
              <h2>NUESTRA EMPRESA</h2>
            </div>
            
            <span className="quien-somos-subtitle">FITTING VALVES S.A.S</span>

            <p className="quien-somos-desc">
              Es una Compañía Colombiana creada en el año 2007, empresa dedicada a la importación y comercialización de equipos, maquinaria, válvulas, tuberías, accesorios, sistemas de vapor para los sectores de petroquímica, petróleo, gas, palma, papel, alimentos, farmacéuticos e industria en general; ofreciendo a nuestros clientes la logística de embarque, entrega, agilidad, calidad y cumplimiento de sus productos.
            </p>
            
            <p className="quien-somos-desc">
              Nos hemos convertido en una excelente opción para la realización de sus proyectos, esto lo confirma nuestro galardón en el año 2014 como mejor proveedor con el <strong>PREMIO «SUME MÁS» a la EXCELENCIA</strong>, otorgado por ECOPETROL y todas sus empresas aliadas.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default QuienSomospage;