import {memo} from 'react'
import {PopulationRange} from '../../lib/types'
import '../../styles/select.scss'

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: PopulationRange[]
}

export const Select: React.FC<SelectProps> = memo(
  ({value, onChange, options}) => (
    <select
      className='select-input'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
)
