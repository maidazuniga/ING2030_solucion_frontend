import { useState } from "react";
import { mockPatients } from "../data/patients";
import "../assets/styles/patients.css";

export default function Patients() {
  const [patients, setPatients] = useState(mockPatients);
  const [filter, setFilter] = useState("all");
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  
  // ESTADOS PARA EL MODAL DE CREACIÓN 
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    condition: "",
  });

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  // FUNCIONES DEL MODAL
  const openCreateModal = () => setIsCreateModalActive(true);
  const closeCreateModal = () => {
    setIsCreateModalActive(false);
    setNewPatient({ name: "", age: "", condition: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleCreatePatient = (e) => {
    e.preventDefault();
    const patientToAdd = {
      id: Date.now(),
      name: newPatient.name,
      age: parseInt(newPatient.age),
      condition: newPatient.condition,
      active: true,
      lastVisit: new Date().toISOString().split('T')[0],
      activities: [],
      weeklyStats: { completed: 0, goal: 3, days: [false, false, false, false, false, false, false] }
    };

    setPatients(prev => [patientToAdd, ...prev]);
    closeCreateModal();
  };

  const toggleStatus = (id) => {
    setPatients(prev => prev.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  const filteredPatients = patients.filter((p) => {
    if (filter === "active") return p.active === true;
    if (filter === "inactive") return p.active === false;
    return true;
  });

  return (
    <section className="landing-pacientes section">
      <div className="level mb-5">
        <div className="level-left">
          <div className="level-item">
            <div>
              <h1 className="title is-3">
                {selectedPatient ? 'Detalle del Paciente' : 'Listado de Pacientes'}
              </h1>
              <p className="subtitle is-6 has-text-grey-darker">
                {selectedPatient ? `Viendo perfil de ${selectedPatient.name}` : `Total: ${filteredPatients.length} registros`}
              </p>
            </div>
          </div>
        </div>
        
        <div className="level-right">
          {!selectedPatient ? (
            <div className="level-item">
              <div className="buttons has-addons">
                <button className={`button is-small ${filter === 'all' ? 'is-link is-selected' : ''}`} onClick={() => setFilter('all')}>
                  Todos
                </button>
                <button className={`button is-small ${filter === 'active' ? 'is-success is-selected' : ''}`} onClick={() => setFilter('active')}>
                  Activos
                </button>
                <button className={`button is-small ${filter === 'inactive' ? 'is-danger is-selected' : ''}`} onClick={() => setFilter('inactive')}>
                  Inactivos
                </button>
              </div>
            </div>
          ) : (
            <div className="level-item">
              <button className="button is-light is-rounded" onClick={() => setSelectedPatientId(null)}>
                <strong>← Volver al listado</strong>
              </button>
            </div>
          )}
        </div>
      </div>

      <hr />

      {selectedPatient ? (
        /* INFORMACIÓN DEL PACIENTE */
        <div className="box-info box p-6 ficha-detalle">
          <div className="columns">
            <div className="column is-three-quarters">
              <h2 className="title is-2 mb-2">{selectedPatient.name}</h2>
              <div className="tags mb-5">
                <span className="heading has-text-grey-darker">Edad: {selectedPatient.age} años</span>
              </div>
            </div>

            <div className="column is-4 has-text-centered">
              <button 
                className={`cambio-estado tag is-medium ${selectedPatient.active ? 'is-success' : 'is-danger'} is-light`}
                onClick={() => toggleStatus(selectedPatient.id)}
                title="Haz clic para cambiar estado"
              >
                {selectedPatient.active ? 'Paciente Activo' : 'Paciente Inactivo'}
              </button>
            </div>
          </div>

          <div className="message is-info is-light">
            <div className="message-header">
              <p>Observaciones</p>
            </div>
            <div className="message-body condition">
              {selectedPatient.condition}
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <p className="heading has-text-grey-darker mb-3">Actividades</p>
              <div className="columns is-multiline">
                {selectedPatient.activities && selectedPatient.activities.length > 0 ? (
                  selectedPatient.activities.map((activity, index) => (
                    <div key={index} className="column is-6">
                      <div className="video-card">
                        <div className="video-icon">▶</div>
                        <div>
                          <p className="is-size-7 has-text-weight-bold">{activity.title}</p>
                          <p className="is-size-7 has-text-grey">{activity.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="column is-12">
                    <p className="is-size-7 has-text-grey italic">No hay actividades registradas</p>
                  </div>
                )}
              </div>
            </div>

            <div className="column">
              <p className="heading has-text-grey-darker mb-3">Actividad Semanal</p>
              <div className="stats-container">
                <div className="mb-4">
                  <div className="level is-mobile mb-2">
                    <div className="level-left">
                      <p className="is-size-7 has-text-weight-bold">Progreso de objetivos</p>
                    </div>
                    <div className="level-right">
                      <p className="is-size-7">{selectedPatient.weeklyStats?.completed || 0}/{selectedPatient.weeklyStats?.goal || 3} sesiones</p>
                    </div>
                  </div>
                  <progress 
                    className="progress is-link is-small" 
                    value={selectedPatient.weeklyStats?.completed || 0} 
                    max={selectedPatient.weeklyStats?.goal || 3}
                  >
                  </progress>
                </div>

                <div>
                  <p className="is-size-7 has-text-weight-bold mb-2">Registro diario (Últimos 7 días)</p>
                  <div className="is-flex">
                    {selectedPatient.weeklyStats?.days.map((active, i) => (
                      <div key={i} className="has-text-centered mr-2">
                        <div className={`day-dot ${active ? 'is-active' : 'is-empty'}`}></div>
                        <p style={{ fontSize: '0.6rem' }} className="has-text-grey">
                          {['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* LISTADO DE PACIENTES */
        <div className="columns is-multiline">
          
          <div className="column is-4">
            <div className="box is-clickable box-nuevo-paciente" onClick={openCreateModal}>
              <article className="media">
                <div className="media-left">
                  <div className="image is-48x48 avatar-plus">
                    <span className="is-size-4 has-text-grey">+</span>
                  </div>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p className="has-text-grey-darker mb-0"><strong>Añadir nuevo paciente</strong></p>
                    <small className="has-text-grey-darker">Crear ficha de ingreso</small>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {filteredPatients.map((patient) => (
            <div key={patient.id} className="column is-4">
              <div 
                className="box is-clickable box-paciente-listado" 
                onClick={() => setSelectedPatientId(patient.id)}
              >
                <article className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img className="is-rounded" src={`https://ui-avatars.com/api/?name=${patient.name}&background=e8f3ff`} alt="Avatar" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>{patient.name}</strong>
                        <br />
                        <small className="has-text-grey">{patient.age} años</small>
                      </p>
                    </div>
                    <span className={`tag is-small ${patient.active ? 'is-success' : 'is-danger'} is-light`}>
                      {patient.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DE CREACIÓN */}
      <div className={`modal ${isCreateModalActive ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={closeCreateModal}></div>
        <div className="modal-card patient-modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Ingresar Nuevo Paciente</p>
            <button className="delete" aria-label="close" onClick={closeCreateModal}></button>
          </header>
          <section className="modal-card-body">
            <form onSubmit={handleCreatePatient}>
              <div className="field">
                <label className="label">Nombre Completo</label>
                <div className="control">
                  <input className="input" type="text" name="name" value={newPatient.name} onChange={handleInputChange} required placeholder="Ej: Juan Pérez" />
                </div>
              </div>
              <div className="field">
                <label className="label">Edad</label>
                <div className="control">
                  <input className="input" type="number" name="age" value={newPatient.age} onChange={handleInputChange} required placeholder="Ej: 7" />
                </div>
              </div>
              <div className="field">
                <label className="label">Condición Sensorial / Observaciones</label>
                <div className="control">
                  <textarea className="textarea" name="condition" value={newPatient.condition} onChange={handleInputChange} required placeholder="Describe la condición..."></textarea>
                </div>
              </div>
              <div className="buttons is-right mt-5">
                <button type="button" className="button" onClick={closeCreateModal}>Cancelar</button>
                <button type="submit" className="button is-link">Crear Paciente</button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
}
