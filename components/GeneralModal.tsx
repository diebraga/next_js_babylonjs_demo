import { useModal } from "../contexts/useModal"
import ReusableModal from "./ReusableModal"

export default function GeneralModal() {
  const { 
    isOpen, 
    onClose, 
    modalBody,
    modalTitle,
    modalMaxWidth,
    modalBackground
  } = useModal()
  return (
    <>
    <ReusableModal 
      isOpen={isOpen}
      onClose={onClose}
      ModalTitle={modalTitle}
      contentBody={modalBody}
      maxW={modalMaxWidth}
      bg={modalBackground}
      h='90%'
      borderRadius='30px'
      closeButtonColor={
        modalBackground === 
        'transparent' ? 'white' : 'black'
      }
    />
    </>     
  )
}
