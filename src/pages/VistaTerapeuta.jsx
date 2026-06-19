import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function VistaTerapeuta() {
  // Base de datos de pacientes (Limpiada de tecnicismos en las etiquetas)
  const [pacientesData, setPacientesData] = useState([
    {
      id: 1,
      nombre: 'Matías Muñoz',
      edad: '6 años',
      tutor: 'Carolina Gómez (Madre)',
      proximoControl: '24 de Junio, 2026',
      adherencia: 92,
      estado: 'Alta Adherencia',
      tagColor: 'is-success',
      progColor: 'is-primary',
      diagnostico: 'Trastorno de Integración Sensorial (TIS)',
      subtexto: 'Completó exitosamente los ejercicios de presión física semanales.',
      metricasAcumuladas: { sesionesRealizadas: 14, sesionesTotales: 16, misionesCompletadas: 42 },
      misionesSemanales: { tactil: true, auditiva: true, motrizFina: false },
      // Traducido a lenguaje clínico amigable
      analisisSensores: {
        tiempoRespuesta: '1.4 segundos',
        precisionPresion: '94%',
        intentosFallidos: '2 de 30',
        patronDominante: 'Presión palmar constante'
      },
      soap: {
        S: 'El paciente reporta alta motivación en casa mediante el avatar interactivo Octo.',
        O: 'Los sensores registran 92% de ejecución en patrones de presión.',
        A: 'Se evidencia una reducción drástica en la fatiga táctil remota.',
        P: 'Continuar con el plan actual. Incrementar nivel de resistencia en el módulo 3.'
      }
    },
    {
      id: 2,
      nombre: 'Sofía Contreras',
      edad: '8 años',
      tutor: 'Ricardo Contreras (Padre)',
      proximoControl: '26 de Junio, 2026',
      adherencia: 45,
      estado: 'Riesgo de Deserción',
      tagColor: 'is-danger',
      progColor: 'is-danger',
      diagnostico: 'Condición del Espectro Autista (TEA) - Hipersensible',
      subtexto: 'Desconexión prematura del dispositivo interactivo dentro del primer minuto de uso.',
      metricasAcumuladas: { sesionesRealizadas: 6, sesionesTotales: 14, misionesCompletadas: 18 },
      misionesSemanales: { tactil: true, auditiva: false, motrizFina: false },
      analisisSensores: {
        tiempoRespuesta: '4.8 segundos (Retraso por evitación)',
        precisionPresion: '51%',
        intentosFallidos: '14 de 20 (Abandono)',
        patronDominante: 'Sensibilidad a estímulos acústicos agudos'
      },
      soap: {
        S: 'La madre reporta que la paciente se frustra con las alertas acústicas agudas en el hogar.',
        O: 'Baja adherencia (45%) en las últimas dos semanas. Apagado recurrente del dispositivo.',
        A: 'La baja adherencia responde a una sobrecarga del estímulo auditivo.',
        P: 'Bajar volumen del dispositivo al 20%. Configurar actividades a modo puramente visual.'
      }
    }
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [activeTab, setActiveTab] = useState('progreso'); // CONTROL DE SUBPÁGINAS: 'progreso', 'historial', 'tareas'
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [notificacionMision, setNotificacionMision] = useState(false);

  // Estado para simular la creación de una nueva tarea detallada
  const [nuevaTarea, setNuevaTarea] = useState({ nombre: '', tipo: 'tactil', descripcion: '' });

  const currentPatient = pacientesData.find(p => p.id === selectedId);

  const styles = {
    bgCream: { backgroundColor: '#fcfbf9', minHeight: '100vh', color: '#2d3748' },
    textOcto: { color: '#2c7a7b' },
    cardBlanca: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }
  };

  const handleToggleMision = (tipo) => {
    setPacientesData(prev => prev.map(p => {
      if (p.id === selectedId) {
        return { ...p, misionesSemanales: { ...p.misionesSemanales, [tipo]: !p.misionesSemanales[tipo] } };
      }
      return p;
    }));
  };

  const handleCrearTarea = (e) => {
    e.preventDefault();
    alert(`¡Tarea "${nuevaTarea.nombre}" asignada con éxito a ${currentPatient.nombre}!`);
    setNuevaTarea({ nombre: '', tipo: 'tactil', descripcion: '' });
  };

  return (
    <div style={styles.bgCream} className="py-5 px-5">
      <div className="container is-fluid">
        
        {/* ENCABEZADO SUPERIOR LIMPIO */}
        <div className="columns is-vcentered mb-5 pb-4" style={{ borderBottom: '2px solid #e2e8f0' }}>
          <div className="column">
            <div className="is-flex is-align-items-center">
              <h1 className="title is-3 mb-0 mr-4" style={styles.textOcto}>
                <i className="fa-solid fa-octopus-deploy mr-2"></i>Eco-Hábito Clínico
              </h1>
              <Link to="/" className="button is-small is-light is-rounded font-weight-bold" style={{ border: '1px solid #2c7a7b', color: '#2c7a7b' }}>
                <i className="fa-solid fa-arrow-left mr-2"></i> Volver al Inicio
              </Link>
            </div>
            <p className="subtitle is-6 has-text-grey-dark mt-2">Plataforma de Acompañamiento para Terapias en el Hogar</p>
          </div>
          <div className="column has-text-right">
            <span className="tag is-teal is-light is-medium font-weight-bold">Espacio del Terapeuta</span>
          </div>
        </div>

        {/* REJILLA PRINCIPAL */}
        <div className="columns is-variable is-3">
          
          {/* PANEL IZQUIERDO: SELECCIÓN DE PACIENTES (Siempre visible para mantener contexto) */}
          <div className="column is-3">
            <div className="box" style={styles.cardBlanca}>
              <h3 className="title is-5 mb-4" style={styles.textOcto}>
                <i className="fa-solid fa-users mr-2"></i>Mis Pacientes
              </h3>
              <div className="menu">
                <ul className="menu-list">
                  {pacientesData.map((p) => (
                    <li key={p.id} className="mb-2">
                      <a 
                        className={selectedId === p.id ? 'is-active' : ''} 
                        style={selectedId === p.id ? { backgroundColor: '#2c7a7b', color: '#ffffff' } : { color: '#2d3748' }} 
                        onClick={() => {
                          setSelectedId(p.id);
                          setIsReportGenerated(false);
                        }}
                      >
                        <strong>{p.nombre}</strong>
                        <span className={`tag ${p.tagColor} is-pulled-right is-light`}>{p.adherencia}%</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FICHA RESUMEN DEL NIÑO */}
            <div className="box mt-4" style={styles.cardBlanca}>
              <div className="is-flex is-align-items-center mb-3">
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e6fffa', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="mr-3">
                  <i className="fa-solid fa-child" style={styles.textOcto}></i>
                </div>
                <div>
                  <h4 className="title is-6 mb-0">{currentPatient.nombre}</h4>
                  <p className="is-size-7 text-muted">{currentPatient.edad}</p>
                </div>
              </div>
              <p className="is-size-7 mb-1"><strong>Diagnóstico:</strong> {currentPatient.diagnostico}</p>
              <p className="is-size-7"><strong>Próximo Control:</strong> {currentPatient.proximoControl}</p>
            </div>
          </div>

          {/* PANEL DERECHO DINÁMICO: CONTROLADO POR PESTAÑAS (TABS) */}
          <div className="column is-9">
            
            {/* NAVEGACIÓN POR PESTAÑAS - Súper intuitivo para el usuario */}
            <div className="tabs is-boxed mb-4">
              <ul>
                <li className={activeTab === 'progreso' ? 'is-active' : ''}>
                  <a onClick={() => setActiveTab('progreso')} style={activeTab === 'progreso' ? { color: '#2c7a7b' } : {}}>
                    <i className="fa-solid fa-chart-line mr-2"></i>Progreso y Sensores
                  </a>
                </li>
                <li className={activeTab === 'tareas' ? 'is-active' : ''}>
                  <a onClick={() => setActiveTab('tareas')} style={activeTab === 'tareas' ? { color: '#2c7a7b' } : {}}>
                    <i className="fa-solid fa-tasks mr-2"></i>Asignar y Ver Tareas
                  </a>
                </li>
                <li className={activeTab === 'historial' ? 'is-active' : ''}>
                  <a onClick={() => setActiveTab('historial')} style={activeTab === 'historial' ? { color: '#2c7a7b' } : {}}>
                    <i className="fa-solid fa-file-medical mr-2"></i>Ficha Evolutiva (SOAP)
                  </a>
                </li>
              </ul>
            </div>

            {/* CONTENIDO DE LA PESTAÑA 1: PROGRESO */}
            {activeTab === 'progreso' && (
              <div className="box p-5 animate__animated animate__fadeIn" style={styles.cardBlanca}>
                <div className="columns has-text-centered mb-4">
                  <div className="column" style={{ borderRight: '1px solid #e2e8f0' }}>
                    <p className="heading has-text-grey">Sesiones en Casa Realizadas</p>
                    <p className="title is-3">{currentPatient.metricasAcumuladas.sesionesRealizadas} / {currentPatient.metricasAcumuladas.sesionesTotales}</p>
                  </div>
                  <div className="column">
                    <p className="heading has-text-grey">Ejercicios Totales Completados</p>
                    <p className="title is-3" style={styles.textOcto}>{currentPatient.metricasAcumuladas.misionesCompletadas}</p>
                  </div>
                </div>

                <div className="p-4 mb-5" style={{ backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <label className="label is-small">Cumplimiento del Tratamiento Remoto ({currentPatient.adherencia}%)</label>
                  <progress className={`progress ${currentPatient.progColor} is-medium`} value={currentPatient.adherencia} max="100"></progress>
                  <p className="is-size-7 has-text-grey-dark mt-2"><i className="fa-solid fa-circle-info mr-1"></i> {currentPatient.subtexto}</p>
                </div>

                <h4 className="title is-5 mb-3" style={styles.textOcto}>Datos Clínicos Obtenidos del Dispositivo</h4>
                <div className="columns is-multiline">
                  <div className="column is-6">
                    <div className="p-3" style={{ borderLeft: '3px solid #2c7a7b', backgroundColor: '#f8fafc' }}>
                      <p className="is-size-7 has-text-grey">Tiempo de Reacción Promedio</p>
                      <p className="has-text-weight-bold">{currentPatient.analisisSensores.tiempoRespuesta}</p>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="p-3" style={{ borderLeft: '3px solid #2c7a7b', backgroundColor: '#f8fafc' }}>
                      <p className="is-size-7 has-text-grey">Fuerza/Precisión del Agarre</p>
                      <p className="has-text-weight-bold">{currentPatient.analisisSensores.precisionPresion}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CONTENIDO DE LA PESTAÑA 2: GESTIÓN DE TAREAS */}
            {activeTab === 'tareas' && (
              <div className="columns is-variable is-3 animate__animated animate__fadeIn">
                {/* Sub-columna: Ver Tareas Actuales */}
                <div className="column is-6">
                  <div className="box p-4" style={styles.cardBlanca}>
                    <h4 className="title is-5 mb-3" style={styles.textOcto}>Ejercicios Activos esta Semana</h4>
                    <p className="is-size-7 has-text-grey mb-4">Prende o apaga los estímulos que recibirá el dispositivo en la casa del paciente:</p>
                    
                    {['tactil', 'auditiva', 'motrizFina'].map((tipo) => (
                      <div key={tipo} className="p-3 mb-2 is-flex is-align-items-center is-justify-content-space-between" style={{ backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <div>
                          <input 
                            type="checkbox" 
                            className="mr-2"
                            checked={currentPatient.misionesSemanales[tipo]}
                            onChange={() => handleToggleMision(tipo)}
                          />
                          <span className="is-size-7 is-uppercase has-text-weight-bold">Estimulación {tipo === 'motrizFina' ? 'Motriz Fina' : tipo}</span>
                        </div>
                        <span className={`tag is-rounded is-small ${currentPatient.misionesSemanales[tipo] ? 'is-success is-light' : 'is-light'}`}>
                          {currentPatient.misionesSemanales[tipo] ? 'Activo' : 'Pausado'}
                        </span>
                      </div>
                    ))}

                    <button className="button is-small is-fullwidth is-dark mt-4" onClick={() => { setNotificacionMision(true); setTimeout(() => setNotificacionMision(false), 2500); }}>
                      <i className="fa-solid fa-sync mr-2"></i>Enviar Cambios al Dispositivo del Hogar
                    </button>
                    {notificacionMision && (
                      <div className="notification is-success is-light p-2 mt-2 is-size-7 has-text-centered">
                        ¡Configuración sincronizada inmediatamente!
                      </div>
                    )}
                  </div>
                </div>

                {/* Sub-columna: Formulario para Crear una Tarea Detallada */}
                <div className="column is-6">
                  <div className="box p-4" style={styles.cardBlanca}>
                    <h4 className="title is-5 mb-3" style={styles.textOcto}>Prescribir Tarea Detallada</h4>
                    <form onSubmit={handleCrearTarea}>
                      <div className="field">
                        <label className="label is-small">Nombre del Ejercicio</label>
                        <div className="control">
                          <input className="input is-small" type="text" placeholder="Ej: Presión rítmica de tentáculo" value={nuevaTarea.nombre} onChange={(e) => setNuevaTarea({...nuevaTarea, nombre: e.target.value})} required />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label is-small">Tipo de Estímulo</label>
                        <div className="control is-expanded">
                          <div className="select is-small is-fullwidth">
                            <select value={nuevaTarea.tipo} onChange={(e) => setNuevaTarea({...nuevaTarea, tipo: e.target.value})}>
                              <option value="tactil">Táctil (Presión/Textura)</option>
                              <option value="auditiva">Auditivo (Sonidos/Música)</option>
                              <option value="motrizFina">Coordinación Visomotriz</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label is-small">Instrucciones Clínicas para el Hogar</label>
                        <div className="control">
                          <textarea className="textarea is-small" rows="2" placeholder="Indicaciones para el tutor o metas de repeticiones..." value={nuevaTarea.descripcion} onChange={(e) => setNuevaTarea({...nuevaTarea, descripcion: e.target.value})} required></textarea>
                        </div>
                      </div>
                      <button type="submit" className="button is-small is-primary is-fullwidth font-weight-bold">
                        <i className="fa-solid fa-plus mr-2"></i>Asignar Tarea al Expediente
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* CONTENIDO DE LA PESTAÑA 3: FICHA EVO (SOAP) */}
            {activeTab === 'historial' && (
              <div className="box p-5 animate__animated animate__fadeIn" style={styles.cardBlanca}>
                <h4 className="title is-5 mb-2" style={styles.textOcto}>Redacción Automática de Reporte Evolutivo</h4>
                <p className="is-size-7 has-text-grey mb-4">Esta sección traduce de forma ordenada las notas subjetivas del tutor y los datos objetivos medidos por el hardware:</p>
                
                {!isReportGenerated ? (
                  <button className="button is-medium is-fullwidth is-primary is-light" onClick={() => setIsReportGenerated(true)}>
                    <strong><i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Generar Borrador de Ficha Clínica</strong>
                  </button>
                ) : (
                  <div className="p-4" style={{ backgroundColor: '#f8fafc', borderLeft: '4px solid #2c7a7b', borderRadius: '6px', border: '1px solid #e2e8f0', borderLeftColor: '#2c7a7b' }}>
                    <p className="has-text-weight-bold mb-3 is-size-7" style={{ color: '#2c7a7b' }}>[PROPUESTA DE REGISTRO CLÍNICO]</p>
                    <div className="is-size-7 has-text-grey-darker" style={{ lineHeight: '1.7' }}>
                      <p className="mb-2"><strong>Subjetivo (S):</strong> {currentPatient.soap.S}</p>
                      <p className="mb-2"><strong>Objetivo (O):</strong> {currentPatient.soap.O}</p>
                      <p className="mb-2"><strong>Análisis (A):</strong> {currentPatient.soap.A}</p>
                      <p className="mb-3"><strong>Plan de Tratamiento (P):</strong> {currentPatient.soap.P}</p>
                    </div>
                    <hr className="my-2" style={{ backgroundColor: '#e2e8f0', height: '1px' }} />
                    <div className="has-text-right">
                      <button className="button is-small is-danger is-light" onClick={() => setIsReportGenerated(false)}>Ocultar Borrador</button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div> {/* Column 9 End */}
        </div> {/* Columns Grid End */}
      </div>
    </div>
  );
}