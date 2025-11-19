import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useAddPostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} from '../features/posts/postsApi'
import { useDispatch } from 'react-redux'
import {
  setLastMutationMessage,
  clearMutationMessage,
} from '../features/ui/uiSlice'
import '../App.css'

export default function PostFormPage({ mode }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { postId } = useParams()
  const isEditMode = mode === 'edit'
  const [formState, setFormState] = useState({ title: '', body: '' })
  const [addPost, addStatus] = useAddPostMutation()
  const [updatePost, updateStatus] = useUpdatePostMutation()
  const { data: postData, isLoading: isLoadingPost } = useGetPostQuery(postId, {
    skip: !isEditMode,
  })

  const isSubmitting = addStatus.isLoading || updateStatus.isLoading

  useEffect(() => {
    if (postData) {
      setFormState({ title: postData.title, body: postData.body })
    }
  }, [postData])

  const pageTitle = useMemo(
    () => (isEditMode ? 'Update post' : 'Create a post'),
    [isEditMode],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      if (isEditMode) {
        await updatePost({ id: postId, ...formState }).unwrap()
        dispatch(setLastMutationMessage('Post updated successfully'))
      } else {
        await addPost({ ...formState, userId: 1 }).unwrap()
        dispatch(
          setLastMutationMessage('Post created in JSONPlaceholder (mocked)'),
        )
      }
      setTimeout(() => dispatch(clearMutationMessage()), 3000)
      navigate('/')
    } catch (mutationError) {
      console.error(mutationError)
    }
  }

  if (isEditMode && isLoadingPost) {
    return (
      <section className="page-shell">
        <p>Loading post…</p>
      </section>
    )
  }

  return (
    <section className="page-shell">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>{pageTitle}</h1>
        <label>
          Title
          <input
            className="input"
            name="title"
            value={formState.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Content
          <textarea
            className="input"
            name="body"
            value={formState.body}
            onChange={handleChange}
            rows={6}
            required
          />
        </label>
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isEditMode ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}



