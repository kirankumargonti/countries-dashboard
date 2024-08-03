import React, {memo} from 'react'
import '../../styles/button.scss'

interface ButtonProps {
  label: string
  onClick: () => void
  [x: string]: any
}

const Button: React.FC<ButtonProps> = ({label, onClick, ...props}) => {
  return (
    <button
      data-testid='button-element'
      aria-label={label}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  )
}

export default memo(Button)
