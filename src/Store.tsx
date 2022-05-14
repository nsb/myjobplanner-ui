import React, { createContext, useReducer } from 'react'
import { Business } from './api'

type BusinessState = {
    results: Business[]
    selected: Business | undefined
    isLoading: boolean
    error: string | undefined
}

type State = {
    businesses: BusinessState
}

export type Action =
  | { type: 'REQUEST_BUSINESSES' }
  | { type: 'SUCCESS_BUSINESSES', payload: Business[] }
  | { type: 'FAILURE_BUSINESSES', error: string }

const initialState: State = {
  businesses: {
    results: [],
    selected: undefined,
    isLoading: false,
    error: undefined
  }
}

const store = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => {}
])
const { Provider } = store

function businessesReducer (state: BusinessState, action: Action): BusinessState {
  switch (action.type) {
    case 'REQUEST_BUSINESSES':
      return { ...state, isLoading: true, error: undefined }
    case 'SUCCESS_BUSINESSES':
      return { ...state, isLoading: false, error: undefined, results: action.payload }
    case 'FAILURE_BUSINESSES':
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}

function reducer ({ businesses }: State, action: Action): State {
  return {
    businesses: businessesReducer(businesses, action)
  }
}

type Props = {
    children: React.ReactNode
}

function StateProvider ({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Provider value={[state, dispatch]}>{children}</Provider>
}

export { store, StateProvider }
