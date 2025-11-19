import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  viewMode: 'grid',
  lastMutationMessage: '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleViewMode(state) {
      state.viewMode = state.viewMode === 'grid' ? 'table' : 'grid'
    },
    setLastMutationMessage(state, action) {
      state.lastMutationMessage = action.payload
    },
    clearMutationMessage(state) {
      state.lastMutationMessage = ''
    },
  },
})

export const { toggleViewMode, setLastMutationMessage, clearMutationMessage } =
  uiSlice.actions

export default uiSlice.reducer



