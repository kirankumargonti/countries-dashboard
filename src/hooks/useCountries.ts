import {useReducer} from 'react'
import {Country} from '../lib/types'
import axios from 'axios'

interface State {
  countries: Country[] | null
  isLoading: boolean
  error: Error | null
}

const useCountries = () => {
  const [state, updateState] = useReducer(
    (prev: State, next: Partial<State>): State => {
      return {...prev, ...next}
    },
    {countries: [], isLoading: false, error: null}
  )

  const fetchData = async () => {
    updateState({isLoading: true})
    try {
      const response = await axios.get(
        'https://api.sampleapis.com/countries/countries'
      )
      const countries = response?.data
      updateState({countries})
    } catch (err) {
      updateState({
        error: err instanceof Error ? err : new Error('An error occurred'),
      })
    } finally {
      updateState({isLoading: false})
    }
  }

  return {...state, fetchData}
}

export default useCountries
