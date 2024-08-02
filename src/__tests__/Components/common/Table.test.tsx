import {render, screen} from '@testing-library/react'
import {Table} from '../../../Components/common/Table'
import {Country} from '../../../lib/types'

describe('table', () => {
  it('should render table with correct data and columns', () => {
    const data: Country[] = [
      {
        abbreviation: 'MEX',
        capital: 'Mexico City',
        currency: 'MXN',
        phone: '52',
        population: 1964375,
        name: 'North America',
        media: {
          flag: 'URL_TO_FLAG_IMAGE',
          emblem: 'URL_TO_EMBLEM_IMAGE',
          orthographic: 'URL_TO_EMBLEM_IMAGE',
        },
        id: 1,
      },
    ]
    const columns = [
      {header: 'Name', accessorKey: 'name'},
      {header: 'Population', accessorKey: 'population'},
    ]
    const searchCriteria = {searchTerm: '', minPopulation: 0}
    render(
      <Table
        data={data}
        columns={columns}
        searchCriteria={searchCriteria}
        isLoading={false}
      />
    )

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Population')).toBeInTheDocument()
  })
})
