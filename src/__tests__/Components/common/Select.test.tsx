import {render, screen, fireEvent} from '@testing-library/react'
import {Select} from '../../../Components/common/Select'
import {PopulationRange} from '../../../lib/types'

const mockOptions: PopulationRange[] = [
  {value: '0-1000', label: '0 - 1,000', disabled: false},
  {value: '1001-5000', label: '1,001 - 5,000', disabled: false},
  {value: '5001-10000', label: '5,001 - 10,000', disabled: true},
]

describe('Select component', () => {
  test('displays the correct selected value', () => {
    render(
      <Select value='1001-5000' onChange={() => {}} options={mockOptions} />
    )
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement
    expect(selectElement.value).toBe('1001-5000')
  })

  test('calls onChange handler with correct value when option is selected', () => {
    const handleChange = jest.fn()
    render(<Select value='' onChange={handleChange} options={mockOptions} />)
    const selectElement = screen.getByRole('combobox')
    fireEvent.change(selectElement, {target: {value: '0-1000'}})
    expect(handleChange).toHaveBeenCalledWith('0-1000')
  })

  test('disables option when disabled prop is true', () => {
    render(<Select value='' onChange={() => {}} options={mockOptions} />)
    const disabledOption = screen.getByRole('option', {
      name: '5,001 - 10,000',
    }) as HTMLOptionElement
    expect(disabledOption.disabled).toBe(true)
  })

  test('has correct CSS class', () => {
    render(<Select value='' onChange={() => {}} options={mockOptions} />)
    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveClass('select-input')
  })
})
