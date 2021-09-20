import { Box } from "@chakra-ui/react";
import MotionBox from "./MotionBox";

export default function GameLoading() {
  return (
    <>
      <div id="loadingScreen">
        <MotionBox
          animate={{ y: 20, x: 30 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
          width={["100%", "70%", "60%", "60%"]}
          margin="0 auto"
          mb='100px'
        >
          <Box textAlign='center' fontSize='130px'>
            🚀
          </Box>
        </MotionBox>
        <p className="animate-fading" >Hold on, it will take a second 😊!</p>
        <p id="loadingScreenPercent"></p>
      </div>
    </>
  )
}