import React, { useState } from 'react'

import {
	Avatar,
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	IconButton,
	Image,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useDisclosure,
	ModalFooter,
	FormControl,
	Input,
} from '@chakra-ui/react'

import { useForumContext } from '../context/forum'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'

// create comment modal
const CommentModal = ({ forum_id }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [comment, setComment] = useState({ text: '', forumID: forum_id })
	const { addComment } = useForumContext()

	const handleAddComment = async (event) => {
		event.preventDefault()

		await addComment(comment.text, comment.forumID)
		setComment({ ...comment, text: '' })
	}

	//handle change
	const handleChange = (event) => {
		setComment({ ...comment, [event.target.name]: event.target.value })
	}

	return (
		<>
			<Button flex="1" variant="ghost" onClick={onOpen}>
				Add Comment
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add comment</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleAddComment}>
							<FormControl isRequired>
								<Input
									variant="flushed"
									placeholder="Add your comment"
									name="text"
									value={comment.text}
									onChange={handleChange}
									isRequired
								/>
							</FormControl>
							<Button colorScheme={'primary'} type="submit" my="4">
								Post Comment
							</Button>
						</form>
					</ModalBody>
					<ModalFooter />
				</ModalContent>
			</Modal>
		</>
	)
}

const ForumCard = ({
	id,
	username,
	creator,
	title,
	description,
	image,
	onClick,
}) => {
	return (
		<Card maxW="full">
			<CardHeader>
				<Flex spacing="4">
					<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
						<Avatar src="https://api.dicebear.com/5.x/thumbs/svg?seed=Felix" />
						<Box>
							<Heading size="sm">
								{username ? `@${username}` : 'Anonymous'} (
								{creator.substr(0, 6)}
								...
								{creator.substr(-4)})
							</Heading>
						</Box>
					</Flex>
					<IconButton
						variant="ghost"
						colorScheme="gray"
						aria-label="See post"
						as={RouterLink}
						to={`/forum/${id}`}
						icon={<ExternalLinkIcon />}
					/>
				</Flex>
			</CardHeader>
			<CardBody py="2">
				<Heading size="s" textTransform="uppercase" pb="4">
					{title}
				</Heading>
				<Image objectFit="cover" src={image} w="auto" />
				<Text noOfLines={3}>{description}</Text>
			</CardBody>

			<CardFooter
				justify="space-between"
				flexWrap="wrap"
				sx={{
					'& > button': {
						minW: '136px',
					},
				}}
			>
				<Button flex="1" variant="ghost">
					Like
				</Button>
				<CommentModal forum_id={id} />
			</CardFooter>
		</Card>
	)
}

export default ForumCard
