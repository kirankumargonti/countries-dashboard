import {fireEvent, render, screen} from '@testing-library/react'
import CountryTable from '../../Components/CountryTable'
import useCountries from '../../hooks/useCountries'

jest.mock('../../hooks/useCountries', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('CountryTable', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('should render search input and population filter', () => {
    const mockUseCountries = useCountries as jest.Mock
    mockUseCountries.mockReturnValue({countries: []})

    render(<CountryTable />)
    expect(
      screen.getByPlaceholderText('Search countries...')
    ).toBeInTheDocument()
    const selectElement = screen.getByTestId('select-box')
    expect(selectElement).toBeInTheDocument()
  })

  test('should render clear filters button and show all countries button', () => {
    const mockUseCountries = useCountries as jest.Mock
    mockUseCountries.mockReturnValue({countries: []})
    render(<CountryTable />)
    expect(screen.getByRole('button', {name: 'Clear'})).toBeInTheDocument()
    expect(
      screen.getByRole('button', {name: 'Show all countries'})
    ).toBeInTheDocument()
  })

  test('should render table with correct columns', () => {
    const mockUseCountries = useCountries as jest.Mock
    mockUseCountries.mockReturnValue({countries: []})
    render(<CountryTable />)
    expect(
      screen.getByRole('columnheader', {name: 'Country Name'})
    ).toBeInTheDocument()
    expect(screen.getByRole('columnheader', {name: 'Code'})).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', {name: 'Capital'})
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', {name: 'Ph Code'})
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', {name: 'Population'})
    ).toBeInTheDocument()
    expect(screen.getByRole('columnheader', {name: 'Flag'})).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', {name: 'Emblem'})
    ).toBeInTheDocument()
  })

  test('should update search term when typing in search input', async () => {
    const mockUseCountries = useCountries as jest.Mock
    mockUseCountries.mockReturnValue({countries: []})
    render(<CountryTable />)
    const searchInput = screen.getByPlaceholderText('Search countries...')
    fireEvent.change(searchInput, {target: {value: 'India'}})
    expect(searchInput).toHaveValue('India')
  })

  test('should update population filter when selecting an option', async () => {
    const mockUseCountries = useCountries as jest.Mock
    mockUseCountries.mockReturnValue({countries: []})
    render(<CountryTable />)
    const select = screen.getByRole('combobox')
    fireEvent.change(select, {target: {value: '<1M'}})
    expect(select).toHaveValue('<1M')
  })

  test('should clear filters when clicking clear button', async () => {
    const mockUseCountries = useCountries as jest.Mock
    mockUseCountries.mockReturnValue({countries: []})
    render(<CountryTable />)
    const searchInput = screen.getByPlaceholderText('Search countries...')
    const select = screen.getByRole('combobox')
    const clearButton = screen.getByRole('button', {name: 'Clear'})

    fireEvent.change(searchInput, {target: {value: 'India'}})
    fireEvent.change(select, {target: {value: '<1M'}})
    fireEvent.click(clearButton)

    expect(searchInput).toHaveValue('')
    expect(select).toHaveValue('')
  })

  test('should disable show all countries button when loading', () => {
    ;(useCountries as jest.Mock).mockReturnValue({
      countries: [],
      isLoading: true,
      fetchData: jest.fn(),
    })

    render(<CountryTable />)

    const showAllCountriesButton = screen.getByRole('button', {
      name: /Show all countries/i,
    })

    expect(showAllCountriesButton).toBeDisabled()
    expect(showAllCountriesButton).toHaveClass('disabled-btn')
  })
})
