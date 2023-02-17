import React, { useState, useEffect } from 'react'
import { useForumContext } from '../context/forum'
import { useParams } from 'react-router-dom'
import {
	Avatar,
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	Image,
	Text,
} from '@chakra-ui/react'

const Forum = () => {
	const [comments, setComments] = useState([])
	const [forum, setForum] = useState({})
	const { getForumComments, commentForum, getForum } = useForumContext()

	const { forumID } = useParams()

	useEffect(() => {
		console.log(`/forum/${forumID}`)
	}, [forumID])

	// get forum content
	useEffect(() => {
		const fetchData = async () => {
			const result = await getForum(parseInt(forumID))
			setForum(result)
		}

		fetchData()
	}, [forumID, getForum])

	// get forum comment
	useEffect(() => {
		const fetchData = async () => {
			const result = await getForumComments(parseInt(forumID))
			console.log(result)
			setComments(result)
		}

		fetchData()
	}, [forumID, getForumComments])

	// const handleSubmit = async (e) => {
	// 	e.preventDefault()
	// 	if (commentText.trim() === '') {
	// 		return
	// 	}
	// 	await commentForum(forum.id, commentText)
	// 	setCommentText('')
	// 	const result = await getForumComments(forum.id)
	// 	setComments(result)
	// }

	return (
		<Card maxW="full">
			<CardHeader>
				<Flex spacing="4">
					<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
						<Avatar src="https://api.dicebear.com/5.x/thumbs/svg?seed=Felix" />
						<Box>
							<Heading size="sm">
								{/* {forum.creator.substr(0, 6)}
								...
								{forum.creator.substr(-4)} */}
							</Heading>
						</Box>
					</Flex>
				</Flex>
			</CardHeader>
			<CardBody py="2">
				<Heading size="s" textTransform="uppercase" pb="4">
					{forum.title}
				</Heading>
				<Image objectFit="cover" src={forum.image} />
				<Text noOfLines={3}>{forum.description}</Text>
			</CardBody>

			<CardFooter
				justify="space-between"
				flexWrap="wrap"
				sx={{
					'& > button': {
						minW: '136px',
					},
				}}
			/>
		</Card>
	)
}

export default Forum
