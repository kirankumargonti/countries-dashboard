import {FC, memo} from 'react'
import '../../styles/search.scss'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchInput: FC<SearchInputProps> = memo(
  ({value, onChange, placeholder = 'Search...'}) => (
    <input
      type='text'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className='search-input'
      data-testid='search-input'
      aria-label='search-box'
    />
  )
)
