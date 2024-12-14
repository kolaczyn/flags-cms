import { LoadableState } from '../types/loadable-state'

export const initialState = {
  data: null,
  loading: true,
  error: null,
} satisfies LoadableState<unknown>
