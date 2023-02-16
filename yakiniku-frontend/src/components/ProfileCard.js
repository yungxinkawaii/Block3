import {
	Avatar,
	Badge,
	Box,
	Center,
	Heading,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'

// TODO: make dynamic

const ProfileCard = () => {
	return (
		<Center>
			<Box
				maxW={'320px'}
				w={'full'}
				boxShadow={'2xl'}
				rounded={'lg'}
				border={'1px'}
				borderColor={useColorModeValue('gray.200', 'gray.600')}
				p={6}
				textAlign={'center'}
			>
				<Avatar
					size={'xl'}
					src={'https://api.dicebear.com/5.x/micah/svg'}
					alt={'Avatar Alt'}
					mb={4}
					pos={'relative'}
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
				<Heading fontSize={'2xl'} fontFamily={'body'}>
					John Doe
				</Heading>
				<Text fontWeight={600} color={'gray.500'} mb={4}>
					@John_Doe
				</Text>
				<Text
					textAlign={'center'}
					color={useColorModeValue('gray.700', 'gray.400')}
					px={3}
				>
					Penultimate Comp Sci at Block University. Lover of all things Python
					and Go.
				</Text>

				<Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue('gray.50', 'gray.800')}
						fontWeight={'400'}
					>
						#CompSci
					</Badge>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue('gray.50', 'gray.800')}
						fontWeight={'400'}
					>
						#blogchain
					</Badge>
				</Stack>
			</Box>
		</Center>
	)
}

export default ProfileCard
