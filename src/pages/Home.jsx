import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const styles = {
    textOcto: { color: '#2c7a7b' }
  };

  return (
    <div className="hero is-fullheight has-background-link-light">
      
      {/* HEADER / NAVBAR SUPERIOR */}
      <nav className="navbar is-white is-spaced shadow-sm" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <span className="navbar-item">
            <strong className="title is-4" style={styles.textOcto}>
              <i className="fa-solid fa-octopus-deploy mr-2"></i>ECO-HÁBITO
            </strong>
          </span>
        </div>
        
        <div className="navbar-menu is-active">
          <div className="navbar-end">
            <div className="navbar-item">
              <span className="tag is-rounded is-medium is-dark">Panel de Control</span>
            </div>
          </div>
        </div>
      </nav>

      {/* CUERPO PRINCIPAL */}
      <div className="hero-body">
        <div className="container has-text-centered">
          
          <div className="column is-6 is-offset-3">
            <h1 className="title is-1 mb-6" style={styles.textOcto}>
              <i className="fa-solid fa-octopus-deploy"></i> ECO-HÁBITO
            </h1>
            <p className="subtitle is-4 mb-6">Plataforma de Terapia Ocupacional Lúdica con IoT</p>
            
            <div className="box p-6">
              <h2 className="title is-3 mb-5">Selecciona una vista:</h2>
              
              <div className="columns is-variable is-4">
                
                {/* Vista Paciente */}
                <div className="column">
                  <Link to="/vista-pacientes" className="box has-background-warning-light" style={{ cursor: 'pointer', display: 'block', textDecoration: 'none', color: 'inherit', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <span className="icon is-large mb-3"><i className="fa-solid fa-child fa-5x" style={styles.textOcto}></i></span>
                    <h3 className="title is-4 mt-3">Vista Paciente</h3>
                    <p className="mb-3">(Hogar)</p>
                    <p className="is-size-6">Realiza misiones lúdicas de terapia ocupacional con Octo.</p>
                  </Link>
                </div>

                {/* Vista Terapeuta */}
                <div className="column">
                  <Link to="/vista-terapeuta" className="box has-background-info-light" style={{ cursor: 'pointer', display: 'block', textDecoration: 'none', color: 'inherit', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <span className="icon is-large mb-3"><i className="fa-solid fa-user-doctor fa-5x" style={styles.textOcto}></i></span>
                    <h3 className="title is-4 mt-3">Vista Terapeuta</h3>
                    <p className="mb-3">(SaaS Clínico)</p>
                    <p className="is-size-6">Monitorea pacientes y genera reportes automatizados.</p>
                  </Link>
                </div>

              </div>
            </div>

            <p className="is-size-7 text-muted mt-5">
              <strong>Eco-Hábito SaaS Clínico & IoT</strong> — Panel Integrado de Demostración para Video de Pitch. Universidad Católica de Chile.
            </p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer py-4 has-background-white text-center" style={{ borderTop: '1px solid #e2e8f0' }}>
        <div className="content has-text-centered">
          <p className="is-size-7 text-muted">
            Grupo 67 — ING2030
          </p>
        </div>
      </footer>
    </div>
  );
}
