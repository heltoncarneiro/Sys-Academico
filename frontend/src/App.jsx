import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import Auth from './pages/Auth.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AlunoDisciplinas from './pages/AlunoDisciplinas.jsx'
import BuscarPorMatricula from './pages/BuscarPorMatricula.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useAuth } from './context/AuthContext.jsx'

function NavBar() {
  const { isAuthenticated, logout } = useAuth()
  const { pathname } = useLocation()
  return (
    <div className="header-hero">
      <div className="header-inner">
        <div className="brand">Sys-Acadêmico</div>
        <nav className="nav" style={{ width:'100%' }}>
          <div className="nav-links">
            {!isAuthenticated && (
              <Link to="/auth" className={pathname==='/auth'?'active':''}>Autenticação</Link>
            )}
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className={pathname.startsWith('/dashboard')?'active':''}>Dashboard</Link>
                <Link to="/alunos/matricula/" className={pathname.startsWith('/alunos/matricula')?'active':''}>Buscar por Matrícula</Link>
              </>
            )}
          </div>
          {isAuthenticated && (
            <div className="nav-end">
              <button className="btn btn-logout btn-base btn-sm" onClick={logout}>Sair</button>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<ProtectedRoute />}> 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/alunos/:id/disciplinas" element={<AlunoDisciplinas />} />
          </Route>
          <Route path="/alunos/matricula/:matricula?" element={<BuscarPorMatricula />} />
        </Routes>
      </div>
    </>
  )
}