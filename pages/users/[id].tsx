import { Box, Flex, Heading, Link as ChakraLink, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { GetServerSideProps } from "next";
import ThemeToggle from "../../components/ThemeToggle";
import { getUserById } from "../../hooks/users"
import { useSession } from "next-auth/client"

type UserProps = {
  id: string
}

export default function User({ id }: UserProps) {
  const [session, isLoading] = useSession()
  const { user } = getUserById(id)

  return (
    <>
      <Flex w='100vw' h='100vh' align='center' justify='center'>
        <Box>
          {!session && <Heading mb='40px' fontSize='40px'>Signin to see details</Heading>}
          {session && <>
            <Heading mb='40px' fontSize='40px'>User</Heading>
              <VStack alignItems='flex-start'>
                <Text as='h1'>
                  ID: {user?.id}
                </Text>
                <Text as='h1'>
                  Name: {user?.name}
                </Text>
                <Text as='h1'>
                  Email: {user?.email}
                </Text>
              </VStack>
          </>}
        </Box>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => { 
  const { id } = ctx.query
  return {
    props: {
      id,
    },
  };
};

