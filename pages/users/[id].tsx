import { Box, Button, Flex, FormLabel, Heading, Input, Link as ChakraLink, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { GetServerSideProps } from "next";
import { useSWRConfig } from 'swr'
import { getUserById } from "../../hooks/users"
import { useSession } from "next-auth/client"
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react';

type UserProps = {
  id: string
}

export default function User({ id }: UserProps) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const [isUpdating, setIsUpdating] = useState(false)
  const { mutate } = useSWRConfig()

  const [session, isLoading] = useSession()
  const { user } = getUserById(id)

  type FormData = {
    name: string
  }

  const handleUpdate: SubmitHandler<FormData> = async (formData) => {  
    mutate(`/api/users/${id}`, { ...user, name: formData.name }, false)
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    mutate(`/api/users/${id}`)
    reset()
    setIsUpdating(false)
  }

  return (
    <>
      <Flex w='100vw' h='100vh' align='center' justify='center'>
        <Box>
          {!session && <Heading mb='40px' fontSize='40px'>Signin to see details</Heading>}
          {session && <>
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

            <Link href='/users'>
              <ChakraLink color='blue.500'>
                Users
              </ChakraLink>
            </Link>

              <Heading mb='40px' fontSize='40px'>User</Heading>

                <Text as='h1'>
                  ID: {user?.id}
                </Text>
                <Text as='h1'>
                  Name: {user?.name}
                </Text>
                <Text as='h1'>
                  Email: {user?.email}
                </Text>
                {session.user.email === user?.email && (
                  <>
                  {!isUpdating ? (
                    <ChakraLink color='blue.500' onClick={() => setIsUpdating(true)}>
                      Edit
                    </ChakraLink>                  
                  ) : (
                    <>
                    <ChakraLink color='red.400' onClick={() => setIsUpdating(false)}>
                      Cancel
                    </ChakraLink>
                    <form onSubmit={handleSubmit(handleUpdate)}>
                      <FormLabel>
                        Name
                        <Input mt='1' {...register('name', {required: true})} defaultValue={user?.name}/>
                        <Button mt='2' isLoading={isSubmitting} type='submit'>Submit</Button>
                      </FormLabel>
                    </form>
                    </>
                  )}
                  </>
                )}
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

