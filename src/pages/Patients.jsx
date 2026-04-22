import { useState } from "react";
import { mockPatients } from "../data/patients";

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const filteredPatients = mockPatients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchTerm(patient.name); 
    setIsDropdownActive(false);
  };

  return (
    <section className="section">
      <h1 className="title">Gestión de Pacientes</h1>
      
      <div className={`dropdown ${isDropdownActive ? 'is-active' : ''} is-block`}>
        <div className="dropdown-trigger">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Buscar paciente por nombre..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownActive(true);
                }}
                onFocus={() => setIsDropdownActive(true)}
              />
              <span className="icon is-small is-left">
                🔍
              </span>
            </p>
          </div>
        </div>

        {isDropdownActive && searchTerm !== "" && (
          <div className="dropdown-menu is-block" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <button
                    key={patient.id}
                    className="dropdown-item button is-white is-fullwidth has-text-left"
                    onClick={() => handleSelectPatient(patient)}
                  >
                    {patient.name}
                  </button>
                ))
              ) : (
                <div className="dropdown-item">No se encontraron pacientes</div>
              )}
            </div>
          </div>
        )}
      </div>

      <hr />

      {selectedPatient ? (
        <div className="box animate__animated animate__fadeIn">
          <div className="columns">
            <div className="column is-one-third">
              <figure className="image is-128x128" style={{ margin: '0 auto' }}>
                <img className="is-rounded" src={`https://ui-avatars.com/api/?name=${selectedPatient.name}&background=random`} alt="Avatar" />
              </figure>
            </div>
            <div className="column">
              <h2 className="title is-4">{selectedPatient.name}</h2>
              <div className="content">
                <p><strong>Edad:</strong> {selectedPatient.age} años</p>
                <p><strong>Condición:</strong> <span className="tag is-info is-light">{selectedPatient.condition}</span></p>
                <p><strong>Última Visita:</strong> {selectedPatient.lastVisit}</p>
              </div>
              <button className="button is-warning is-light" onClick={() => setSelectedPatient(null)}>
                Limpiar selección
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="notification is-light has-text-centered p-6">
          <p className="is-size-5">Usa el buscador de arriba para seleccionar un paciente y ver su información.</p>
        </div>
      )}
    </section>
  );
}
