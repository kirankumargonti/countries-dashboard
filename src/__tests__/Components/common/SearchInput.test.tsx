import {fireEvent, render, screen} from '@testing-library/react'
import {SearchInput} from '../../../Components/common/SearchInput'

describe('search', () => {
  test('should render search field with value', () => {
    render(<SearchInput value='india' onChange={() => {}} />)
    const searchElement = screen.getByTestId('search-input')
    expect(searchElement).toBeInTheDocument()
    expect(searchElement).toHaveValue('india')
    expect(searchElement).toHaveAttribute('aria-label', 'search-box')
  })

  test('calls onChange handler with correct value', () => {
    const handleChange = jest.fn()
    render(<SearchInput value='' onChange={handleChange} />)
    const inputElement = screen.getByTestId('search-input')
    fireEvent.change(inputElement, {target: {value: 'new value'}})
    expect(handleChange).toHaveBeenCalledWith('new value')
  })
})
