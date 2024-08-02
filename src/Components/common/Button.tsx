import React, { memo } from 'react'
import '../../styles/button.scss'

interface ButtonProps {
  label: string
  onClick: () => void
  [x: string]: any
}

const Button: React.FC<ButtonProps> = ({label, onClick, ...props}) => {
  return (
    <button onClick={onClick} {...props}>
      {label}
    </button>
  )
}

export default memo(Button)
