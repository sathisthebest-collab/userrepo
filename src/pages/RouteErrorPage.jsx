import { useRouteError, Link } from 'react-router-dom'
import '../App.css'

export default function RouteErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <section className="page-shell page-shell--center">
      <h1>Something went wrong</h1>
      <p>{error?.statusText || error?.message || 'Unknown error'}</p>
      <Link to="/" className="btn btn-primary">
        Go home
      </Link>
    </section>
  )
}

