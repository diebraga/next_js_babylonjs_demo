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

  async function updateUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const response = await fetch('/api/users/6', {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: 'Diego Braga'
      })
    })
    const data = await response.json()
    console.log(data)
  }

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

        <Flex position='absolute' left='2' top='2'>
          {!session ? 
          <>
            <Button onClick={() => signIn()}>
              Sign in
            </Button>
            </>
            : 
            <>
            <Avatar name={session.user.name} src={session.user.image} size='md'/>
            <Box ml='5'>
              <Text>{session.user.email}</Text>
              <Button onClick={(): Promise<void> => signOut()}>
                Sign out
              </Button>
            </Box>
          </>}

        </Flex>
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
            <form onSubmit={updateUser}>
              <Button type='submit'>Submit</Button>
            </form>
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
                      <ChakraLink>
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

