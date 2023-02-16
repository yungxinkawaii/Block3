import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
	useToast,
	InputRightElement,
	InputGroup,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

export default function SignIn() {
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const toast = useToast()
	const navigate = useNavigate()

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault()
			setIsLoading(true)
			try {
				const response = await fetch(
					process.env.REACT_APP_API_URL + '/api/auth/signin',
					{
						method: 'POST',
						body: JSON.stringify({ username, password }),
						headers: { 'Content-Type': 'application/json' },
					}
				)
				const data = await response.json()
				if (!response.ok) {
					toast({
						title: 'Error.',
						description: data.message,
						status: 'error',
						duration: 3000,
						isClosable: true,
					})
				} else {
					localStorage.setItem('accessToken', data.accessToken)
					toast({
						title: 'Success.',
						description: 'Signed in successfully',
						status: 'success',
						duration: 3000,
						isClosable: true,
					})
					navigate('/')
				}
			} catch (error) {
				console.error(error)
			}
			setIsLoading(false)
		},
		[username, navigate, toast, password]
	)

	return (
		<Flex
			minH={'vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'2xl'} py={8} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'} textAlign="center">
						Sign in to your account
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to enjoy all of our cool{' '}
						<Link color={'secondary.400'}>features</Link> ✌️
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id="username" isRequired>
							<FormLabel>Username</FormLabel>
							<Input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<InputRightElement h={'full'}>
									<Button
										variant={'ghost'}
										onClick={() =>
											setShowPassword((showPassword) => !showPassword)
										}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loading={isLoading}
								onClick={handleSubmit}
								size="lg"
								bg={'secondary.400'}
								color={'white'}
								_hover={{
									bg: 'secondary.500',
								}}
							>
								Sign in
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={'center'}>
								Don't have an account?{' '}
								<Link color={'blue.400'} as={RouterLink} to={'/signup'}>
									Sign up
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	)
}
