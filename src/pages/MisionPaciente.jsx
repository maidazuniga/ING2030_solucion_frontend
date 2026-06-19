import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormularioSatisfaccion from '../components/FormularioSatisfaccion';

const HISTORIAL_STORAGE_KEY = 'eco-habito-historial-misiones';
const MIN_MISSION_DURATION_SECONDS = 40;
const MAX_MISSION_DURATION_SECONDS = 120;
const COUNTDOWN_START = 3;
const FLASH_DURATION_MS = 900;

const OCTOPUS_IMAGES = {
  base: '/pulpo/pulpo-base.png',
  contento: '/pulpo/pulpo-contento.png',
  texturas: '/pulpo/pulpo-texturas.png',
  antiEstres: '/pulpo/pulpo-pelota-anti-estres.png'
};

function formatDuration(seconds) {
  if (seconds > 60) {
    const minutes = Math.floor(seconds / 60);
    const extraSeconds = String(seconds % 60).padStart(2, '0');

    return `${minutes}:${extraSeconds} min`;
  }

  return `${seconds} segundos`;
}

function formatTimer(seconds) {
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    const extraSeconds = String(seconds % 60).padStart(2, '0');

    return `${minutes}:${extraSeconds} min`;
  }

  return `${seconds} s`;
}

function getRandomMissionDuration() {
  return Math.floor(
    Math.random() * (MAX_MISSION_DURATION_SECONDS - MIN_MISSION_DURATION_SECONDS + 1)
  ) + MIN_MISSION_DURATION_SECONDS;
}

function createMission(mission) {
  const durationSeconds = getRandomMissionDuration();
  const durationLabel = formatDuration(durationSeconds);

  return {
    ...mission,
    durationSeconds,
    title: `${mission.baseTitle} - ${durationLabel}`,
    instruction: `${mission.action} por ${durationLabel}.`
  };
}

function getOctopusState(phase, mission) {
  if (phase === 'flash') {
    return {
      src: OCTOPUS_IMAGES.contento,
      alt: 'Pulpo contento',
      message: '¡Lo lograste!'
    };
  }

  if (phase === 'running') {
    if (mission.id === 'gomosa') {
      return {
        src: OCTOPUS_IMAGES.antiEstres,
        alt: 'Pulpo pelota anti estrés',
        message: 'Pelota anti estrés'
      };
    }

    return {
      src: OCTOPUS_IMAGES.texturas,
      alt: 'Pulpo texturas',
      message: 'Texturas'
    };
  }

  if (phase === 'intro' || phase === 'countdown' || phase === 'between') {
    return {
      src: OCTOPUS_IMAGES.base,
      alt: 'Pulpo base',
      message: 'Tu próxima misión te espera'
    };
  }

  return null;
}

const missionBank = [
  {
    id: 'rugosa',
    baseTitle: 'Textura rugosa',
    action: 'Toca la textura rugosa',
    hint: 'Usa la yema de tus dedos y muévete despacito.',
    materials: ['Pelota rugosa', 'Cepillo de cerdas duras', 'Piedra texturizada'],
    icon: 'fa-hand-back-fist',
    accent: '#ff7b7b',
    soft: '#fff1f1'
  },
  {
    id: 'aspera',
    baseTitle: 'Textura áspera',
    action: 'Pasa tu mano por la textura áspera',
    hint: 'Siente cómo cambia la superficie con calma.',
    materials: ['Lija suave', 'Cartón corrugado', 'Tela áspera'],
    icon: 'fa-hippo',
    accent: '#f4a261',
    soft: '#fff4e8'
  },
  {
    id: 'lisa',
    baseTitle: 'Textura lisa',
    action: 'Desliza tus dedos sobre la textura lisa',
    hint: 'Busca una sensación suave y sin bultitos.',
    materials: ['Plancha lisa', 'Vaso plástico liso', 'Tarjeta laminada'],
    icon: 'fa-water',
    accent: '#4dabf7',
    soft: '#edf7ff'
  },
  {
    id: 'suave',
    baseTitle: 'Textura suave',
    action: 'Aprieta con cuidado la textura suave',
    hint: 'Hazlo como si estuvieras acariciando una nube.',
    materials: ['Peluche suave', 'Algodón', 'Tela de microfibra'],
    icon: 'fa-cloud',
    accent: '#7bdcb5',
    soft: '#effcf6'
  },
  {
    id: 'gomosa',
    baseTitle: 'Textura gomosa',
    action: 'Aprieta la textura gomosa sin hacer fuerza',
    hint: 'Siente cómo rebota y vuelve a su lugar.',
    materials: ['Pelota antiestrés', 'Goma elástica', 'Esponja blanda'],
    icon: 'fa-hand-sparkles',
    accent: '#8a6cff',
    soft: '#f3efff'
  }
];

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

function shuffleArray(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}

function loadHistory() {
  const stored = localStorage.getItem(HISTORIAL_STORAGE_KEY);

  if (stored) {
    return JSON.parse(stored);
  }

  localStorage.setItem(HISTORIAL_STORAGE_KEY, JSON.stringify(historialInicial));
  return historialInicial;
}

