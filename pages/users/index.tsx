import { Avatar, Box, Button, Flex, Heading, Link as ChakraLink, Text, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import ThemeToggle from '../../components/ThemeToggle'
import { getUsers } from '../../hooks/users'
import { useSession, signIn, signOut } from "next-auth/client"
import { FormEvent } from 'react'

export default function Users() {
  const [session, isLoading] = useSession()

  const { users } = getUsers()

  return (
    <>
      <Head>
        <title>Users Page</title>
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

            <Link href='/'>
              <ChakraLink color='blue.500'>
                Home
              </ChakraLink>
            </Link>
            {!session && <Heading mb='40px' fontSize='40px'>Signin to see users</Heading>}
            {session && <>
              <Heading mb='40px' fontSize='40px'>Users</Heading>
              {users?.map((user, index) => {          
                return (
                  <Flex key={index}>
                    <Text as='h1' mr='4'>
                      {user.email}
                    </Text>
                    <Link href={`/users/${user.id}`}>
                      <ChakraLink color='blue.500'>
                        See details
                      </ChakraLink>
                    </Link>
                  </Flex>
                )
              })}
            </>}
          </VStack>
        </Box>
      </Flex>
    </>
  )
}

