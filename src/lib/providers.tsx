'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'

interface ProvidersProps extends PropsWithChildren {}

const queryClient = new QueryClient()

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default Providers
