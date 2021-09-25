import { useDisclosure } from '@chakra-ui/react'
import { createContext, Dispatch, MutableRefObject, ReactNode, useContext, useRef, useState } from 'react'
import JukeBox from '../components/JukeBox'
import ScreenVideo from '../components/ScreenVideo'

interface ModalProviderProp {
  children: ReactNode
}

interface ModalContextProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  modalBody: any
  setModalBody: Dispatch<any>
  modalTitle: string
  setModalTitle: Dispatch<string>
  modalMaxWidth: string
  setModalMaxWidth: Dispatch<any>
  modalBackground: string
  setModalBackground: Dispatch<string>
  openVideoScreen: () => void
  openJukeBox: () => void
  musicRef: MutableRefObject<any>
  startMusic: () => void
  setShowMusic: Dispatch<string>
  showMusic: string
}

export const ModalContext = createContext({} as ModalContextProps)

export function ModalProvider({ children }: ModalProviderProp) {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false })
  const [modalBody, setModalBody] = useState(undefined)
  const [modalTitle, setModalTitle] = useState('')
  const [modalMaxWidth, setModalMaxWidth] = useState('80%')
  const [modalBackground, setModalBackground] = useState(null)
  const musicRef = useRef(null)
  const [showMusic, setShowMusic] = useState('hidden')

  function startMusic() {
    musicRef.current.play()
    // som 20%
    musicRef.current.volume = 0.2
  }

  function pauseMusic() {
    musicRef.current.pause()
  }

  function openVideoScreen() {
    onOpen()
    setModalTitle(null)
    setModalBody(<ScreenVideo />)
    setModalMaxWidth('80%')
    setModalBackground('transparent')
  }

  function openJukeBox() {
    onOpen()
    setModalTitle(null)
    setModalBody(<JukeBox />)
    setModalMaxWidth('80%')
    setModalBackground('transparent')
  }

  return(
    <ModalContext.Provider value={{
      isOpen,
      onClose,
      onOpen,
      musicRef,
      modalBody,
      setModalBody,
      modalTitle,
      setModalTitle,
      modalMaxWidth,
      setModalMaxWidth,
      modalBackground,
      setModalBackground,
      openVideoScreen,
      openJukeBox,
      startMusic,
      showMusic, 
      setShowMusic
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)

  return context
}

