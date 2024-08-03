import {fireEvent, render, screen} from '@testing-library/react'
import {Select} from '../../../Components/common/Select'

describe('select', () => {
  const defaultOptions = [
    {value: 'option1', label: 'Option 1'},
    {value: 'option2', label: 'Option 2'},
  ]

  test('should render select field with options', () => {
    render(<Select value='' onChange={() => {}} options={defaultOptions} />)
    const selectElement = screen.getByTestId('select-box')
    expect(selectElement).toBeInTheDocument()
    expect(selectElement).toHaveAttribute('aria-label', 'select-box')
  })

  test('renders with initial value', () => {
    render(
      <Select value='option1' onChange={() => {}} options={defaultOptions} />
    )
    const selectElement = screen.getByTestId('select-box')
    expect(selectElement).toHaveValue('option1')
  })
  test('should render options correctly', () => {
    render(<Select value='' onChange={() => {}} options={defaultOptions} />)
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveTextContent('Option 1')
    expect(options[1]).toHaveTextContent('Option 2')
  })

  test('calls onChange handler with correct value', () => {
    const handleChange = jest.fn()
    render(<Select value='' onChange={handleChange} options={defaultOptions} />)
    const selectElement = screen.getByTestId('select-box')
    fireEvent.change(selectElement, {target: {value: 'option2'}})
    expect(handleChange).toHaveBeenCalledWith('option2')
  })
})
