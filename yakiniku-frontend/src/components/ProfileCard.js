import { Avatar, Badge, Box, Heading, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useProfileContext } from '../context/profile'

const ProfileCard = () => {
	const { getProfile, address } = useProfileContext()

	const [profile, setProfile] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			const result = await getProfile(address)
			setProfile(result)
		}
		fetchData()
	}, [address, getProfile])

	if (!address) {
		return (
			<Box maxW={{ base: 'full', md: '360px' }} w="full" p={6}>
				<Text textAlign="center" color="gray.400">
					Please connect your wallet.
				</Text>
			</Box>
		)
	} else if (!profile.name) {
		return (
			<Box maxW={{ base: 'full', md: '360px' }} w="full" p={6}>
				<Text textAlign="center" color="gray.400">
					No profile found for this address.
				</Text>
			</Box>
		)
	}

	return (
		<Box
			maxW={{ base: 'full', md: '360px' }}
			w="full"
			boxShadow="2xl"
			rounded="lg"
			border="1px"
			borderColor="gray.600"
			p={6}
			textAlign="center"
		>
			<Avatar
				size="xl"
				src="https://api.dicebear.com/5.x/micah/svg"
				alt="Avatar Alt"
				mb={4}
				pos="relative"
				_after={{
					content: '""',
					w: 4,
					h: 4,
					bg: 'green.300',
					border: '2px solid white',
					rounded: 'full',
					pos: 'absolute',
					bottom: 0,
					right: 3,
				}}
			/>
			<Heading fontSize="2xl" fontFamily="body">
				@{profile.name}
			</Heading>
			<Text textAlign={'center'} color="gray.400" px={3}>
				Penultimate Comp Sci at Block University. Lover of all things Python and
				Go.
			</Text>
			<Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
				<Badge px={2} py={1} bg="gray.800" fontWeight={'400'}>
					#CompSci
				</Badge>
				<Badge px={2} py={1} bg="gray.800" fontWeight={'400'}>
					#blogchain
				</Badge>
			</Stack>
		</Box>
	)
}

export default ProfileCard
