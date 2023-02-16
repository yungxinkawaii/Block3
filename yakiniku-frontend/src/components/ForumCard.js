import React from 'react'
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
} from '@chakra-ui/react'

import { ExternalLinkIcon } from '@chakra-ui/icons'

const ForumCard = ({ creator, title, description, image, onClick }) => {
	return (
		<Card maxW="full">
			<CardHeader>
				<Flex spacing="4">
					<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
						<Avatar src="https://api.dicebear.com/5.x/thumbs/svg?seed=Felix" />
						<Box>
							{/* todo, display creator profile username if have */}
							<Heading size="sm">
								{creator.substr(0, 6)}...
								{creator.substr(-6)}
							</Heading>
						</Box>
					</Flex>
					<IconButton
						variant="ghost"
						colorScheme="gray"
						aria-label="See post"
						icon={<ExternalLinkIcon />}
					/>
				</Flex>
			</CardHeader>
			<CardBody py="2">
				<Heading size="s" textTransform="uppercase" pb="4">
					{title}
				</Heading>
				<Image objectFit="cover" src={image} />
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
				<Button flex="1" variant="ghost">
					Comment
				</Button>
			</CardFooter>
		</Card>
	)
}

export default ForumCard
