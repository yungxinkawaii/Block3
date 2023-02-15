import {
	Flex,
	Box,
	Input,
	Stack,
	Button,
	Heading,
	Text,
	Container,
	SimpleGrid,
	useBreakpointValue,
	AvatarGroup,
	Avatar,
	FormControl,
	FormLabel,
	useColorModeValue,
	Link,
} from '@chakra-ui/react'

import React, { useState } from 'react'
import { useStateContext } from '../context/profile'
import { ConnectWallet } from '@thirdweb-dev/react'
import { Link as RouterLink } from 'react-router-dom'

const avatars = [
	{
		name: 'Ryan Florence',
		url: 'https://bit.ly/ryan-florence',
	},
	{
		name: 'Segun Adebayo',
		url: 'https://bit.ly/sage-adebayo',
	},
	{
		name: 'Kent Dodds',
		url: 'https://bit.ly/kent-c-dodds',
	},
	{
		name: 'Prosper Otemuyiwa',
		url: 'https://bit.ly/prosper-baba',
	},
	{
		name: 'Christian Nwamba',
		url: 'https://bit.ly/code-beast',
	},
]

const SignUp = () => {
	const [form, setForm] = useState({
		name: '',
		bio: '',
		image: '',
	})

	const { SignUp, connect } = useStateContext()

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!connect) return
		if (!form.name || !form.bio || !form.image) return

		SignUp(form)
	}

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}
	const [isLoading, setIsLoading] = useState(false)
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<>
			<ConnectWallet />
			<Container
				as={SimpleGrid}
				maxW={'6xl'}
				columns={{ base: 1, md: 2 }}
				spacing={{ base: 10, lg: 32 }}
				py={{ base: 10, sm: 20, lg: 32 }}
			>
				<Stack spacing={{ base: 10, md: 20 }}>
					<Heading
						lineHeight={1.1}
						fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
					>
						<Text
							as={'span'}
							bgGradient="linear(to-r, secondary.400,primary.400)"
							bgClip="text"
						>
							Join the buzz around your campus
						</Text>
					</Heading>
					<Stack direction={'row'} spacing={4} align={'center'}>
						<AvatarGroup>
							{avatars.map((avatar) => (
								<Avatar
									key={avatar.name}
									name={avatar.name}
									src={avatar.url}
									// size={useBreakpointValue({ base: 'md', md: 'lg' })}
									size="lg"
									position={'relative'}
									zIndex={2}
									_before={{
										content: '""',
										width: 'full',
										height: 'full',
										rounded: 'full',
										transform: 'scale(1.125)',
										bgGradient: 'linear(to-bl, secondary.50,secondary.400)',
										position: 'absolute',
										zIndex: -1,
										top: 0,
										left: 0,
									}}
								/>
							))}
						</AvatarGroup>
						<Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
							+
						</Text>
						<Flex
							align={'center'}
							justify={'center'}
							fontFamily={'heading'}
							fontSize={{ base: 'sm', md: 'lg' }}
							bg={'gray.800'}
							color={'white'}
							rounded={'full'}
							minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
							minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
							position={'relative'}
							_before={{
								content: '""',
								width: 'full',
								height: 'full',
								rounded: 'full',
								transform: 'scale(1.125)',
								bgGradient: 'linear(to-bl, primary.50,primary.400)',
								position: 'absolute',
								zIndex: -1,
								top: 0,
								left: 0,
							}}
						>
							YOU
						</Flex>
					</Stack>
				</Stack>

				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Heading
						lineHeight={1.1}
						fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
					>
						Sign up now!
					</Heading>
					<form onSubmit={handleSubmit}>
						<FormControl id="name" isRequired>
							<FormLabel>Name</FormLabel>
							<Input
								type="text"
								id="name"
								name="name"
								value={form.name}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl id="bio" isRequired>
							<FormLabel>Bio</FormLabel>
							<Input
								type="text"
								id="bio"
								name="bio"
								value={form.bio}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl id="image" isRequired>
							<FormLabel>Image</FormLabel>
							<Input
								type="text"
								id="image"
								name="image"
								value={form.image}
								onChange={handleChange}
							/>
						</FormControl>
						<Button
							loadingText="Submitting"
							isLoading={isLoading}
							w="full"
							mt="4"
							size="lg"
							bg={'secondary.400'}
							color={'white'}
							_hover={{
								bg: 'secondary.500',
							}}
							type="submit"
						>
							Create
						</Button>
					</form>
					<Stack pt={6}>
						<Text align={'center'}>
							Already a user?{' '}
							<Link color={'blue.400'} as={RouterLink} to={'/signin'}>
								Sign in
							</Link>
						</Text>
					</Stack>
				</Box>
			</Container>
		</>
	)
}

export default SignUp
