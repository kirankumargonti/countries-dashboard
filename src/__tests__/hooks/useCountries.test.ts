import {renderHook, act} from '@testing-library/react'
import axios from 'axios'
import useCountries from '../../hooks/useCountries'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('useCountries', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should itestialize with default values', () => {
    const {result} = renderHook(() => useCountries())
    expect(result.current.countries).toEqual([])
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  test('should fetch countries successfully', async () => {
    const mockData = [
      {name: 'Country 1', capital: 'Capital 1'},
      {name: 'Country 2', capital: 'Capital 2'},
    ]
    mockedAxios.get.mockResolvedValueOnce({status: 200, data: mockData})

    const {result} = renderHook(() => useCountries())

    await act(async () => {
      await result.current.fetchData()
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.countries).toEqual(mockData)
    expect(result.current.error).toBe(null)
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.sampleapis.com/countries/countries'
    )
  })

  test('should handle HTTP error', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('HTTP error! status: 404'))

    const {result} = renderHook(() => useCountries())

    await act(async () => {
      await result.current.fetchData()
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.countries).toEqual([])
    expect(result.current.error).toEqual(new Error('HTTP error! status: 404'))
  })

  test('should handle invalid data format', async () => {
    const invalidData = [{invalidKey: 'Invalid Value'}]
    mockedAxios.get.mockResolvedValueOnce({status: 200, data: invalidData})

    const {result} = renderHook(() => useCountries())

    await act(async () => {
      await result.current.fetchData()
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.countries).toEqual([])
    expect(result.current.error).toEqual(
      new Error('Invalid data format received from API')
    )
  })
})
