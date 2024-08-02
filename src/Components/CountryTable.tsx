import React, {useCallback, useMemo, useReducer} from 'react'
import {ColumnDef} from '@tanstack/react-table'
import {SearchInput} from './common/SearchInput'
import {Select} from './common/Select'
import {Table} from './common/Table'
import Button from './common/Button'
import useCountries from '../hooks/useCountries'
import {Country, PopulationRange} from '../lib/types'
import '../styles/countryTable.scss'

const populationRanges: PopulationRange[] = [
  {value: '', label: 'Population', disabled: true},
  {value: '<1M', label: '<1M'},
  {value: '<5M', label: '<5M'},
  {value: '<10M', label: '<10M'},
]

interface TableStateProps {
  data: Country[]
  searchTerm: string
  populationFilter: string
}
const CountryTable: React.FC = () => {
  const {countries, isLoading, fetchData} = useCountries()
  const [tableState, updateTableState] = useReducer(
    (
      prev: TableStateProps,
      next: Partial<TableStateProps>
    ): TableStateProps => {
      return {...prev, ...next}
    },
    {
      data: [],
      searchTerm: '',
      populationFilter: '',
    }
  )

  const columns = useMemo<ColumnDef<Country>[]>(
    () => [
      {
        header: 'Country Name',
        accessorKey: 'name',
      },
      {
        header: 'Code',
        accessorKey: 'abbreviation',
      },
      {
        header: 'Capital',
        accessorKey: 'capital',
      },
      {
        header: 'Ph Code',
        accessorKey: 'phone',
      },
      {
        header: 'Population',
        accessorKey: 'population',
      },
      {
        header: 'Flag',
        accessorKey: 'media.flag',
        cell: ({getValue}) => {
          const flag = getValue<string>()
          return flag !== 'N/A' ? <img src={flag} alt='Flag' /> : 'N/A'
        },
      },
      {
        header: 'Emblem',
        accessorKey: 'media.emblem',
        cell: ({getValue}) => {
          const emblem = getValue<string>()
          return emblem !== 'N/A' ? <img src={emblem} alt='Emblem' /> : 'N/A'
        },
      },
    ],
    []
  )

  const handleSearch = useCallback((value: string) => {
    updateTableState({searchTerm: value})
  }, [])

  const handlePopulation = useCallback((value: string) => {
    updateTableState({populationFilter: value})
  }, [])

  const handleClearFilters = useCallback(() => {
    updateTableState({
      searchTerm: '',
      populationFilter: '',
    })
  }, [])

  const filteredCountries = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  const searchCriteria = useMemo(
    () => ({
      searchTerm: tableState.searchTerm,
      minPopulation: tableState.populationFilter
        ? parseInt(tableState.populationFilter.split('<')[1])
        : undefined,
    }),
    [tableState]
  )

  return (
    <div className='table-container'>
      <div className='table-container-filters'>
        <div className='table-container-filters-left'>
          <SearchInput
            value={tableState?.searchTerm}
            onChange={handleSearch}
            placeholder='Search countries...'
          />
          <Select
            value={tableState?.populationFilter}
            onChange={handlePopulation}
            options={populationRanges}
          />
          <Button
            className='secondary-btn'
            label='Clear'
            onClick={handleClearFilters}
          />
        </div>
        <Button
          className={`primary-btn ${isLoading ? 'disabled-btn' : ''}`}
          label='Show all countries'
          onClick={filteredCountries}
          disabled={isLoading}
        />
      </div>
      <Table
        data={countries ?? []}
        columns={columns}
        searchCriteria={searchCriteria}
        isLoading={isLoading}
      />
    </div>
  )
}
export default CountryTable
