'use client'

import { createApolloClient } from '@/lib/apollo'
import { ApolloProvider } from '@apollo/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
const apolloClient = createApolloClient()

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ApolloProvider client={apolloClient}>
                {children}
            </ApolloProvider>
        </QueryClientProvider>
    )
} 