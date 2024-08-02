export interface Country {
  abbreviation: string
  capital: string
  currency: string
  name: string
  phone: string
  population: number
  media: {
    flag: string
    emblem: string
    orthographic: string
  }
  id: number
}

export interface PopulationRange {
  value: string
  label: string
  disabled?: boolean
}
