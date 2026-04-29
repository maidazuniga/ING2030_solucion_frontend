import Pulpo from "../assets/pulpo1.png"
import "../assets/styles/home.css"

export default function Home() {
  return (
    <section className="home-section section">
      <div className="container">
        <div className="columns is-vcentered">
          {/* Columna del Pulpo (1/3) */}
          <div className="column is-4 has-text-centered">
            <img src={Pulpo} alt="Logo Pulpo" className="pulpo-fluid" />
          </div>
          
          {/* Columna de Texto (2/3) */}
          <div className="column is-8 pl-6">
            <h1 className="title is-1">Panel Principal</h1>
            <p className="subtitle is-3">Bienvenido al sistema de gestión.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
