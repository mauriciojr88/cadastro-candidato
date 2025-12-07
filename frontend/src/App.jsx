import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CandidateFormPage from './pages/CandidateFormPage';
import CandidateListPage from './pages/CandidateListPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 16 }}>
      <header style={{ marginBottom: 16 }}>
        <nav style={{ display: 'flex', gap: 8 }}>
          {user && (
            <>
              <Link to="/candidates">Candidatos</Link>
              <Link to="/candidates/new">Novo Candidato</Link>
            </>
          )}
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Registrar</Link>}
          {user && (
            <button onClick={logout}>
              Sair
            </button>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/candidates"
          element={
            <ProtectedRoute>
              <CandidateListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidates/new"
          element={
            <ProtectedRoute>
              <CandidateFormPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
