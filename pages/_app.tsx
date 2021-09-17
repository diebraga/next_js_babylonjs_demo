import { ChakraProvider } from '@chakra-ui/react'
import "../styles/global.scss"
import { AppProps } from 'next/app'
import { SidebarDrawerProvider } from '../contexts/useSidebarDrawer'
import { theme } from '../styles/theme'
import { SWRConfig } from 'swr'
import { AuthProvider } from '../contexts/useAuth';
import { MusicProvider } from '../contexts/useMusic';
import { fetcher } from '../utils/swrFetcher'
import { Provider } from "next-auth/client"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}> 
    <Provider session={pageProps.session}>
      <SWRConfig value={{ fetcher }}>
        <AuthProvider>
          <SidebarDrawerProvider>
            <MusicProvider>
              <Component {...pageProps} />
            </MusicProvider>
          </SidebarDrawerProvider>
        </AuthProvider>
      </SWRConfig>
    </Provider>
    </ChakraProvider>
  )
}

export default MyApp
