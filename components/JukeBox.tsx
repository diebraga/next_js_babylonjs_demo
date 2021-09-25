import { Button, Center, CloseButton, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import { useModal } from "../contexts/useModal";
import { useLocalStorage } from "../utils/useLocalStorage";

export default function JukeBox() {
  const [music, setMusic] = useLocalStorage('currentRadio', '')
  const { musicRef, startMusic, showMusic, setShowMusic } = useModal()

  function playMusic(path: string) {
    setMusic(path)
    setTimeout(function(){
      startMusic()
    }, 1000)
  }

  return (
    <Center
      position='absolute' 
      bg=''
      top='50%' 
      p='50px'
      borderRadius='30px'
      // @ts-ignore
      visibility={showMusic}
      left='50%' 
      style={{ transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.5)' }} 
      flexDir='column'>
      <Wrap mb='5' spacing='3'>
        <Button
          onClick={() => playMusic('/sounds/bossanova.mp3')}
          isActive={music === '/sounds/bossanova.mp3'}
          colorScheme='blue'>
          bossanova radio
        </Button>
        <Button
          onClick={() => playMusic('/sounds/deephouse.mp3')}
          isActive={music === '/sounds/deephouse.mp3'}
          colorScheme='blue'>
          deephouse radio
        </Button>
        <CloseButton onClick={() => setShowMusic('hidden')} />
      </Wrap>
      <audio
        ref={musicRef}
        src={music}
        loop
        controls
      />
    </Center>
  )
}