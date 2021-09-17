import { Box, Button, Flex, Heading, Link as ChakraLink, Text, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import ThemeToggle from '../components/ThemeToggle'
import * as JSONplaceholderController from '../controllers/users'
import { useSession, signIn, signOut } from "next-auth/client"

export default function Users() {
  const [session, isLoading] = useSession()

  const { users } = JSONplaceholderController.getUsers()

  return (
    <>
      <Head>
        <title>Users Page</title>
        <meta name="description" content="Home page dash.io" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w='100vw' h='100vh' align='center' justify='center'>
        <Box position='absolute' right='2' top='2'>
          <ThemeToggle />
        </Box>
        {!session && <>
        Not signed in <br/>
        <Button onClick={(): Promise<void> => signIn('github')}>
          Sign in
        </Button>
      </>}
      {session && <>
        Signed in as {session.user.email} <br/>
        <Button onClick={(): Promise<void> => signOut()}>
          Sign out
        </Button>
      </>}

        <Box>
          <VStack alignItems='flex-start'>
            <Link href='/demo'>
              <ChakraLink color='blue.500'>
                See Scene demo
              </ChakraLink>
            </Link>

            <Link href='/'>
              <ChakraLink color='blue.500'>
                Home
              </ChakraLink>
            </Link>
            <Heading mb='40px' fontSize='40px'>Users</Heading>
            {users?.map((user, index) => {          
              return (
                <Flex key={index}>
                  <Text as='h1'>
                    {user.name}
                  </Text>
                </Flex>
              )
            })}
          </VStack>
        </Box>
      </Flex>
    </>
  )
}

