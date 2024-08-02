import {FC} from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import './styles/app.scss'
import CountryTable from './Components/CountryTable'

const queryClient = new QueryClient()

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className='app'>
        <div className='container'>
          <h1>Countries Info</h1>
          <CountryTable />
        </div>
      </main>
    </QueryClientProvider>
  )
}

export default App
