import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.css'

export default function App() {
  const lastMutationMessage = useSelector(
    (state) => state.ui.lastMutationMessage,
  )

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="badge badge-brand">RTK Query CRUD</span>
          <p className="muted">
            JSONPlaceholder demo featuring Redux Toolkit Query & middleware
          </p>
        </div>
        <nav className="nav-links">
          <NavLink to="/" end>
            Posts
          </NavLink>
          <NavLink to="/posts/new">Create</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      {lastMutationMessage && (
        <div className="toast" role="status">
          {lastMutationMessage}
        </div>
      )}
    </div>
  )
}
