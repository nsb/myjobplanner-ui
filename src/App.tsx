import React, { useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Logo } from './Logo'
import useBusinesses from './useBusinesses'
import { store } from './Store'

function App () {
  const { isLoading, error, isAuthenticated, loginWithRedirect, getAccessTokenSilently, user } = useAuth0()
  const [state, dispatch] = useContext(store)
  useBusinesses(dispatch, getAccessTokenSilently)

  const {
    businesses: {
      results: businesses,
      isLoading: businessesIsLoading
    }
  } = state

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  if (isLoading) {
    return (
      <Box textAlign="center">
        <Text>Loading...</Text>
      </Box>
    )
  }

  if (!isAuthenticated) {
    loginWithRedirect()
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
          { user && (
            <div>
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              { !businessesIsLoading && JSON.stringify(businesses) }
            </div>)
          }
          </VStack>
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

export default App
