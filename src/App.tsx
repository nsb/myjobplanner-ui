import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Spinner
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Logo } from './Logo'
import ApiClient from './ApiClient'
import type { Business } from './apiclient'

function App () {
  const { isLoading, error, isAuthenticated, loginWithRedirect, getAccessTokenSilently, user } = useAuth0()
  const [businesses, setBusinesses] = useState<Business[] | undefined>(undefined)

  useEffect(() => {
    const getBusinesses = async () => {
      // const domain = 'localhost:3000'

      try {
        const accessToken = await getAccessTokenSilently({
          audience: 'https://api.myjobplanner.com',
          scope: 'read:business'
        })

        const headers = { Authorization: `Bearer ${accessToken}` }
        const { data } = await ApiClient.findBusinesses(
          0, 20, 'ASC', 'created', { headers }
        )

        setBusinesses(data.data)
      } catch (e) {
        console.log(e)
      }
    }

    getBusinesses()
  }, [getAccessTokenSilently, user?.sub])

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  if (isLoading) {
    return (
      <Box textAlign="center">
        <Spinner />
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
            { JSON.stringify(businesses) }
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