export default function MisionPaciente() {
  const navigate = useNavigate();
  const [missions] = useState(() => shuffleArray(missionBank.map(createMission)));
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [phase, setPhase] = useState('intro');
  const [countdown, setCountdown] = useState(COUNTDOWN_START);
  const [remainingSeconds, setRemainingSeconds] = useState(() => missions[0]?.durationSeconds ?? MIN_MISSION_DURATION_SECONDS);
  const [showSuccessFlash, setShowSuccessFlash] = useState(false);
  const [showFormulario, setShowFormulario] = useState(false);
  const [showFinalAction, setShowFinalAction] = useState(false);
  const [showEasterEggButton, setShowEasterEggButton] = useState(false);
  const pressedKeysRef = useRef(new Set());

  const currentMission = missions[currentMissionIndex];
  const isLastMission = currentMissionIndex === missions.length - 1;
  const missionProgress = Math.round(((currentMission.durationSeconds - remainingSeconds) / currentMission.durationSeconds) * 100);
  const currentMissionMaterials = currentMission.materials ?? [];
  const octopusState = getOctopusState(phase, currentMission);

  const styles = {
    bgMint: { backgroundColor: '#eefcf7' },
    textOcto: { color: '#2c7a7b' },
    cardOcto: { border: '3px solid #deff9a', borderRadius: '24px' }
  };

  useEffect(() => {
    if (phase !== 'countdown') {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setCountdown((value) => {
        if (value <= 1) {
          window.clearInterval(intervalId);
          setPhase('running');
          setRemainingSeconds(currentMission.durationSeconds);
          return COUNTDOWN_START;
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [phase, currentMissionIndex, currentMission.durationSeconds]);

  useEffect(() => {
    if (phase !== 'running') {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setRemainingSeconds((value) => {
        if (value <= 1) {
          window.clearInterval(intervalId);
          setPhase('flash');
          setShowSuccessFlash(true);
          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [phase, currentMissionIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (phase !== 'running') {
        return;
      }

      const key = event.key.toLowerCase();

      if (key !== 'o' && key !== 'p') {
        return;
      }

      pressedKeysRef.current.add(key);

      if (pressedKeysRef.current.has('o') && pressedKeysRef.current.has('p')) {
        setShowEasterEggButton(true);
      }
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();

      if (key === 'o' || key === 'p') {
        pressedKeysRef.current.delete(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'flash') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShowSuccessFlash(false);
      setShowEasterEggButton(false);

      if (isLastMission) {
        setPhase('final');
        setShowFinalAction(true);
      } else {
        setCurrentMissionIndex((value) => value + 1);
        setPhase('between');
      }
    }, FLASH_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase, isLastMission]);

  const startMission = () => {
    setCountdown(COUNTDOWN_START);
    setShowEasterEggButton(false);
    setShowFinalAction(false);
    setPhase('countdown');
  };

  const handleSurveySubmit = (surveyData) => {
    const existingHistory = loadHistory();
    const newRecord = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      satisfaccion: surveyData.satisfaccion,
      dificultad: surveyData.dificultad,
      tiempo: surveyData.tiempo,
      notas: `Completó ${missions.length} misiones táctiles en casa.`,
      misiones: missions.map((mission) => mission.title)
    };

    const updatedHistory = [newRecord, ...existingHistory];
    localStorage.setItem(HISTORIAL_STORAGE_KEY, JSON.stringify(updatedHistory));
    setShowFormulario(false);
    setShowFinalAction(false);
    navigate('/vista-pacientes/historial', { replace: true });
  };

  const handleContinueMission = () => {
    setCountdown(COUNTDOWN_START);
    setShowEasterEggButton(false);
    setShowFinalAction(false);
    setPhase('countdown');
  };

  const handleFinishMission = () => {
    setShowFormulario(true);
  };

  const handleEasterEggClick = () => {
    setRemainingSeconds(5);
    setShowEasterEggButton(false);
  };

  const currentMissionLabel = `Misión ${currentMissionIndex + 1} de ${missions.length}`;

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
              <span className="tag is-rounded is-medium is-dark">Misiones táctiles en casa</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="hero-body pt-4">
        <div className="container">
          <div className="level mb-4">
            <div className="level-left">
              <div className="level-item">
                <Link to="/vista-pacientes" className="button is-light is-rounded">
                  Volver al inicio
                </Link>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <span className="tag is-info is-light is-medium">{currentMissionLabel}</span>
              </div>
            </div>
          </div>

          <div className="columns is-centered">
            <div className="column is-10">
              <div className="box p-6" style={styles.cardOcto}>
                <div className="columns is-vcentered">
                  <div className="column is-5">
                    <div
                      className="box has-text-centered"
                      style={{
                        borderRadius: '22px',
                        background: currentMission.soft,
                        border: `3px solid ${currentMission.accent}`
                      }}
                    >
                      {octopusState && (
                        <div className="mb-4">
                          <figure className="image mx-auto" style={{ maxWidth: '240px' }}>
                            <img src={octopusState.src} alt={octopusState.alt} />
                          </figure>
                          <div className="mt-3">
                            <span className="tag is-rounded is-white is-medium has-text-weight-semibold">
                              {octopusState.message}
                            </span>
                          </div>
                        </div>
                      )}

                      <p className="is-size-4 mb-3 has-text-weight-semibold" style={styles.textOcto}>
                        Materiales necesarios
                      </p>
                      <div className="content has-text-left is-size-5">
                        <ul className="mb-0">
                          {currentMissionMaterials.map((material) => (
                            <li key={material}>{material}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="tags is-centered mt-4">
                        <span className="tag is-rounded is-white">{currentMissionLabel}</span>
                        <span className="tag is-rounded is-white">{formatDuration(currentMission.durationSeconds)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="column is-7">
                    {phase === 'intro' && (
                      <div className="has-text-centered">
                        <h1 className="title is-2 mb-3" style={styles.textOcto}>{currentMission.instruction}</h1>
                        <p className="is-size-5 mb-5">Presiona comenzar y Octo te va a guiar paso a paso.</p>
                        <button className="button is-success is-large is-rounded" onClick={startMission}>
                          <strong>Comenzar misión</strong>
                        </button>
                      </div>
                    )}

                    {phase === 'countdown' && (
                      <div className="has-text-centered">
                        <p className="is-size-4 mb-4" style={styles.textOcto}>{currentMission.instruction}</p>
                        <div
                          className="box mx-auto mb-4"
                          style={{
                            width: '180px',
                            height: '180px',
                            borderRadius: '50%',
                            background: currentMission.soft,
                            border: `6px solid ${currentMission.accent}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <p className="title is-1 mb-0" style={{ color: currentMission.accent }}>{countdown}</p>
                        </div>
                        <p className="subtitle is-5">¡Preparate, empieza en un momento!</p>
                      </div>
                    )}

                    {phase === 'running' && (
                      <div className="has-text-centered">
                        <p className="tag is-success is-light is-large mb-4">¡Ya estás jugando!</p>
                        <h1 className="title is-3 mb-4" style={styles.textOcto}>{currentMission.instruction}</h1>
                        <div className="box p-5" style={{ borderRadius: '22px', border: '3px solid #d6f5e8' }}>
                          <p className="is-size-4 mb-2">Tiempo restante</p>
                          <p className="title is-1 mb-3" style={styles.textOcto}>{formatTimer(remainingSeconds)}</p>
                          <progress className="progress is-success is-large" value={missionProgress} max="100">{missionProgress}%</progress>
                        </div>
                        {showEasterEggButton && (
                          <button className="button is-warning is-light is-small mt-3" onClick={handleEasterEggClick}>
                            Activar ayuda secreta
                          </button>
                        )}
                      </div>
                    )}

                    {phase === 'between' && (
                      <div className="has-text-centered">
                        <h2 className="title is-2 mb-3" style={styles.textOcto}>{currentMission.title}</h2>
                        <p className="subtitle is-4 mb-3">{currentMission.instruction}</p>
                        <p className="is-size-5 mb-5">
                          {isLastMission ? 'Esta es la última misión. Cuando quieras, presiona comenzar misión.' : 'Ya terminaste esta misión. Vamos con la siguiente.'}
                        </p>
                        <button className="button is-primary is-large is-rounded" onClick={handleContinueMission}>
                          <strong>{isLastMission ? 'Comenzar misión' : 'Continuar con la siguiente misión'}</strong>
                        </button>
                      </div>
                    )}

                    {phase === 'final' && (
                      <div className="has-text-centered">
                        <span className="icon is-large mb-4">
                          <i className="fa-solid fa-trophy fa-4x has-text-warning"></i>
                        </span>
                        <h2 className="title is-2 mb-3">¡Terminaste todas las misiones!</h2>
                        <p className="subtitle is-4">Ahora cuéntanos cómo te sentiste.</p>
                        {showFinalAction && (
                          <button className="button is-success is-large is-rounded mt-4" onClick={handleFinishMission}>
                            <strong>Finalizar misión</strong>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccessFlash && (
        <div
          className="is-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background: '#48c78e',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="has-text-centered has-text-white">
            <figure className="image mx-auto mb-3" style={{ maxWidth: '260px' }}>
              <img src={OCTOPUS_IMAGES.contento} alt="Pulpo contento" />
            </figure>
            <p className="title is-2 has-text-white">¡Lo lograste!</p>
          </div>
        </div>
      )}

      <FormularioSatisfaccion
        isActive={showFormulario}
        onClose={() => setShowFormulario(false)}
        onSubmit={handleSurveySubmit}
      />

      <footer className="footer py-4 has-background-white text-center mt-auto" style={{ borderTop: '1px solid #e2e8f0' }}>
        <div className="content has-text-centered">
          <p className="is-size-7 text-muted">
            <strong>Eco-Hábito SaaS Clínico & IoT</strong> — Módulo de entrenamiento táctil guiado para casa.
          </p>
        </div>
      </footer>
    </div>
  );
}
