import { useState } from "react";
import { mockActivities } from "../data/activities";
import "../assets/styles/activities.css";

export default function Activities() {
	const [activities, setActivities] = useState(mockActivities);
	const [selectedActivityId, setSelectedActivityId] = useState(null);
	const [isCreateModalActive, setIsCreateModalActive] = useState(false);
	const [newActivity, setNewActivity] = useState({
		name: "",
		duration: "",
		difficulty: "Baja",
		creator: "",
		description: "",
		videoUrl: "",
		materials: "",
	});

	const selectedActivity = activities.find((a) => a.id === selectedActivityId);

	const openCreateModal = () => {
		setIsCreateModalActive(true);
	};

	const closeCreateModal = () => {
		setIsCreateModalActive(false);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewActivity((previous) => ({
			...previous,
			[name]: value,
		}));
	};

	const handleCreateActivity = (event) => {
		event.preventDefault();

		const materialsList = newActivity.materials
			.split("\n")
			.map((material) => material.trim())
			.filter(Boolean);

		const activityToAdd = {
			id: Date.now(),
			name: newActivity.name,
			duration: newActivity.duration,
			difficulty: newActivity.difficulty,
			creator: newActivity.creator,
			description: newActivity.description,
			videoUrl: newActivity.videoUrl,
			materials: materialsList,
		};

		setActivities((previous) => [activityToAdd, ...previous]);
		setNewActivity({
			name: "",
			duration: "",
			difficulty: "Baja",
			creator: "",
			description: "",
			videoUrl: "",
			materials: "",
		});
		closeCreateModal();
	};

	return (
		<section className="landing-activities section">
			<div className="level mb-5">
				<div className="level-left">
					<div className="level-item">
						<div>
							<h1 className="title is-3">
								{selectedActivity ? "Detalle de Actividad" : "Actividades"}
							</h1>
							<p className="subtitle is-6 has-text-grey-darker">
								{selectedActivity
									? `Viendo ${selectedActivity.name}`
									: `Total: ${activities.length} actividades`}
							</p>
						</div>
					</div>
				</div>

				<div className="level-right">
					{selectedActivity && (
						<div className="level-item">
							<button
								className="button is-light is-rounded"
								onClick={() => setSelectedActivityId(null)}
							>
								<strong>← Volver al listado</strong>
							</button>
						</div>
					)}
				</div>
			</div>

			<hr />

			{selectedActivity ? (
				<div className="box activity-detail-box p-6">
					<div className="columns is-variable is-5">
						<div className="column is-two-thirds">
							<h2 className="title is-2 mb-3">{selectedActivity.name}</h2>
							<p className="activity-description mb-5">{selectedActivity.description}</p>

							{selectedActivity.videoUrl ? (
								<a
									className="button is-link is-light is-medium"
									href={selectedActivity.videoUrl}
									target="_blank"
									rel="noreferrer"
								>
									Ver video de referencia
								</a>
							) : (
								<p className="has-text-grey">Esta actividad no requiere video.</p>
							)}
						</div>

						<div className="column">
							<div className="activity-meta-box">
								<p className="heading has-text-grey-darker mb-3">Información</p>
								<p className="mb-2">
									<strong>Duración:</strong> {selectedActivity.duration}
								</p>
								<p className="mb-2">
									<strong>Dificultad:</strong> {selectedActivity.difficulty}
								</p>
								<p className="mb-4">
									<strong>Creador:</strong> {selectedActivity.creator}
								</p>

								<p className="heading has-text-grey-darker mb-2">Materiales necesarios</p>
								<ul className="activity-materials">
									{selectedActivity.materials.map((material, index) => (
										<li key={index}>{material}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="columns is-multiline">
					<div className="column is-3-desktop is-6-tablet">
						<div className="box is-clickable activity-create-card" onClick={openCreateModal}>
							<div className="activity-create-plus">+</div>
							<p className="has-text-weight-bold has-text-centered mt-3">Nueva actividad</p>
							<p className="is-size-7 has-text-centered has-text-grey-darker">
								Crear una actividad para terapia sensorial
							</p>
						</div>
					</div>

					{activities.map((activity) => (
						<div key={activity.id} className="column is-3-desktop is-6-tablet">
							<div
								className="box is-clickable activity-card"
								onClick={() => setSelectedActivityId(activity.id)}
							>
								<p className="title is-5 mb-3">{activity.name}</p>
								<p className="is-size-7 mb-2">
									<strong>Duración:</strong> {activity.duration}
								</p>
								<p className="is-size-7 mb-2">
									<strong>Dificultad:</strong> {activity.difficulty}
								</p>
								<p className="is-size-7 has-text-grey-dark">
									<strong>Creador:</strong> {activity.creator}
								</p>
							</div>
						</div>
					))}
				</div>
			)}

			<div className={`modal ${isCreateModalActive ? "is-active" : ""}`}>
				<div className="modal-background" onClick={closeCreateModal}></div>
				<div className="modal-card activity-modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">Crear nueva actividad</p>
						<button className="delete" aria-label="close" onClick={closeCreateModal}></button>
					</header>
					<section className="modal-card-body">
						<form onSubmit={handleCreateActivity} className="activity-form">
							<div className="columns is-multiline">
								<div className="column is-half">
									<div className="field">
										<label className="label">Nombre</label>
										<div className="control">
											<input className="input" type="text" name="name" value={newActivity.name} onChange={handleInputChange} placeholder="Ej: Exploración con esponjas" required />
										</div>
									</div>
								</div>
								<div className="column is-half">
									<div className="field">
										<label className="label">Duración</label>
										<div className="control">
											<input className="input" type="text" name="duration" value={newActivity.duration} onChange={handleInputChange} placeholder="Ej: 20 min" required />
										</div>
									</div>
								</div>
								<div className="column is-half">
									<div className="field">
										<label className="label">Dificultad</label>
										<div className="control">
											<div className="select is-fullwidth">
												<select name="difficulty" value={newActivity.difficulty} onChange={handleInputChange}>
													<option value="Baja">Baja</option>
													<option value="Media">Media</option>
													<option value="Alta">Alta</option>
												</select>
											</div>
										</div>
									</div>
								</div>
								<div className="column is-half">
									<div className="field">
										<label className="label">Creador</label>
										<div className="control">
											<input className="input" type="text" name="creator" value={newActivity.creator} onChange={handleInputChange} placeholder="Ej: Terapeuta Ocupacional" required />
										</div>
									</div>
								</div>
								<div className="column is-full">
									<div className="field">
										<label className="label">Descripción</label>
										<div className="control">
											<textarea className="textarea" name="description" value={newActivity.description} onChange={handleInputChange} placeholder="Describe la actividad sensorial..." rows="4" required></textarea>
										</div>
									</div>
								</div>
								<div className="column is-full">
									<div className="field">
										<label className="label">Video de apoyo</label>
										<div className="control">
											<input className="input" type="url" name="videoUrl" value={newActivity.videoUrl} onChange={handleInputChange} placeholder="https://..." />
										</div>
									</div>
								</div>
								<div className="column is-full">
									<div className="field">
										<label className="label">Materiales necesarios</label>
										<div className="control">
											<textarea className="textarea" name="materials" value={newActivity.materials} onChange={handleInputChange} placeholder="Escribe un material por línea" rows="4" required></textarea>
										</div>
										<p className="help">Escribe un material por línea.</p>
									</div>
								</div>
							</div>

							<div className="buttons is-right mt-5">
								<button type="button" className="button is-light" onClick={closeCreateModal}>
									Cancelar
								</button>
								<button type="submit" className="button is-link">
									Crear actividad
								</button>
							</div>
						</form>
					</section>
				</div>
			</div>
		</section>
	);
}

