import GeneralModal from "../components/GeneralModal"
import JukeBox from "../components/JukeBox"
import { ModalProvider } from "../contexts/useModal"
import DemoScene from "../environment/DemoScene"

export default function Demo() {
  return (
    <ModalProvider>
      <JukeBox />
      <GeneralModal />
      <DemoScene />
    </ModalProvider>
  )
}
