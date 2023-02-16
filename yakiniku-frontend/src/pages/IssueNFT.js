import React, { useState } from 'react'
import {
	Box,
	Heading,
	Link,
	Image,
	Text,
	HStack,
	Tag,
	useColorModeValue,
	Button,
	NumberInput,
	NumberInputField,
	Stack,
	Flex,
	Input,
	IconButton,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

const Tags = (props) => {
	return (
		<HStack spacing={2} marginTop={props.marginTop}>
			{props.tags.map((tag) => {
				return (
					<Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
						{tag}
					</Tag>
				)
			})}
		</HStack>
	)
}

const MintInputGroup = (props) => {
	return (
		<>
			<Flex w="100%">
				<NumberInput w="25%" mr="2">
					<NumberInputField placeholder="Mint value" />
				</NumberInput>
				<Input w="70%" placeholder="Input email(s) separated by ','" mr="2" />
				<IconButton
					colorScheme={'red'}
					onClick={props.onRemove}
					icon={<DeleteIcon />}
				/>
			</Flex>
		</>
	)
}

export default function IssueNFT() {
	const [groups, setGroups] = useState([])

	const handleAddGroup = () => {
		if (groups.length < 3) {
			const newGroup = { id: groups.length + 1 }
			setGroups([...groups, newGroup])
		}
	}

	const handleRemoveGroup = (id) => {
		const updatedGroups = groups.filter((group) => group.id !== id)
		setGroups(updatedGroups)
	}

	return (
		<>
			<Heading as="h1">Issue NFT </Heading>
			<Box
				marginTop={{ base: '1', sm: '5' }}
				display="flex"
				flexDirection={{ base: 'column', sm: 'row' }}
				justifyContent="space-between"
			>
				<Box
					display="flex"
					flex="1"
					marginRight="4"
					position="relative"
					alignItems="center"
				>
					<Box
						width={{ base: '100%', sm: '85%' }}
						zIndex="2"
						marginLeft={{ base: '0', sm: '5%' }}
						marginTop="5%"
					>
						<Image
							borderRadius="lg"
							src={'https://api.dicebear.com/5.x/micah/svg'}
							objectFit="contain"
						/>
					</Box>
					<Box zIndex="1" width="100%" position="absolute" height="100%">
						<Box
							bgGradient={useColorModeValue(
								'radial(primary.600 1px, transparent 1px)',
								'radial(secondary.300 1px, transparent 1px)'
							)}
							backgroundSize="20px 20px"
							opacity="0.4"
							height="100%"
						/>
					</Box>
				</Box>
				<Box
					display="flex"
					flex="1"
					flexDirection="column"
					justifyContent="center"
					marginTop={{ base: '3', sm: '0' }}
				>
					<Tags tags={['School', 'Award']} />
					<Heading marginTop="1">Dean's Lister</Heading>
					<Text fontWeight={400} fontSize={'xl'} mt="2">
						{/* 0.3426798 ETH */}
					</Text>
					<Text
						as="p"
						marginTop="2"
						color={useColorModeValue('gray.700', 'gray.200')}
						fontSize="lg"
					>
						{/* this is a description of a school NFT that is given to all dean listers */}
						Given to the top 10% of students in each cohort.
					</Text>
					<Text fontWeight="medium" mt="2">
						Owned by: Block University
					</Text>

					<Stack spacing={4} my="2">
						{groups.map((group) => (
							<MintInputGroup
								key={group.id}
								onRemove={() => handleRemoveGroup(group.id)}
							/>
						))}
						<Button
							w="full"
							variant="outline"
							colorScheme="secondary"
							onClick={handleAddGroup}
						>
							Add Mint Input Group
						</Button>
					</Stack>
					<Button w="full" colorScheme={'primary'}>
						Issue NFT
					</Button>
				</Box>
			</Box>
		</>
	)
}
