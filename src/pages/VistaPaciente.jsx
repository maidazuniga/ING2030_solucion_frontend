import React from 'react';
import { Link } from 'react-router-dom';

export default function VistaPaciente() {
  // Paleta de colores lúdica y profesional basada en Bulma
  const styles = {
    bgMint: { backgroundColor: '#eefcf7' },
    textOcto: { color: '#2c7a7b' },
    cardOcto: { border: '3px solid #deff9a', borderRadius: '24px' }
  };

  return (
    <div className="hero is-fullheight" style={styles.bgMint}>
      
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
              <span className="tag is-rounded is-medium is-dark">Vista Paciente (Hogar)</span>
            </div>
          </div>
        </div>
      </nav>

      {/* CUERPO PRINCIPAL */}
      <div className="hero-body pt-4">
        <div className="container">
          <div className="columns is-centered animate__animated animate__fadeIn">
            <div className="column is-8 text-center">
              <div className="box p-6 has-text-centered" style={styles.cardOcto}>
                <span className="icon is-large mb-5"><i className="fa-solid fa-ghost fa-5x" style={styles.textOcto}></i></span>
                <h1 className="title is-1 font-weight-bold" style={styles.textOcto}>¡Hola Matías! 👋</h1>
                <h2 className="subtitle is-3 mt-2">Tu amigo <strong>Octo</strong> te estaba esperando.</h2>
                <div className="notification is-warning is-light is-size-5 mt-4">
                  <i className="fa-solid fa-star mr-2"></i><strong>¡Tu siguiente misión te espera!</strong>
                </div>
                <div className="buttons is-centered mt-5">
                  <Link to="/vista-pacientes/mision" className="button is-success is-large is-rounded">
                    <strong>¡COMENZAR MISIÓN! 🚀</strong>
                  </Link>
                  <Link to="/vista-pacientes/historial" className="button is-light is-rounded is-small" style={{ alignSelf: 'center' }}>
                    <strong>Misiones pasadas</strong>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer py-4 has-background-white text-center mt-auto" style={{ borderTop: '1px solid #e2e8f0' }}>
        <div className="content has-text-centered">
          <p className="is-size-7 text-muted">
            <strong>Eco-Hábito SaaS Clínico & IoT</strong> — Panel Integrado de Demostración para Video de Pitch. Universidad Católica de Chile.
          </p>
        </div>
      </footer>
    </div>
  );
}
