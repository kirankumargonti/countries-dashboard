import {render, screen} from '@testing-library/react'
import {Table} from '../../../Components/common/Table'
import {Country} from '../../../lib/types'

describe('table', () => {
  test('should render table with correct data and columns', () => {
    const data: Country[] = [
      {
        abbreviation: 'MEX',
        capital: 'Mexico City',
        currency: 'MXN',
        phone: '52',
        population: 1964375,
        name: 'North America',
        media: {
          flag: 'https://images.pexels.com/photos/3476860/pexels-photo-3476860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          emblem:
            'https://images.pexels.com/photos/3476860/pexels-photo-3476860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          orthographic:
            'https://images.pexels.com/photos/3476860/pexels-photo-3476860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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

    const table = screen.getByTestId('common-table')
    expect(table).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Population')).toBeInTheDocument()
  })
})
