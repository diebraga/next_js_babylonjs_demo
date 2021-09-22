import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalContentProps
} from "@chakra-ui/react"
import { ReactNode } from "react"

interface ReusableModalProps extends ModalContentProps {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
  ModalTitle?: string
  contentBody?: ReactNode | string | React.FC | any
  closeButtonColor?: string | any
}

export default function ReusableModal({ 
  isOpen, 
  onClose, 
  children, 
  ModalTitle, 
  contentBody, 
  closeButtonColor,
  ...rest 
}: ReusableModalProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent {...rest}>
          {!!ModalTitle && <ModalHeader>{ModalTitle}</ModalHeader>}
          <ModalCloseButton color={closeButtonColor}/>
          <ModalBody >
            {children}
            {contentBody}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
