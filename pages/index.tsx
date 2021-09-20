import { Box, Flex, Heading, Link as ChakraLink, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import MotionBox from '../components/MotionBox'
import Link from 'next/link'
import ThemeToggle from '../components/ThemeToggle'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page dash.io" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w='100vw' h='100vh' align='center' justify='center'>
        <Box>
          <VStack alignItems='flex-start'>
            <Link href='/demo'>
              <ChakraLink color='blue.500'>
                See Scene demo
              </ChakraLink>
            </Link>

            <Link href='/users'>
              <ChakraLink color='blue.500'>
                Users List
              </ChakraLink>
            </Link>
          </VStack>
          <MotionBox
            animate={{ y: 50, scale: 0.97, }}
            transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
            marginY={8}
            maxWidth={[280, 400]}
            marginX="auto"          
          >
            <Heading mb='40px' fontSize='40px'>BabylonJS Next-Auth Starter</Heading>
              <Box textAlign='center' fontSize='70px'>
                🚀
              </Box>
          </MotionBox>
        </Box>
      </Flex>
    </>
  )
}
