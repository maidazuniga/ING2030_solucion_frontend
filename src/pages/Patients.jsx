import { useState } from "react";
import { Link } from "react-router-dom";
import { mockPatients } from "../data/patients";
import "../assets/styles/patients.css";

export default function Patients() {
  const [patients, setPatients] = useState(mockPatients);
  const [filter, setFilter] = useState("all");
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

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
          <div className="level-item">
            <div className="buttons has-addons">
              <button className={`button is-small ${filter === 'all' ? 'is-link is-selected' : ''}`}onClick={() => setFilter('all')}>
                Todos
              </button>
              <button className={`button is-small ${filter === 'active' ? 'is-success is-selected' : ''}`}onClick={() => setFilter('active')}>
                Activos
              </button>
              <button className={`button is-small ${filter === 'inactive' ? 'is-danger is-selected' : ''}`}onClick={() => setFilter('inactive')}>
                Inactivos
              </button>
            </div>
          </div>
          {selectedPatient && (
            <div className="level-item">
              <button className="button is-small is-light is-rounded" onClick={() => setSelectedPatientId(null)}>
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
              <p className="heading has-text-grey-darker">Videos del paciente</p>
            </div>

            <div className="column">
              <p className="heading has-text-grey-darker">Stats del paciente</p>
            </div>
          </div>
        </div>
      ) : (
        /* LISTADO DE PACIENTES */
        <div className="columns is-multiline">
          
          {/* AÑADIR NUEVO PACIENTE */}
          <div className="column is-4">
            <Link to="/crear-paciente" style={{ textDecoration: 'none' }}>
              <div className="box is-clickable box-nuevo-paciente">
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
            </Link>
          </div>

          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
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
            ))
          ) : (
            filter !== 'all' && (
              <div className="column is-8 has-text-centered py-6">
                <p className="is-size-4 has-text-grey-light">No hay pacientes que coincidan con este filtro.</p>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}
