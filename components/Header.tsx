import { Avatar, Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import ThemeToggle from "./ThemeToggle";
import { useSession, signIn, signOut } from "next-auth/client"

export default function Header() {
  const [session, isLoading] = useSession()

  return (
    <>
      <HStack justify='space-around' h='80px'>
        <Flex align='center'>
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
          <ThemeToggle />
        </Box>

      </HStack>
    </>
  )
}
