import {useReducer} from 'react'
import {Country} from '../lib/types'
import axios from 'axios'

interface State {
  countries: Country[] | null
  isLoading: boolean
  error: Error | null
}

const validateCountryData = (data: any): data is Country[] => {
  if (!Array.isArray(data)) return false
  return data.every(
    (country) =>
      typeof country.name === 'string' && typeof country.capital === 'string'
  )
}

function useCountries() {
  const [state, updateState] = useReducer(
    (prev: State, next: Partial<State>): State => {
      return {...prev, ...next}
    },
    {countries: [], isLoading: false, error: null}
  )

  const fetchData = async () => {
    updateState({isLoading: true, error: null})
    try {
      const response = await axios.get(
        'https://api.sampleapis.com/countries/countries'
      )
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const countries = response?.data
      if (!validateCountryData(countries)) {
        throw new Error('Invalid data format received from API')
      }
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
