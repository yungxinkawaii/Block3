import React from 'react'
import {
	Flex,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Heading,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalContent,
	ModalFooter,
	Spacer,
	Link,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const NFTTable = () => {
	return (
		<>
			<TableContainer>
				<Table size="sm">
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th>Description</Th>
							<Th isNumeric>Price</Th>
							<Th>Link</Th>
							<Th>Issue</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>Lorem</Td>
							<Td>Ipsum</Td>
							<Td>Dol</Td>
							<Td>
								<Link
									textDecoration={'underline'}
									color={'teal.500'}
									href={`/nft`}
								>
									0x123 ... 456
								</Link>
							</Td>
							<Td>
								<Button>Issue NFT</Button>
							</Td>
						</Tr>
						<Tr>
							<Td>Lorem</Td>
							<Td>Ipsum</Td>
							<Td>Dol</Td>
							<Td>
								<Link
									textDecoration={'underline'}
									color={'teal.500'}
									href={`/nft`}
								>
									0x123 ... 456
								</Link>
							</Td>
							<Td>
								<Button>Issue NFT</Button>
							</Td>
						</Tr>
						<Tr>
							<Td>Lorem</Td>
							<Td>Ipsum</Td>
							<Td>Dol</Td>
							<Td>
								<Link
									textDecoration={'underline'}
									color={'teal.500'}
									href={`/nft`}
								>
									0x123 ... 456
								</Link>
							</Td>
							<Td>
								{/* TODO: link to Issue NFT page with the correct id */}
								<Button>Issue NFT</Button>
							</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</>
	)
}

const AddNFTModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<Button
				onClick={onOpen}
				colorScheme="secondary"
				rightIcon={<AddIcon boxSize={3} />}
			>
				Add NFT
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add NFT</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
							<FormControl id="NFTName">
								<FormLabel>NFT Name</FormLabel>
								<Input type="text" />
							</FormControl>
							<FormControl id="NFTDescription">
								<FormLabel>NFT Description</FormLabel>
								<Input type="text" />
							</FormControl>
							<FormControl id="NFTPrice">
								<FormLabel>NFT Price</FormLabel>
								<Input type="number" />
							</FormControl>
							<FormControl id="NFTImage">
								<FormLabel>Upload Image</FormLabel>
								<Input type="text" />
							</FormControl>
							<Button colorScheme={'primary'}>List NFT</Button>
						</Stack>
					</ModalBody>
					<ModalFooter />
				</ModalContent>
			</Modal>
		</>
	)
}
export default function AdminPanel() {
	return (
		<div>
			{/* 3. A page for displaying details for a particular NFT 
          - NFT details
          - A form for me to list the emails of students 
          - issue NFT Button
          - coupon code section
          - a table to show the redeem details (columns: no., wallet address, redeem state) */}
			{/*One thing to remind for profile page for student - a form where i could
			enter the redeem code and Redeem NFT button */}
			<Flex mb="4">
				<Heading size={'lg'}>NFTs</Heading>
				<Spacer />

				<AddNFTModal />
				{/* 1. Put this in a modal form to list/create a NFT (with the details: NFT Name, NFT Description, Price, Upload Image, List NFT button) */}
			</Flex>
			{/* 2. A table showing all the NFTs, each row comes with NFT details and a button to direct to NFT details page at 3. */}
			<NFTTable />
		</div>
	)
}
