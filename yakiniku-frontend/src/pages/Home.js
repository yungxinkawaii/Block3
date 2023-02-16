import {
	Avatar,
	Box,
	Flex,
	Heading,
	Stack,
	Text,
	Center,
	Badge,
	useColorModeValue,
} from '@chakra-ui/react'

import ForumCard from '../components/ForumCard'

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

export default function Home() {
	return (
		<Flex flexDir={'col'} w="100%" py="4">
			<Stack width="75%" spacing="4" pe="4">
				<ForumCard
					title="I love chilli ban mee"
					description="Why the school chilli ban mee so expensive? I wan buy one for my gf o
				but I no money."
				/>
				<ForumCard
					title="This is a very long post"
					description="Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.
				Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.
				Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee snow crow's nest rutters. Fluke jib scourge of the seven seas boatswain schooner gaff booty Jack Tar transom spirits."
				/>
				<ForumCard
					title="Throw Orange"
					description="I throw orange at my friend. He throw orange back. I throw"
					image="https://yayapapaya.com.sg/shop/image/cache/catalog/orange-jumbo-navel-aus-512x299.jpg"
				/>
				<ForumCard
					title="Can I use ChatGPT?"
					description="Is it okay if I use ChatGPT for my assignment? I need to generate a lot of text for my project."
				/>
			</Stack>

			<Flex width="25%">
				<Stack>
					<ProfileCard />
				</Stack>
			</Flex>
		</Flex>
	)
}
