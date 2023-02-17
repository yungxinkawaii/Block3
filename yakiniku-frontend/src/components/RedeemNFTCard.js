import { Box, Text, Stack, Button, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function RedeemNFTCard() {
	return (
		<Box
			role={'group'}
			p={6}
			maxW={'320px'}
			height="100%"
			w={'full'}
			boxShadow={'2xl'}
			rounded={'lg'}
			as={Button}
		>
			<Stack align={'center'}>
				<IconButton
					variant={'ghost'}
					_hover={{ bg: 'none' }}
					icon={<AddIcon size="2xl" />}
				/>
				<Text color={'gray.400'} fontSize={'2xl'} textTransform={'uppercase'}>
					REDEEM NFT
				</Text>
			</Stack>
		</Box>
	)
}
