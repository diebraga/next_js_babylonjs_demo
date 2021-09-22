import GeneralModal from "../components/GeneralModal"
import { ModalProvider } from "../contexts/useModal"
import DemoScene from "../environment/DemoScene"

export default function Demo() {
  return (
    <ModalProvider>
      <GeneralModal />
      <DemoScene />
    </ModalProvider>
  )
}
