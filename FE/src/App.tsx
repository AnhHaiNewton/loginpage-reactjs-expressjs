import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { routes_layout } from './routes'

import GlobalStyles from './theme/globalStyles'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {routes_layout.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <GlobalStyles />
      </QueryClientProvider>
    </Router>
  )
}

export default App
