import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HISTORIAL_STORAGE_KEY = 'eco-habito-historial-misiones';

const historialInicial = [
  {
    id: 1,
    fecha: '2026-06-10T16:20:00.000Z',
    satisfaccion: 9,
    dificultad: 'media',
    tiempo: '5-10',
    notas: 'Me gustó mucho jugar con Octo y terminé rápido.',
    misiones: ['Textura rugosa', 'Textura lisa']
  },
  {
    id: 2,
    fecha: '2026-06-12T17:05:00.000Z',
    satisfaccion: 7,
    dificultad: 'facil',
    tiempo: '0-5',
    notas: 'Estuvo entretenida y no fue difícil.',
    misiones: ['Textura suave']
  },
  {
    id: 3,
    fecha: '2026-06-14T18:40:00.000Z',
    satisfaccion: 5,
    dificultad: 'dificil',
    tiempo: '10-15',
    notas: 'Me costó un poco, pero lo logré.',
    misiones: ['Textura áspera', 'Textura gomosa']
  }
];

export default function HistorialMisiones() {
  const [historial] = useState(() => {
    const almacenado = localStorage.getItem(HISTORIAL_STORAGE_KEY);

    if (almacenado) {
      return JSON.parse(almacenado);
    }

    localStorage.setItem(HISTORIAL_STORAGE_KEY, JSON.stringify(historialInicial));
    return historialInicial;
  });

  const styles = {
    bgMint: { backgroundColor: '#eefcf7' },
    textOcto: { color: '#2c7a7b' },
    cardOcto: { border: '3px solid #deff9a', borderRadius: '24px' }
  };

  const getDificultadLabel = (valor) => {
    if (valor === 'facil') return 'Fácil';
    if (valor === 'dificil') return 'Difícil';
    return 'Normal';
  };

  return (
    <div className="hero is-fullheight" style={styles.bgMint}>
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
              <span className="tag is-rounded is-medium is-dark">Historial de Misiones</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="hero-body pt-4">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-11">
              <div className="box p-6" style={styles.cardOcto}>
                <div className="level mb-5">
                  <div className="level-left">
                    <div className="level-item">
                      <div>
                        <h1 className="title is-2 mb-2" style={styles.textOcto}>Misiones pasadas</h1>
                        <p className="subtitle is-5">Aquí puedes revisar cómo se sintió Matías después de cada tarea.</p>
                      </div>
                    </div>
                  </div>
                  <div className="level-right">
                    <Link to="/vista-pacientes" className="button is-link is-light is-rounded">
                      Volver a la vista paciente
                    </Link>
                  </div>
                </div>

                <div className="columns is-multiline">
                  {historial.map((item) => (
                    <div className="column is-6" key={item.id}>
                      <div className="box" style={{ borderRadius: '18px', border: '2px solid #d6f5e8' }}>
                        <div className="level is-mobile mb-3">
                          <div className="level-left">
                            <div className="level-item">
                              <p className="title is-5 mb-0">Misión registrada</p>
                            </div>
                          </div>
                          <div className="level-right">
                            <span className="tag is-info is-light">{new Date(item.fecha).toLocaleDateString('es-CL')}</span>
                          </div>
                        </div>

                        <div className="content">
                          {Array.isArray(item.misiones) && item.misiones.length > 0 && (
                            <div className="tags mb-3">
                              {item.misiones.map((mission) => (
                                <span className="tag is-rounded is-light" key={mission}>{mission}</span>
                              ))}
                            </div>
                          )}
                          <p className="mb-2"><strong>Cómo se sintió:</strong> {item.satisfaccion}/10</p>
                          <progress className="progress is-success is-small mb-3" value={item.satisfaccion} max="10">{item.satisfaccion}/10</progress>
                          <p className="mb-2"><strong>Dificultad:</strong> {getDificultadLabel(item.dificultad)}</p>
                          <p className="mb-2"><strong>Tiempo:</strong> {item.tiempo} min</p>
                          {item.notas && <p className="is-size-7 has-text-grey">{item.notas}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
