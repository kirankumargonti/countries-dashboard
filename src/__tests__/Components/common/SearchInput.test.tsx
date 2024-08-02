import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import {SearchInput} from '../../../Components/common/SearchInput'

describe('SearchInput component', () => {
  test('renders input with custom placeholder', () => {
    render(
      <SearchInput
        value=''
        onChange={() => {}}
        placeholder='Custom placeholder'
      />
    )
    const inputElement = screen.getByPlaceholderText('Custom placeholder')
    expect(inputElement).toBeInTheDocument()
  })

  test('displays the correct value', () => {
    render(<SearchInput value='test value' onChange={() => {}} />)
    const inputElement = screen.getByDisplayValue('test value')
    expect(inputElement).toBeInTheDocument()
  })

  test('calls onChange handler with correct value', () => {
    const handleChange = jest.fn()
    render(<SearchInput value='' onChange={handleChange} />)
    const inputElement = screen.getByRole('textbox')
    fireEvent.change(inputElement, {target: {value: 'new value'}})
    expect(handleChange).toHaveBeenCalledWith('new value')
  })
})
