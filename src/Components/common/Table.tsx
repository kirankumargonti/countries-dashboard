import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
} from '@tanstack/react-table'
import {Country} from '../../lib/types'
import {useMemo} from 'react'

interface SearchCriteria {
  searchTerm?: string
  minPopulation?: number
}

interface TableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  searchCriteria: SearchCriteria
  isLoading: boolean
}

export function Table<T extends Country>({
  data,
  columns,
  searchCriteria,
  isLoading,
}: TableProps<T>) {
  const filteredData = useMemo(() => {
    return data.filter((country) => {
      const matchesSearch =
        !searchCriteria.searchTerm ||
        country.name
          .toLowerCase()
          .includes(searchCriteria.searchTerm.toLowerCase())

      const populationThreshold =
        searchCriteria.minPopulation !== undefined
          ? parseInt(searchCriteria.minPopulation.toString(), 10)
          : NaN
      const matchesPopulation =
        !searchCriteria.minPopulation ||
        isNaN(populationThreshold) ||
        country.population >= populationThreshold

      return matchesSearch && matchesPopulation
    })
  }, [data, searchCriteria])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <table className='table'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && (
        <div className='loading'>
          <h3>Loading ...</h3>
        </div>
      )}
      <div className='pagination'>
        <button
          className='button-pagination'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className='button-pagination'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className='button-pagination'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className='button-pagination'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span style={{marginLeft: '1rem'}}>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
      </div>
    </>
  )
}
