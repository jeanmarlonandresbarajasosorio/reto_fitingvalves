import "./NoticiasPages.css";

export function NoticiasPages() {
  const listaNoticias = [
    {
      titulo: "Simple Steps for Replacing old Tiling",
      descripcion: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum.",
      imagen: "/img/noticias.png",
      enlace: "#leer-mas"
    },
    {
      titulo: "Dangers of Having High Water Pressure",
      descripcion: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum.",
      imagen: "/img/noticias.png",
      enlace: "#leer-mas"
    },
    {
      titulo: "When have a problem with Cracked Pipes",
      descripcion: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum.",
      imagen: "/img/noticias.png",
      enlace: "#leer-mas"
    }
  ];

  return (
    <div className="noticias-page-container">
      <div className="noticias-grid-wrapper">
        {listaNoticias.map((item, index) => (
          <div key={index} className="noticia-card">
            <div className="noticia-img-container">
              <img src={item.imagen} alt={item.titulo} />
            </div>
            <div className="noticia-content">
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
              <a 
                href={item.enlace} 
                onClick={(e) => { e.preventDefault(); alert(`Leyendo noticia: ${item.titulo}`); }}
                className="btn-leer-mas"
              >
                Leer más
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoticiasPages;