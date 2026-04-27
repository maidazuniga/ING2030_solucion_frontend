import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import Patients from "./pages/Patients.jsx";
import NewPatient from "./pages/CreatePatient.jsx";
import Activities from "./pages/Activities.jsx";

function AppLayout() {
  const location = useLocation();
  
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="columns is-gapless" style={{ minHeight: '100vh' }}>
      
      {!isAuthPage && (
        <div className="column is-2">
          <Sidebar />
        </div>
      )}

      <div className="column">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pacientes" element={<Patients />} />
            <Route path="/crear-paciente" element={<NewPatient />} />
            <Route path="/actividades" element={<Activities />} />
          </Routes>
        </main>
      </div>

    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
