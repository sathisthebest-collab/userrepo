import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  useDeletePostMutation,
  useGetPostsQuery,
} from '../features/posts/postsApi'
import {
  toggleViewMode,
  setLastMutationMessage,
  clearMutationMessage,
} from '../features/ui/uiSlice'
import '../App.css'

export default function PostsPage() {
  const dispatch = useDispatch()
  const viewMode = useSelector((state) => state.ui.viewMode)
  const [search, setSearch] = useState('')
  const { data: posts = [], isLoading, isFetching, error } = useGetPostsQuery()
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()

  const filteredPosts = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return posts
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.body.toLowerCase().includes(term),
    )
  }, [posts, search])

  const handleDelete = async (id) => {
    try {
      await deletePost(id).unwrap()
      dispatch(setLastMutationMessage('Post removed (JSONPlaceholder demo API)'))
      setTimeout(() => dispatch(clearMutationMessage()), 3000)
    } catch (mutationError) {
      console.error(mutationError)
    }
  }

  if (isLoading) {
    return (
      <section className="page-shell">
        <p>Loading posts...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="page-shell">
        <p>Unable to load posts.</p>
        <pre>{error.error}</pre>
      </section>
    )
  }

  return (
    <section className="page-shell">
      <header className="page-header">
        <div>
          <h1>Posts</h1>
          <p className="muted">
            Powered by JSONPlaceholder API documentation (public demo service).
          </p>
        </div>
        <div className="actions">
          <button className="btn btn-secondary" onClick={() => dispatch(toggleViewMode())}>
            Switch to {viewMode === 'grid' ? 'table' : 'grid'} view
          </button>
          <Link to="/posts/new" className="btn btn-primary">
            New post
          </Link>
        </div>
      </header>

      <div className="toolbar">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search title or content"
          className="input"
        />
        {isFetching && <span className="badge">Refreshing…</span>}
      </div>

      {filteredPosts.length === 0 ? (
        <p>No posts match your search.</p>
      ) : viewMode === 'grid' ? (
        <div className="card-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="card">
              <header>
                <h2>{post.title}</h2>
              </header>
              <p>{post.body.slice(0, 120)}…</p>
              <footer className="card-actions">
                <Link to={`/posts/${post.id}`} className="btn btn-link">
                  View
                </Link>
                <Link to={`/posts/${post.id}/edit`} className="btn btn-link">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="btn btn-danger"
                  disabled={isDeleting}
                >
                  Delete
                </button>
              </footer>
            </article>
          ))}
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Excerpt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body.slice(0, 60)}…</td>
                  <td>
                    <div className="inline-actions">
                      <Link to={`/posts/${post.id}`} className="btn btn-link">
                        View
                      </Link>
                      <Link to={`/posts/${post.id}/edit`} className="btn btn-link">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="btn btn-danger"
                        disabled={isDeleting}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}



