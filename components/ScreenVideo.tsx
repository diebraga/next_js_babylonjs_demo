import { Box, Center } from "@chakra-ui/react";

export default function ScreenVideo() {
  return (
    <Center mt='28px'>
      <Box
        as='iframe'
        borderRadius='30px'
        width="80%"
        height="600px"
        src='https://www.youtube.com/embed/uD4izuDMUQA' />
    </Center>
  )
}
