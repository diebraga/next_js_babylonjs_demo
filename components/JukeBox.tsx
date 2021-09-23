import { Button, Center, Wrap } from "@chakra-ui/react";
import { useState } from "react";

export default function JukeBox() {
  const [music, setMusic] = useState('/sounds/sound1.mp3')

  return (
    <Center mt='20%' flexDir='column'>
      <Wrap mb='5' spacing='3'>
        <Button
          onClick={() => setMusic('/sounds/bossanova.mp3')}
          isActive={music === '/sounds/bossanova.mp3'}
          colorScheme='blue'>
          Bossa Nova
        </Button>
        <Button
          onClick={() => setMusic('/sounds/sound1.mp3')}
          isActive={music === '/sounds/sound1.mp3'}
          // variant='link'
          colorScheme='blue'>
          Sound
        </Button>
      </Wrap>
      <audio
        // ref={musicRef}
        src={music}
        loop
        controls
      />
    </Center>
  )
}