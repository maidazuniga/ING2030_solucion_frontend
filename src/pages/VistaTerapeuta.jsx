import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación

export default function VistaTerapeuta() {
  // Base de datos integrada con análisis cuantitativo e histórico (Sesiones y Misiones)
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
      subtexto: 'Completó exitosamente los patrones de presión física semanales.',
      misionesSemanales: { tactil: true, auditiva: true, motrizFina: false },
      // NUEVAS MÉTRICAS HISTÓRICAS SOLICITADAS
      metricasAcumuladas: {
        sesionesRealizadas: 14,
        sesionesTotales: 16,
        misionesCompletadas: 42
      },
      analisisIoT: {
        tiempoRespuesta: '1.4 segundos',
        precisionPresion: '94%',
        intentosFallidos: '2 de 30',
        patronDominante: 'Presión palmar constante'
      },
      soap: {
        S: 'El paciente reporta alta motivación en casa mediante el avatar interactivo Octo.',
        O: 'Telemetría registra 92% de ejecución en patrones de presión sensorial.',
        A: 'Se evidencia una reducción drástica en la curva de fatigue táctil remota.',
        P: 'Continuar con el plan asincrónico. Incrementar nivel de resistencia en el tentáculo 3.'
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
      subtexto: 'Desconexión prematura del hardware interactivo dentro del primer minuto de uso.',
      misionesSemanales: { tactil: true, auditiva: false, motrizFina: false },
      // NUEVAS MÉTRICAS HISTÓRICAS SOLICITADAS
      metricasAcumuladas: {
        sesionesRealizadas: 6,
        sesionesTotales: 14,
        misionesCompletadas: 18
      },
      analisisIoT: {
        tiempoRespuesta: '4.8 segundos (Retraso por evitación)',
        precisionPresion: '51%',
        intentosFallidos: '14 de 20 (Abandono)',
        patronDominante: 'Gatillo de hipersensibilidad acústica'
      },
      soap: {
        S: 'La madre reporta que la paciente se frustra con las alertas acústicas agudas entre terapias.',
        O: 'Adherencia del 45% en las últimas dos semanas. Desconexión recurrent del módulo IoT.',
        A: 'La baja adherencia responde a una sobrecarga del estímulo auditivo remoto.',
        P: 'Bajar volumen del dispositivo al 20%. Configurar software a modo puramente visual.'
      }
    },
    {
      id: 3,
      nombre: 'Ignacio Rojas',
      edad: '5 años',
      tutor: 'Elena Espinoza (Abuela)',
      proximoControl: '02 de Julio, 2026',
      adherencia: 78,
      estado: 'En Progreso',
      tagColor: 'is-warning',
      progColor: 'is-warning',
      diagnostico: 'Retraso Psicomotor & Dispraxia Pediátrica',
      subtexto: 'Curva de aprendizaje estable. Interacción autónoma y rítmica en el hogar.',
      misionesSemanales: { tactil: true, auditiva: true, motrizFina: true },
      // NUEVAS MÉTRICAS HISTÓRICAS SOLICITADAS
      metricasAcumuladas: {
        sesionesRealizadas: 11,
        sesionesTotales: 12,
        misionesCompletadas: 33
      },
      analisisIoT: {
        tiempoRespuesta: '2.1 segundos',
        precisionPresion: '81%',
        intentosFallidos: '5 de 25',
        patronDominante: 'Coordinación visomotriz fina rítmica'
      },
      soap: {
        S: 'El usuario interactúa de forma autónoma con el sistema físico, requiriendo mínima asistencia.',
        O: 'Tasa de cumplimiento del 78%. Progreso lineal en coordinación visomotriz.',
        A: 'Evolución favorable en la planificación motriz fina gracias al feedback inmediato.',
        P: 'Mantener rutina actual de 3 misiones semanales. Evaluar paso a actividades de cruce.'
      }
    }
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [notificacionMision, setNotificacionMision] = useState(false);

  const currentPatient = pacientesData.find(p => p.id === selectedId);

  const styles = {
    bgCream: { backgroundColor: '#fcfbf9', minHeight: '100vh', color: '#2d3748' },
    textOcto: { color: '#2c7a7b' },
    cardBlanca: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }
  };

  const handleToggleMision = (tipo) => {
    setPacientesData(prev => prev.map(p => {
      if (p.id === selectedId) {
        return { ...p, misionesSemanales: { ...p.misionesSemanales, [tipo]: !p.misionesSemanales[tipo] } };
      }
      return p;
    }));
  };

  return (
    <div style={styles.bgCream} className="py-5 px-5">
      <div className="container is-fluid">
        
        {/* ENCABEZADO INSTITUCIONAL - CON BOTÓN DE VOLVER INTEGRADO */}
        <div className="columns is-vcentered mb-5 pb-4" style={{ borderBottom: '2px solid #e2e8f0' }}>
          <div className="column">
            <div className="is-flex is-align-items-center">
              <h1 className="title is-3 mb-0 mr-4" style={styles.textOcto}>
                <i className="fa-solid fa-octopus-deploy mr-2"></i>Eco-Hábito SaaS Clínico
              </h1>
              {/* BOTÓN OBLIGATORIO VOLVER AL INICIO */}
              <Link to="/" className="button is-small is-light is-rounded font-weight-bold" style={{ border: '1px solid #2c7a7b', color: '#2c7a7b' }}>
                <i className="fa-solid fa-arrow-left mr-2"></i> Volver al Inicio
              </Link>
            </div>
            <p className="subtitle is-6 has-text-grey-dark mt-2">Monitoreo de Telemetría e Intervención en el Espacio Entre Terapias</p>
          </div>
          <div className="column has-text-right">
            <span className="tag is-dark is-medium">Consola del Especialista</span>
          </div>
        </div>

        {/* REJILLA PRINCIPAL DEL DASHBOARD */}
        <div className="columns is-variable is-3">
          
          {/* PANEL IZQUIERDO: SELECCIÓN */}
          <div className="column is-3">
            <div className="box" style={styles.cardBlanca}>
              <h3 className="title is-5 mb-4" style={styles.textOcto}>
                <i className="fa-solid fa-users-viewfinder mr-2"></i>Cohorte Activa
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
                          setNotificacionMision(false);
                        }}
                      >
                        <div className="is-flex is-justify-content-space-between is-align-items-center">
                          <strong>{p.nombre}</strong>
                          <span className={`tag ${p.tagColor} is-light`}>{p.adherencia}%</span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* MINI PERFIL DEL NIÑO */}
            <div className="box mt-4" style={styles.cardBlanca}>
              <h3 className="title is-6 mb-3 uppercase tracking-wider has-text-grey">Identificación Médica</h3>
              <div className="is-flex is-align-items-center mb-3">
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e6fffa', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="mr-3">
                  <i className="fa-solid fa-child-reaching" style={styles.textOcto}></i>
                </div>
                <div>
                  <h4 className="title is-6 mb-0 has-text-black">{currentPatient.nombre}</h4>
                  <p className="is-size-7 has-text-grey-dark">Edad: {currentPatient.edad}</p>
                </div>
              </div>
              <div className="is-size-7 has-text-grey-dark" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                <p className="mb-1"><strong>Tutor:</strong> {currentPatient.tutor}</p>
                <p><strong>Control Presencial:</strong> {currentPatient.proximoControl}</p>
              </div>
            </div>
          </div>

          {/* PANEL CENTRAL: TELEMETRÍA, MÉTRICAS Y ANÁLISIS */}
          <div className="column is-5">
            <div className="box p-5" style={styles.cardBlanca} key={currentPatient.id}>
              
              <div className="level mb-3">
                <div className="level-left">
                  <h3 className="title is-4" style={styles.textOcto}>Seguimiento de Adherencia</h3>
                </div>
                <div className="level-right">
                  <span className={`tag ${currentPatient.tagColor} font-weight-bold`}>{currentPatient.estado}</span>
                </div>
              </div>

              {/* NUEVO BLOQUE: MÉTRICAS HISTÓRICAS (SESIONES Y MISIONES ACUMULADAS) */}
              <div className="columns is-mobile mb-3 has-text-centered">
                <div className="column" style={{ borderRight: '1px solid #e2e8f0' }}>
                  <p className="heading has-text-grey mb-1">Sesiones Completadas</p>
                  <p className="title is-4 has-text-dark">
                    {currentPatient.metricasAcumuladas.sesionesRealizadas} <span className="is-size-6 has-text-grey">/ {currentPatient.metricasAcumuladas.sesionesTotales}</span>
                  </p>
                </div>
                <div className="column">
                  <p className="heading has-text-grey mb-1">Misiones Totales Hechas</p>
                  <p className="title is-4" style={styles.textOcto}>
                    <i className="fa-solid fa-trophy mr-1 is-size-5"></i>{currentPatient.metricasAcumuladas.misionesCompletadas}
                  </p>
                </div>
              </div>

              <div className="p-4 mb-4" style={{ backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div className="is-flex is-justify-content-space-between mb-1">
                  <span className="is-size-7 has-text-weight-bold">Tasa de Ejecución Asincrónica</span>
                  <span className="is-size-7 has-text-weight-bold has-text-dark">{currentPatient.adherencia}%</span>
                </div>
                <progress className={`progress ${currentPatient.progColor} is-medium mb-2`} value={currentPatient.adherencia} max="100"></progress>
                <p className="is-size-7 has-text-grey-dark"><i className="fa-solid fa-chart-line mr-1"></i> {currentPatient.subtexto}</p>
              </div>

              {/* ANÁLISIS CUANTITATIVO IOT */}
              <div className="block mt-4">
                <h4 className="title is-5 mb-3" style={styles.textOcto}>
                  <i className="fa-solid fa-gauge-high mr-2"></i>Análisis Cuantitativo de Misiones (IoT)
                </h4>
                <div className="columns is-multiline is-mobile">
                  <div className="column is-6">
                    <div className="p-2" style={{ borderLeft: '3px solid #4a5568', backgroundColor: '#f8fafc' }}>
                      <p className="is-size-7 has-text-grey mb-0">Latencia de Respuesta</p>
                      <p className="is-size-6 has-text-weight-bold">{currentPatient.analisisIoT.tiempoRespuesta}</p>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="p-2" style={{ borderLeft: '3px solid #4a5568', backgroundColor: '#f8fafc' }}>
                      <p className="is-size-7 has-text-grey mb-0">Precisión de Presión</p>
                      <p className="is-size-6 has-text-weight-bold">{currentPatient.analisisIoT.precisionPresion}</p>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="p-2" style={{ borderLeft: '3px solid #4a5568', backgroundColor: '#f8fafc' }}>
                      <p className="is-size-7 has-text-grey mb-0">Errores/Omisiones</p>
                      <p className="is-size-6 has-text-weight-bold">{currentPatient.analisisIoT.intentosFallidos}</p>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="p-2" style={{ borderLeft: '3px solid #4a5568', backgroundColor: '#f8fafc' }}>
                      <p className="is-size-7 has-text-grey mb-0">Patrón Clínico Dominante</p>
                      <p className="is-size-7 has-text-weight-bold" style={styles.textOcto}>{currentPatient.analisisIoT.patronDominante}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Automatización SOAP con Contraste Corregido */}
              <div className="block mt-4" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '15px' }}>
                <h4 className="title is-6 mb-2" style={styles.textOcto}>
                  <i className="fa-solid fa-wand-magic-sparkles mr-2"></i>Generación de Ficha Evolutiva SOAP Automática
                </h4>
                {!isReportGenerated ? (
                  <button className="button is-small is-fullwidth is-primary is-light" onClick={() => setIsReportGenerated(true)}>
                    <strong>Redactar Ficha con IA de Telemetría</strong>
                  </button>
                ) : (
                  <div className="p-4 animate__animated animate__fadeIn" style={{ backgroundColor: '#f8fafc', borderLeft: '4px solid #2c7a7b', borderRadius: '6px', border: '1px solid #e2e8f0', borderLeftColor: '#2c7a7b' }}>
                    <p className="has-text-weight-bold mb-3 is-size-7" style={{ color: '#2c7a7b' }}>[MÓDULO IA AUTOMÁTICO - TELEMETRÍA PROCESADA]</p>
                    
                    <div className="is-size-7 has-text-grey-darker" style={{ lineHeight: '1.6' }}>
                      <p className="mb-2">
                        <strong style={{ color: '#2c7a7b', marginRight: '6px', fontSize: '14px' }}>S:</strong> 
                        {currentPatient.soap.S}
                      </p>
                      <p className="mb-2">
                        <strong style={{ color: '#2c7a7b', marginRight: '6px', fontSize: '14px' }}>O:</strong> 
                        {currentPatient.soap.O}
                      </p>
                      <p className="mb-2">
                        <strong style={{ color: '#2c7a7b', marginRight: '6px', fontSize: '14px' }}>A:</strong> 
                        {currentPatient.soap.A}
                      </p>
                      <p className="mb-3">
                        <strong style={{ color: '#2c7a7b', marginRight: '6px', fontSize: '14px' }}>P:</strong> 
                        {currentPatient.soap.P}
                      </p>
                    </div>

                    <hr className="my-2" style={{ backgroundColor: '#e2e8f0', height: '1px' }} />
                    <div className="has-text-right">
                      <button className="button is-small is-danger is-light px-4" onClick={() => setIsReportGenerated(false)}>
                        <strong>Ocultar Reporte</strong>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* PANEL DERECHO: CONFIGURACIÓN REMOTA Y VALIDACIÓN */}
          <div className="column is-4">
            
            <div className="box p-4 mb-4" style={styles.cardBlanca}>
              <h3 className="title is-5 mb-2" style={styles.textOcto}>
                <i className="fa-solid fa-sliders mr-2"></i>Prescripción Remota IoT
              </h3>
              <p className="is-size-7 has-text-grey-dark mb-3">Modifica la carga de estímulos que recibirá el hardware en el hogar:</p>

              {['tactil', 'auditiva', 'motrizFina'].map((tipo) => (
                <div key={tipo} className="field p-2 mb-2" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                  <label className="checkbox is-size-7 is-flex is-align-items-center is-justify-content-space-between">
                    <div>
                      <input 
                        type="checkbox" 
                        className="mr-2"
                        checked={currentPatient.misionesSemanales[tipo]}
                        onChange={() => handleToggleMision(tipo)}
                      />
                      <span className="is-capitalize">Misión: {tipo === 'motrizFina' ? 'Coordinación Fina' : tipo}</span>
                    </div>
                    <span className={`tag is-rounded is-small ${currentPatient.misionesSemanales[tipo] ? 'is-success is-light' : 'is-light'}`}>
                      {currentPatient.misionesSemanales[tipo] ? 'Activo' : 'Pausado'}
                    </span>
                  </label>
                </div>
              ))}

              <button className="button is-small is-fullwidth is-dark mt-3" onClick={() => { setNotificacionMision(true); setTimeout(() => setNotificacionMision(false), 2500); }}>
                <i className="fa-solid fa-cloud-arrow-up mr-2"></i>Sincronizar Dispositivo Físico
              </button>

              {notificacionMision && (
                <div className="notification is-success is-light p-2 mt-2 is-size-7 has-text-centered animate__animated animate__fadeIn">
                  ¡Misiones enviadas al hardware del paciente!
                </div>
              )}
            </div>

            <div className="box p-4" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px' }}>
              <h4 className="title is-6 mb-2 has-text-info-dark">
                <i className="fa-solid fa-circle-check mr-2"></i>Validación y Valor del Producto (B2B)
              </h4>
              <div className="content is-size-7 has-text-grey-dark">
                <ul>
                  <li><strong>Espacios entre Terapias:</strong> Resuelve la pérdida de continuidad del tratamiento kinésico/ocupacional en el hogar.</li>
                  <li><strong>Validación con Stakeholders:</strong> El flujo mitiga la fricción administrativa detectada en las 10 entrevistas del protocolo de salida.</li>
                  <li><strong>Arquitectura Cloud SaaS:</strong> Telemetría directa desde hardware dedicado conectado vía MQTT/Nube al expediente clínico.</li>
                </ul>
              </div>
            </div>

          </div> {/* Column End */}
        </div> {/* Columns Grid End */}
      </div> {/* Container End */}
    </div>
  );
}