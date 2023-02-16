import React from 'react'
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
} from '@chakra-ui/react'

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

const NFT = () => {
	return (
		<>
			<Heading as="h1">NFT Details</Heading>
			<Box
				marginTop={{ base: '1', sm: '5' }}
				display="flex"
				flexDirection={{ base: 'column', sm: 'row' }}
				justifyContent="space-between"
			>
				<Box
					display="flex"
					flex="1"
					marginRight="3"
					position="relative"
					alignItems="center"
				>
					<Box
						width={{ base: '100%', sm: '85%' }}
						zIndex="2"
						marginLeft={{ base: '0', sm: '5%' }}
						marginTop="5%"
					>
						<Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
							<Image
								borderRadius="lg"
								src={
									'https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=Felix'
								}
								objectFit="contain"
							/>
						</Link>
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
					<Tags tags={['School', 'Event']} />
					<Heading marginTop="1">Very Nice NFT </Heading>
					<Text fontWeight={400} fontSize={'xl'} mt="2">
						0.3426798 ETH
					</Text>
					<Text
						as="p"
						marginTop="2"
						color={useColorModeValue('gray.700', 'gray.200')}
						fontSize="lg"
					>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book.
					</Text>
					<Text fontWeight="medium" mt="2">
						Owned by: Rich Kid
					</Text>
					<Button w="full" variant={'outline'} colorScheme={'secondary'} mt="4">
						Buy NFT
					</Button>
				</Box>
			</Box>
		</>
	)
}

export default NFT
