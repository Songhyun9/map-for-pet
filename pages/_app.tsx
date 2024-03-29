import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react'

declare global {
    interface Window {
        kakao: any
    }
}

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
            </Hydrate>
        </QueryClientProvider>
    )
}
