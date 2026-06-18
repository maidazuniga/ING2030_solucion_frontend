import React, { useState } from 'react';

export default function FormularioSatisfaccion({ isActive, onClose, onSubmit }) {
  const [satisfaccion, setSatisfaccion] = useState(5);
  const [dificultad, setDificultad] = useState('media');
  const [tiempo, setTiempo] = useState('5-10');

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    const datos = {
      satisfaccion,
      dificultad,
      tiempo
    };
    onSubmit(datos);
    // Resetear valores
    setSatisfaccion(5);
    setDificultad('media');
    setTiempo('5-10');
  };

  // Función para obtener el emoji y color según el nivel de satisfacción
  const getEmojiAndColor = (num) => {
    if (num === 1) return { emoji: '😢', color: '#ff3860' };
    if (num <= 3) return { emoji: '😞', color: '#ff6b6b' };
    if (num <= 5) return { emoji: '😐', color: '#ffdd57' };
    if (num <= 7) return { emoji: '🙂', color: '#48c78e' };
    if (num <= 9) return { emoji: '😊', color: '#30c57c' };
    return { emoji: '😄', color: '#00d1b2' };
  };

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      {/* Fondo oscuro del modal */}
      <div className="modal-background" onClick={onClose}></div>

      {/* Contenido del modal */}
      <div className="modal-content">
        <div className="box p-6" style={{ borderRadius: '24px', border: '3px solid #deff9a' }}>
          {/* Encabezado */}
          <div className="level mb-5">
            <div className="level-left">
              <div className="level-item">
                <h2 className="title is-3" style={{ color: '#2c7a7b' }}>
                  <i className="fa-solid fa-heart mr-2"></i>¿Cómo te sentiste?
                </h2>
              </div>
            </div>
            <div className="level-right">
              <button className="delete" onClick={onClose}></button>
            </div>
          </div>

          {/* Sección de Satisfacción */}
          <div className="mb-6">
            <p className="is-size-5 mb-3" style={{ color: '#2c7a7b', fontWeight: 'bold' }}>
              Mi nivel de satisfacción: <span className="is-size-3 ml-2">{getEmojiAndColor(satisfaccion).emoji}</span>
            </p>
            
            {/* Barra de satisfacción con 10 cuadrados */}
            <div className="columns is-multiline is-mobile">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                const { emoji, color } = getEmojiAndColor(num);
                return (
                  <div className="column is-2-mobile is-1-tablet is-1-desktop" key={num}>
                    <button
                      className="button is-large is-fullwidth"
                      style={{
                        backgroundColor: satisfaccion >= num ? color : '#f5f5f5',
                        border: `3px solid ${satisfaccion === num ? color : '#ddd'}`,
                        borderRadius: '12px',
                        padding: '16px',
                        cursor: 'pointer',
                        fontSize: '24px',
                        transition: 'all 0.2s ease',
                        transform: satisfaccion === num ? 'scale(1.1)' : 'scale(1)'
                      }}
                      onClick={() => setSatisfaccion(num)}
                      title={`Satisfacción: ${num}/10`}
                    >
                      {emoji}
                    </button>
                  </div>
                );
              })}
            </div>
            
            {/* Indicador numérico */}
            <p className="is-size-6 has-text-grey mt-3">
              <strong>{satisfaccion}/10</strong> — {
                satisfaccion <= 3 ? 'No me gustó mucho 😞' :
                satisfaccion <= 5 ? 'Estuvo bien 😐' :
                satisfaccion <= 7 ? '¡Me gustó! 🙂' :
                '¡Me encantó! 😄'
              }
            </p>
          </div>

          {/* Separador */}
          <hr className="my-5" />

          {/* Sección de Dificultad */}
          <div className="mb-6">
            <p className="is-size-5 mb-3" style={{ color: '#2c7a7b', fontWeight: 'bold' }}>
              <i className="fa-solid fa-fire mr-2"></i>¿Qué tan difícil fue?
            </p>
            
            <div className="columns is-mobile">
              {[
                { value: 'facil', label: 'Fácil 😄', icon: 'fa-face-grin' },
                { value: 'media', label: 'Normal 😐', icon: 'fa-face-meh' },
                { value: 'dificil', label: 'Difícil 😤', icon: 'fa-face-tired' }
              ].map((opcion) => (
                <div className="column is-4" key={opcion.value}>
                  <button
                    className={`button is-fullwidth is-large ${dificultad === opcion.value ? 'is-success' : 'is-light'}`}
                    style={{
                      borderRadius: '16px',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                    onClick={() => setDificultad(opcion.value)}
                  >
                    <span className="icon mr-1">
                      <i className={`fa-solid ${opcion.icon}`}></i>
                    </span>
                    <span>{opcion.label}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Separador */}
          <hr className="my-5" />

          {/* Sección de Tiempo */}
          <div className="mb-6">
            <p className="is-size-5 mb-3" style={{ color: '#2c7a7b', fontWeight: 'bold' }}>
              <i className="fa-solid fa-hourglass-end mr-2"></i>¿Cuánto tiempo te tomó?
            </p>
            
            <div className="columns is-mobile">
              {[
                { value: '0-5', label: '0-5 min ⚡' },
                { value: '5-10', label: '5-10 min 🚀' },
                { value: '10-15', label: '10-15 min 🐢' },
                { value: '15+', label: '15+ min 🌙' }
              ].map((opcion) => (
                <div className="column is-6-mobile is-3-tablet is-3-desktop" key={opcion.value}>
                  <button
                    className={`button is-fullwidth is-large ${tiempo === opcion.value ? 'is-info' : 'is-light'}`}
                    style={{
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                    onClick={() => setTiempo(opcion.value)}
                  >
                    {opcion.label}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="level mt-6">
            <div className="level-left">
              <div className="level-item">
                <button className="button is-light is-large" onClick={onClose}>
                  <strong>Cancelar</strong>
                </button>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <button 
                  className="button is-success is-large" 
                  onClick={handleSubmit}
                  style={{ borderRadius: '16px' }}
                >
                  <span className="icon mr-2">
                    <i className="fa-solid fa-check"></i>
                  </span>
                  <strong>¡Listo! Enviar</strong>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
