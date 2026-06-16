import React, { useState } from 'react';

export default function App() {
  // Estado para controlar el rol activo en el prototipo: 'paciente' o 'terapeuta'
  const [activeRole, setActiveRole] = useState('paciente');

  // Estados de la pantalla del Paciente
  const [currentScreen, setCurrentScreen] = useState('inicio');
  const [progress, setProgress] = useState(0);

  // Estados de la pantalla del Terapeuta (Simulación de control)
  const [selectedPatient, setSelectedPatient] = useState('Matías Muñoz');
  const [isReportGenerated, setIsReportGenerated] = useState(false);

  // Paleta de colores lúdica y profesional basada en Bulma
  const styles = {
    bgMint: { backgroundColor: '#eefcf7' },
    bgTeal: { backgroundColor: '#f0f7f7' },
    textOcto: { color: '#2c7a7b' },
    cardOcto: { border: '3px solid #deff9a', borderRadius: '24px' },
    cardClinic: { borderLeft: '6px solid #2c7a7b', borderRadius: '12px' }
  };

  return (
    <div className="hero is-fullheight" style={activeRole === 'paciente' ? styles.bgMint : styles.bgTeal}>
      
      {/* HEADER / NAVBAR SUPERIOR */}
      <nav className="navbar is-white is-spaced shadow-sm" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <span className="navbar-item">
            <strong className="title is-4" style={styles.textOcto}>
              <i className="fa-solid fa-octopus-deploy mr-2"></i>ECO-HÁBITO
            </strong>
          </span>
        </div>
        
        {/* SELECTOR DE VISTA (TABS DE BULMA) - IDEAL PARA EL VIDEO */}
        <div className="navbar-menu is-active">
          <div className="navbar-start ml-6">
            <div className="tabs is-toggle is-toggle-rounded">
              <ul>
                <li className={activeRole === 'paciente' ? 'is-active' : ''}>
                  <a onClick={() => setActiveRole('paciente')}>
                    <span className="icon is-small"><i className="fa-solid fa-child"></i></span>
                    <span>Vista Paciente (Hogar)</span>
                  </a>
                </li>
                <li className={activeRole === 'terapeuta' ? 'is-active' : ''}>
                  <a onClick={() => setActiveRole('terapeuta')}>
                    <span className="icon is-small"><i className="fa-solid fa-user-doctor"></i></span>
                    <span>SaaS Clínico (Terapeuta)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="navbar-end">
            <div className="navbar-item">
              <span className="tag is-rounded is-medium is-dark">Grupo 67 — ING2030</span>
            </div>
          </div>
        </div>
      </nav>

      {/* CUERPO PRINCIPAL */}
      <div className="hero-body pt-4">
        <div className="container">
          
          {/* ========================================================= */}
          {/* ROL: PACIENTE (PANTALLA DEDICADA EN EL HOGAR)             */}
          {/* ========================================================= */}
          {activeRole === 'paciente' && (
            <div>
              {/* 1. INICIO */}
              {currentScreen === 'inicio' && (
                <div className="columns is-centered animate__animated animate__fadeIn">
                  <div className="column is-8 text-center">
                    <div className="box p-6 has-text-centered" style={styles.cardOcto}>
                      <span className="icon is-large mb-5"><i className="fa-solid fa-ghost fa-5x" style={styles.textOcto}></i></span>
                      <h1 className="title is-1 font-weight-bold" style={styles.textOcto}>¡Hola Matías! 👋</h1>
                      <h2 className="subtitle is-3 mt-2">Tu amigo <strong>Octo</strong> te estaba esperando.</h2>
                      <div className="notification is-warning is-light is-size-5 mt-4">
                        <i className="fa-solid fa-star mr-2"></i><strong>Misión de hoy:</strong> Exploración Espacial Tacto-Sensorial.
                      </div>
                      <button className="button is-success is-large is-rounded mt-5" onClick={() => setCurrentScreen('tarea')}>
                        <strong>¡COMENZAR MISIÓN! 🚀</strong>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. TAREA INTERACTIVA */}
              {currentScreen === 'tarea' && (
                <div className="columns is-variable is-5 animate__animated animate__fadeIn">
                  <div className="column is-4">
                    <div className="box p-5" style={{ borderRadius: '20px', height: '100%' }}>
                      <span className="tag is-info is-light is-medium mb-3"><i className="fa-solid fa-volume-high mr-2"></i>Guía por Voz</span>
                      <h3 className="title is-4">Instrucción de Octo</h3>
                      <p className="is-size-5">"Matías, presiona los tentáculos que se encienden en la pantalla utilizando las yemas de tus dedos de forma suave."</p>
                    </div>
                  </div>
                  <div className="column is-8">
                    <div className="box has-text-centered p-5" style={styles.cardOcto}>
                      <h3 className="title is-3" style={styles.textOcto}>Progreso de Adherencia: {progress}%</h3>
                      <progress className="progress is-success is-large my-4" value={progress} max="100">{progress}%</progress>
                      <div className="columns is-multiline is-mobile">
                        {[1, 2, 3, 4].map((num) => (
                          <div className="column is-6" key={num}>
                            <button 
                              className={`button is-fullwidth is-large is-rounded ${progress >= num * 25 ? 'is-success' : 'is-info is-light'}`}
                              style={{ height: '80px' }}
                              onClick={() => setProgress(num * 25)}
                            >
                              <span>{progress >= num * 25 ? '✅ ¡Logrado!' : `Tentáculo ${num} 🐙`}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                      <button className="button is-primary is-large is-rounded mt-4" disabled={progress < 100} onClick={() => setCurrentScreen('exito')}>
                        Terminar Tarea 🏁
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. ÉXITO */}
              {currentScreen === 'exito' && (
                <div className="columns is-centered animate__animated animate__bounceIn">
                  <div className="column is-7 text-center">
                    <div className="box p-6 has-text-centered" style={{ borderRadius: '24px', border: '3px solid #30c57c' }}>
                      <span className="icon is-large mb-4"><i className="fa-solid fa-trophy fa-5x has-text-warning"></i></span>
                      <h1 className="title is-1 has-text-success font-weight-bold">¡MISIÓN CUMPLIDA!</h1>
                      <p className="is-size-4 mt-3">¡Telemetría enviada automáticamente al centro médico!</p>
                      <button className="button is-link is-rounded mt-5" onClick={() => { setCurrentScreen('inicio'); setProgress(0); }}>
                        Volver al Inicio
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* ROL: TERAPEUTA (SAAS DE GESTIÓN CLÍNICA Y DASHBOARD)       */}
          {/* ========================================================= */}
          {activeRole === 'terapeuta' && (
            <div className="animate__animated animate__fadeIn">
              
              {/* Fila de Tarjetas de Resumen Operacional del Centro */}
              <div className="columns mb-5">
                <div className="column">
                  <div className="box p-4" style={styles.cardClinic}>
                    <p className="heading has-text-grey">Pacientes Activos</p>
                    <p className="title is-3" style={styles.textOcto}>45 Niños</p>
                  </div>
                </div>
                <div className="column">
                  <div className="box p-4" style={{ borderLeft: '6px solid #48c78e', borderRadius: '12px' }}>
                    <p className="heading has-text-grey">Adherencia General del Mes</p>
                    <p className="title is-3 has-text-success">87.4% <span className="is-size-6 font-weight-normal">(KPI Objetivo &gt; 70%)</span></p>
                  </div>
                </div>
                <div className="column">
                  <div className="box p-4" style={{ borderLeft: '6px solid #ffdd57', borderRadius: '12px' }}>
                    <p className="heading has-text-grey">Alertas de Deserción Mitigadas</p>
                    <p className="title is-3 has-text-warning">12 Alertas</p>
                  </div>
                </div>
              </div>

              {/* Dashboard Principal del Paciente Seleccionado */}
              <div className="columns">
                
                {/* Listado de Pacientes en Control */}
                <div className="column is-4">
                  <div className="box">
                    <h3 className="title is-5 mb-4"><i className="fa-solid fa-users mr-2"></i>Mis Pacientes</h3>
                    <div className="menu">
                      <ul className="menu-list">
                        <li>
                          <a className={selectedPatient === 'Matías Muñoz' ? 'is-active' : ''} style={selectedPatient === 'Matías Muñoz' ? {backgroundColor: '#2c7a7b'} : {}} onClick={() => setSelectedPatient('Matías Muñoz')}>
                            <strong>Matías Muñoz</strong> <span className="tag is-success is-pull-right">Alta Adherencia</span>
                          </a>
                        </li>
                        <li className="mt-2">
                          <a onClick={() => alert('Simulación: Seleccionando otro paciente')}>
                            <span>Sofía Contreras</span> <span className="tag is-warning is-pull-right">Seguimiento</span>
                          </a>
                        </li>
                        <li className="mt-2">
                          <a onClick={() => alert('Simulación: Seleccionando otro paciente')}>
                            <span>Ignacio Rojas</span> <span className="tag is-success is-pull-right">Alta Adherencia</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Detalle Clínico y Automatización SOAP */}
                <div className="column is-8">
                  <div className="box p-5">
                    <div className="level mb-4">
                      <div className="level-left">
                        <div className="level-item">
                          <h3 className="title is-4">Monitoreo de Telemetría: <span style={styles.textOcto}>{selectedPatient}</span></h3>
                        </div>
                      </div>
                      <div className="level-right">
                        <span className="tag is-light is-info is-medium">Última sincronización: ¡Hace unos segundos!</span>
                      </div>
                    </div>

                    {/* Gráfico / Barra de Adherencia en Casa */}
                    <div className="notification is-white p-4" style={{ border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                      <p className="subtitle is-6 mb-2"><strong>Cumplimiento de Tareas Asincrónicas en el Hogar (Esta Semana):</strong></p>
                      <div className="columns is-vcentered">
                        <div className="column is-9">
                          <progress className="progress is-primary is-medium" value="92" max="100">92%</progress>
                        </div>
                        <div className="column is-3 has-text-right">
                          <span className="tag is-primary is-large"><strong>92% OK</strong></span>
                        </div>
                      </div>
                      <p className="is-size-7 has-text-grey"><i className="fa-solid fa-circle-info mr-1"></i> El paciente completó con éxito la misión táctil-acústica guiada por el monitor inteligente.</p>
                    </div>

                    {/* Automatización de Reportes (Propuesta de Valor B2B) */}
                    <div className="block mt-5">
                      <h4 className="title is-5 mb-3"><i className="fa-solid fa-robot mr-2"></i>Generación de Reporte Automatizado SOAP</h4>
                      <p className="mb-4">Nuestra IA traduce el juego del niño en texto clínico estructurado, ahorrando un 80% de digitación manual.</p>
                      
                      {!isReportGenerated ? (
                        <button className="button is-primary is-outlined is-fullwidth" onClick={() => setIsReportGenerated(true)}>
                          <strong><i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Redactar Bitácora Automática con Telemetría</strong>
                        </button>
                      ) : (
                        <div className="box has-background-light p-4 animate__animated animate__fadeIn" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                          <p><strong>[SOAP NOTE AUTOMÁTICA - ECO-HÁBITO]</strong></p>
                          <p><strong>S (Subjetivo):</strong> El paciente reporta alta motivación en casa mediante el avatar interactivo Octo.</p>
                          <p><strong>O (Objetivo):</strong> Telemetría registra 100% de ejecución en patrones de presión sensorial. Tiempo de respuesta promedio: 1.4s.</p>
                          <p><strong>A (Análisis):</strong> Se evidencia una reducción drástica en la curva de fatiga táctil y un alza sostenida en la adherencia conductual.</p>
                          <p><strong>P (Plan):</strong> Continuar con el plan asincrónico. Modificar nivel de resistencia en el tentáculo 3 para la próxima sesión en box.</p>
                          <hr className="my-2"/>
                          <button className="button is-small is-danger is-light" onClick={() => setIsReportGenerated(false)}>Limpiar</button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

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