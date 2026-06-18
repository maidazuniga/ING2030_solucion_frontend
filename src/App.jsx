import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VistaPaciente from './pages/VistaPaciente';
import MisionPaciente from './pages/MisionPaciente';
import HistorialMisiones from './pages/HistorialMisiones';
import VistaTerapeuta from './pages/VistaTerapeuta';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vista-paciente" element={<VistaPaciente />} />
        <Route path="/vista-pacientes" element={<VistaPaciente />} />
        <Route path="/vista-paciente/mision" element={<MisionPaciente />} />
        <Route path="/vista-pacientes/mision" element={<MisionPaciente />} />
        <Route path="/vista-paciente/historial" element={<HistorialMisiones />} />
        <Route path="/vista-pacientes/historial" element={<HistorialMisiones />} />
        <Route path="/vista-terapeuta" element={<VistaTerapeuta />} />
      </Routes>
    </Router>
  );
}