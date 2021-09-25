import { Box, Center } from "@chakra-ui/react";
import { useModal } from "../contexts/useModal";

export default function ScreenVideo() {
  const { videoUrl } = useModal()

  return (
    <Center mt='28px'>
      <Box
        as='iframe'
        borderRadius='30px'
        width="80%"
        height="600px"
        src={videoUrl} />
    </Center>
  )
}
