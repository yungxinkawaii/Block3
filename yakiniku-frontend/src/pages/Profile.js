import React, { useState, useEffect } from 'react'
import {
	Avatar,
	Badge,
	Box,
	Card,
	CardBody,
	Flex,
	Heading,
	Image,
	IconButton,
	Spacer,
	Spinner,
	Stack,
	Text,
	FormControl,
	FormLabel,
	Input,
	Button,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useForumContext } from '../context/forum'
import { useProfileContext } from '../context/profile'

const ForumCardNoTitle = ({ title, description, image, onClick }) => (
	<Card maxW="full">
		<CardBody py="4">
			<Flex flexDir="col">
				<Heading size="s" textTransform="uppercase" pb="4">
					{title}
				</Heading>
				<Spacer />
				<IconButton
					variant="ghost"
					colorScheme="gray"
					aria-label="See post"
					icon={<ExternalLinkIcon />}
				/>
			</Flex>
			<Image objectFit="cover" src={image} />
			<Text noOfLines={3}>{description}</Text>
		</CardBody>
	</Card>
)

const Profile = () => {
	const [profile, setProfile] = useState({})
	const { getProfile, address } = useProfileContext()
	const { getForumsByCreator } = useForumContext()
	const [forums, setForums] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const result = await getProfile(address)
			setProfile(result)
		}
		fetchData()
	}, [address, getProfile])

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			const forums = await getForumsByCreator(address)
			setForums(forums)
			setLoading(false)
		}
		fetchData()
	}, [address, getForumsByCreator])

	const navigate = useNavigate()

	const handleNavigate = (forum) => {
		navigate(`/forum/${forum.id}`, { state: forum })
	}

	const [form, setForm] = useState({
		name: '',
		bio: '',
		image: '',
	})

	const { createProfile, connect } = useProfileContext()

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!connect) return
		if (!form.name || !form.bio || !form.image) return

		createProfile(form)
	}

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	return (
		<Flex flexDir={'col'} w="100%">
			{/* if profile does not exist, show form */}
			{!profile.name ? (
				<>
					<Box
						rounded={'lg'}
						bg="white"
						_dark={{ bg: 'gray.700' }}
						boxShadow={'lg'}
						p={8}
					>
						<form onSubmit={handleSubmit}>
							<Stack spacing={4}>
								<FormControl>
									<FormLabel>Name</FormLabel>
									<Input
										type="text"
										id="name"
										name="name"
										value={form.name}
										onChange={handleChange}
									/>
								</FormControl>
								<FormControl>
									<FormLabel>Bio</FormLabel>
									<Input
										type="text"
										id="bio"
										name="bio"
										value={form.bio}
										onChange={handleChange}
									/>
								</FormControl>
								<FormControl>
									<FormLabel>Upload Image</FormLabel>
									<Input
										type="text"
										id="image"
										name="image"
										value={form.image}
										onChange={handleChange}
									/>
								</FormControl>
								<Button colorScheme="primary" type="submit">
									Create Profile
								</Button>
							</Stack>
						</form>
					</Box>
				</>
			) : (
				// TODO: make profile here dynamic also with ProfileCard.
				<>
					<Box
						maxW="320px"
						w="full"
						boxShadow="2xl"
						rounded="lg"
						border="1px"
						borderColor="gray.600"
						p={6}
						textAlign="center"
						me="4"
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
							{profile.name}
						</Heading>
						<Text fontWeight={600} color={'gray.500'} mb={4}>
							@John_Doe
						</Text>
						<Text textAlign={'center'} color="gray.400" px={3}>
							Penultimate Comp Sci at Block University. Lover of all things
							Python and Go.
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
					<Box width="75%">
						<Tabs variant="enclosed">
							<TabList>
								<Tab>Forum</Tab>
								<Tab>Comments</Tab>
							</TabList>

							<TabPanels py="4">
								<TabPanel p="0">
									<Stack spacing="4">
										{/* <ForumCardNoTitle title="Forum Title" description="Forum Description" /> */}
										{loading ? (
											<Spinner size="xl" />
										) : (
											// getForums by ID
											forums.map((forum) => (
												<ForumCardNoTitle
													key={forum.id}
													title={forum.title}
													description={forum.description}
													image={forum.image}
													onClick={() => handleNavigate(forum)}
												/>
											))
										)}
									</Stack>
								</TabPanel>
								<TabPanel>
									<p>two!</p>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Box>
				</>
			)}
		</Flex>
	)
}

export default Profile
