import { configureStore } from '@reduxjs/toolkit'
import { postsApi } from './features/posts/postsApi'
import uiReducer from './features/ui/uiSlice'

const queryAuditMiddleware = (storeAPI) => (next) => (action) => {
  if (action.type.startsWith('postsApi/')) {
    console.info('[postsApi]', action.type, action.meta)
  }
  return next(action)
}

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, queryAuditMiddleware),
})



