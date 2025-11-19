import { useNavigate, useParams, Link } from 'react-router-dom'
import { useGetPostQuery } from '../features/posts/postsApi'
import '../App.css'

export default function PostDetailsPage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { data: post, isLoading, error } = useGetPostQuery(postId)

  if (isLoading) {
    return (
      <section className="page-shell">
        <p>Loading post…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="page-shell">
        <p>Unable to load this post.</p>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="page-shell">
        <p>Post not found.</p>
      </section>
    )
  }

  return (
    <section className="page-shell">
      <button className="btn btn-link" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <article className="detail-card">
        <header>
          <p className="muted">Post #{post.id}</p>
          <h1>{post.title}</h1>
        </header>
        <p>{post.body}</p>
        <footer className="detail-actions">
          <Link to={`/posts/${post.id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <Link to="/" className="btn btn-link">
            Back to list
          </Link>
        </footer>
      </article>
    </section>
  )
}



