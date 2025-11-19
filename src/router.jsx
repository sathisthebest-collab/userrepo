import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import PostsPage from './pages/PostsPage'
import PostDetailsPage from './pages/PostDetailsPage'
import PostFormPage from './pages/PostFormPage'
import RouteErrorPage from './pages/RouteErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <PostsPage />,
      },
      {
        path: 'posts/new',
        element: <PostFormPage mode="create" />,
      },
      {
        path: 'posts/:postId',
        element: <PostDetailsPage />,
      },
      {
        path: 'posts/:postId/edit',
        element: <PostFormPage mode="edit" />,
      },
    ],
  },
])



