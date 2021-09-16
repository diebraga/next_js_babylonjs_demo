import { createContext, ReactNode, useContext } from 'react'
import { useRef } from 'react'
import { useLocalStorage } from '../utils/useLocalStorage'

interface MusicProviderProp {
  children: ReactNode
}

interface MusicContextProps {
  startMusic: () => void
  pauseMusic: () => void
  musicRef: any
  musicStatus: boolean
}

export const MusicContext = createContext({} as MusicContextProps)

export function MusicProvider({ children }: MusicProviderProp) {
  const [musicStatus, setMusicStatus] = useLocalStorage('musicStatus', true)
  const musicRef = useRef(null)

  function startMusic() {
    musicRef.current.play()
    // som 20%
    musicRef.current.volume = 0.2
    setMusicStatus(true)
  }

  function pauseMusic() {
    musicRef.current.pause()
    setMusicStatus(false)
  }

  return(
    <MusicContext.Provider value={{
      startMusic,
      pauseMusic,
      musicRef,
      musicStatus,
    }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)

  return context
}
