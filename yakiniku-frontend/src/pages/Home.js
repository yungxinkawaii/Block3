import {
	Button,
	Card,
	CardBody,
	Flex,
	Heading,
	Input,
	Spinner,
	Stack,
	FormControl,
	Textarea,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ForumCard from '../components/ForumCard'
import ProfileCard from '../components/ProfileCard'
import { useForumContext } from '../context/forum'

export default function Home() {
	const { getAllForums } = useForumContext()
	const [forums, setForums] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			setLoading(true)
			const forums = await getAllForums()
			setForums(forums)
			setLoading(false)
		}

		fetchData()
	}, [getAllForums])

	const navigate = useNavigate()
	const handleNavigate = (forum) => {
		navigate(`/forum/${forum.id}`, { state: forum })
	}

	const [form, setForm] = useState({
		title: '',
		description: '',
		image: '',
	})
	const { createForum } = useForumContext()

	const handleChange = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		console.log('submitting submit', event)
		await createForum(form)
		setForm({
			title: '',
			description: '',
			image: '',
		})
	}

	return (
		<Flex flexDir={{ base: 'column', md: 'row' }} w="100%">
			<Stack
				width={{ base: '100%', md: '75%' }}
				spacing="4"
				pe={{ base: '0', md: '4' }}
				py={{ base: '4', md: '0' }}
			>
				<Card maxW="full" variant={'elevated'}>
					<CardBody py="2">
						<Heading size="md" py="4">
							Something on your mind?
						</Heading>
						<form onSubmit={handleSubmit}>
							<FormControl isRequired>
								<Input
									variant="flushed"
									placeholder="Forum Title"
									name="title"
									value={form.title}
									onChange={handleChange}
									isRequired
									mb="4"
								/>
							</FormControl>
							<FormControl isRequired>
								<Textarea
									placeholder="Forum Description"
									name="description"
									value={form.description}
									onChange={handleChange}
									isRequired
									mb="4"
								/>
							</FormControl>
							<Button colorScheme={'primary'} type="submit" mb="4">
								Publish
							</Button>
						</form>
					</CardBody>
				</Card>
				{loading ? (
					<Spinner size="xl" />
				) : (
					forums
						.slice()
						.reverse()
						.map((forum) => (
							<ForumCard
								username={forum.username}
								creator={forum.creator}
								id={forum.id}
								key={forum.id}
								title={forum.title}
								description={forum.description}
								image={forum.image}
								onClick={() => handleNavigate(forum)}
							/>
						))
				)}
			</Stack>
			<Flex
				width={{ base: '100%', md: '25%' }}
				h="fit-content"
				order={{ base: '-1', md: '0' }}
			>
				<ProfileCard />
			</Flex>
		</Flex>
	)
}
