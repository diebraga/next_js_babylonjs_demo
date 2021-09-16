import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";

import MotionBox from "../components/MotionBox";

const Page404 = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <MotionBox
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        width={["100%", "70%", "60%", "60%"]}
        margin="0 auto"
      >
        <Image
          src="/404 Error-pana.svg"
          alt="Error 404 not found Illustration"
        />
      </MotionBox>

      <Box marginY={4}>
        <Heading textAlign="center">Page not Found.</Heading>

        <Box textAlign="center" marginTop={4}>
          <Text>{"It's Okay!"}</Text>
          <Link href="/" passHref>
            <Button
              backgroundColor={colorMode === "light" ? "gray.300" : "teal.500"}
            >
              {"Let's Head Back"}
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Page404;
