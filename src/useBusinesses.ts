import React, { useEffect } from 'react'
import { Action } from './Store'
import ApiClient from './ApiClient'
import axios from 'axios'

function useBusinesses (dispatch: React.Dispatch<Action>, getAccessTokenSilently: Function) {
  useEffect(() => {
    const fetchBusinesses = async () => {
      dispatch({ type: 'REQUEST_BUSINESSES' })
      try {
        const accessToken = await getAccessTokenSilently({
          audience: 'https://api.myjobplanner.com',
          scope: 'read:business'
        })

        const headers = { Authorization: `Bearer ${accessToken}` }
        const { data } = await ApiClient.findBusinesses(
          0, 20, 'ASC', 'created', { headers }
        )

        dispatch({ type: 'SUCCESS_BUSINESSES', payload: data.data || [] })
      } catch (err) {
        if (axios.isAxiosError(err)) {
          dispatch({ type: 'FAILURE_BUSINESSES', error: err.message })
        }
      }
    }

    fetchBusinesses()
  }, [])
}

export default useBusinesses
