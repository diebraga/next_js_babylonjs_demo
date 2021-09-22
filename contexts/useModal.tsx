import { useDisclosure } from '@chakra-ui/react'
import { createContext, Dispatch, ReactNode, useContext, useState } from 'react'

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
}

export const ModalContext = createContext({} as ModalContextProps)

export function ModalProvider({ children }: ModalProviderProp) {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false })
  const [modalBody, setModalBody] = useState(undefined)
  const [modalTitle, setModalTitle] = useState('')
  const [modalMaxWidth, setModalMaxWidth] = useState('80%')
  const [modalBackground, setModalBackground] = useState(null)

  function openVideoScreen() {
    onOpen()
    setModalTitle(null)
    setModalBody('')
    setModalMaxWidth('80%')
    setModalBackground('transparent')
  }

  return(
    <ModalContext.Provider value={{
      isOpen,
      onClose,
      onOpen,
      modalBody,
      setModalBody,
      modalTitle,
      setModalTitle,
      modalMaxWidth,
      setModalMaxWidth,
      modalBackground,
      setModalBackground,
      openVideoScreen
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)

  return context
}

