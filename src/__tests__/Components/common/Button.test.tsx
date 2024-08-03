import {render, screen} from '@testing-library/react'
import Button from '../../../Components/common/Button'

describe('button', () => {
  test('should render button and with correct label', () => {
    render(<Button onClick={() => {}} label='Show Countries' />)
    const buttonElement = screen.getByTestId('button-element')
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveTextContent('Show Countries')
    expect(buttonElement).toHaveAttribute('aria-label', 'Show Countries')
  })
  test('should call onClick when clicked', () => {
    const onClickMock = jest.fn()
    render(<Button onClick={onClickMock} label='Show Countries' />)
    const buttonElement = screen.getByTestId('button-element')
    buttonElement.click()
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
