import {render, screen, fireEvent} from '@testing-library/react'
import Button from '../../../Components/common/Button'

describe('Button component', () => {
  test('renders button with correct label', () => {
    render(<Button label='Click me' onClick={() => {}} />)
    const buttonElement = screen.getByText(/click me/i)
    expect(buttonElement).toBeInTheDocument()
  })

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button label='Click me' onClick={handleClick} />)
    const buttonElement = screen.getByText(/click me/i)
    fireEvent.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('passes additional props to button element', () => {
    render(
      <Button
        label='Test'
        onClick={() => {}}
        disabled
        data-testid='test-button'
      />
    )
    const buttonElement = screen.getByTestId('test-button')
    expect(buttonElement).toBeDisabled()
  })
})
