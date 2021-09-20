import { ChakraProvider } from '@chakra-ui/react'
import "../styles/global.scss"
import { AppProps } from 'next/app'
import { theme } from '../styles/theme'
import { SWRConfig } from 'swr'
import { fetcher } from '../utils/swrFetcher'
import { Provider } from "next-auth/client"
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}> 
      <Provider session={pageProps.session}>
        <SWRConfig value={{ fetcher }}>
          <Header />
          <Component {...pageProps} />
        </SWRConfig>
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
