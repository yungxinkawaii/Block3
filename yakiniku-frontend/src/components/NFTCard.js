import {
	Box,
	Center,
	useColorModeValue,
	Heading,
	Text,
	Stack,
	Image,
} from '@chakra-ui/react'

export default function NFTCard({ image, owner, name, price, seller }) {
	return (
    <Center py={4}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        // bg={useColorModeValue('white', 'gray.800')}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          pos={"relative"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "75%",
            h: "75%",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url({image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            mx="auto"
            rounded={"lg"}
            objectFit={"cover"}
            src={image}
            maxH={"120px"}
          />
        </Box>
        <Stack pt={8} align={"center"}>
          <Text color={"gray.400"} fontSize={"sm"} textTransform={"uppercase"}>
            {owner}
          </Text>
          <Text color={"gray.400"} fontSize={"sm"} textTransform={"uppercase"}>
            {seller}
          </Text>
          <Heading fontSize={"xl"} fontFamily={"body"} fontWeight={500}>
            {name}
          </Heading>
          <Text fontWeight={800} fontSize={"lg"}>
            {price}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}
