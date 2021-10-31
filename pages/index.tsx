import Head from "next/head";
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Divider,
  SimpleGrid,
  Image,
  Text,
  Center,
  LinkBox,
  LinkOverlay,
  Flex,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { articles } from "../data/theSigns";

export type ArticleBox = {
  imageUrl: string;
  imageAlt: string;
  articleUrl: string;
  text: string;
  source: string;
};

const ArticleBox = ({ data }: { data: ArticleBox }) => {
  return (
    <>
      <LinkBox display={{ base: "none", md: "flex" }}>
        <Box height="150px" width="200px">
          <Image
            height="50%"
            width="100%"
            src={data.imageUrl}
            alt={data.imageAlt}
            objectFit="cover"
          />
          <LinkOverlay href={data.articleUrl} isExternal={true}>
            <Text fontSize="xs" fontWeight="semibold">
              {data.text}
            </Text>
          </LinkOverlay>
          <Text fontSize="xs" color="gray">
            {data.source}
          </Text>
        </Box>
      </LinkBox>
      <LinkBox display={{ base: "flex", md: "none" }}>
        <HStack height="80px" width="100%">
          <Image
            height="90%"
            width="100px"
            src={data.imageUrl}
            alt={data.imageAlt}
            objectFit="cover"
          />
          <LinkOverlay href={data.articleUrl} isExternal={true}>
            <Text fontSize="xs" fontWeight="semibold">
              {data.text}
            </Text>
            <Text fontSize="xs" color="gray">
              {data.source}
            </Text>
          </LinkOverlay>
        </HStack>
      </LinkBox>
    </>
  );
};

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Too Warm: Climate Tracker and Summary</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box
        bg="white"
        w="100%"
        color="black"
        mt={{ sm: "20px", md: "100px" }}
        p="10px"
      >
        <Center>
          <VStack spacing="0" alignItems="left">
            <Heading size="lg">It's getting too warm.</Heading>
            <Heading size="lg">Change is not happening fast enough.</Heading>
          </VStack>
        </Center>
        <Center>
          <Divider bg="gray" height="15px" width="70%" mt="40px" />
        </Center>
        <Flex width="70%" margin="auto">
          <HStack spacing="1px" width="100%" justifyContent="space-between">
            <HStack>
              <VStack spacing="1px">
                <Box
                  backgroundImage="linear-gradient(#000, #000)"
                  backgroundSize="3px 100%"
                  backgroundRepeat="no-repeat"
                  backgroundPosition="center center"
                  height="50px"
                  width="20px"
                  mt="10px"
                ></Box>
                <Box> 1970 </Box>
              </VStack>
            </HStack>
            <HStack spacing="0px">
              <VStack spacing="1px">
                <Box
                  backgroundImage="linear-gradient(#000, #000)"
                  backgroundSize="3px 100%"
                  backgroundRepeat="no-repeat"
                  backgroundPosition="center center"
                  height="50px"
                  width="100%"
                  mt="10px"
                  textAlign="center"
                >
                  <VStack height="100%">
                    <Spacer />
                    <Box>
                      <Text pl="50px">+1°C</Text>
                    </Box>
                    <Spacer />
                  </VStack>
                </Box>
                <Box width="100%" textAlign="center">
                  <Text>Now</Text>
                </Box>
              </VStack>
            </HStack>
            <HStack spacing="0px">
              <VStack spacing="1px">
                <Box
                  backgroundImage="linear-gradient(#ff0000, #ff0000)"
                  backgroundSize="3px 100%"
                  backgroundRepeat="no-repeat"
                  backgroundPosition="center center"
                  height="50px"
                  width="100%"
                  mt="10px"
                  textAlign="center"
                >
                  <VStack height="100%">
                    <Spacer />
                    <Box>
                      <Text pl="50px">+3°C</Text>
                    </Box>
                    <Spacer />
                  </VStack>
                </Box>
                <Box width="100%" textAlign="center">
                  <Text>
                    2100 Estimate{" "}
                    <Tooltip label="Phone number" fontSize="md">
                      <InfoOutlineIcon h="10px" w="10px" />
                    </Tooltip>
                  </Text>
                </Box>
              </VStack>
            </HStack>
          </HStack>
        </Flex>
      </Box>
      <HStack
        spacing="10px"
        width={{ sm: "80%", md: "50%" }}
        margin="auto"
        py="20px"
        mb={{ sm: "20px", md: "50px" }}
      >
        <Heading size="md" pl="30px" width="20%" color="red">
          At +3°C
        </Heading>
        <Flex width="80%" direction="row" wrap="wrap" margin="0" padding="0">
          <Text fontWeight="bold" px="3px">
            Extreme Temperatures
          </Text>
          <Text px="3px"> Floods </Text>
          <Text fontWeight="bold" px="3px">
            Food Shortages
          </Text>
          <Text px="3px"> Droughts </Text>
          <Text fontWeight="bold" px="3px">
            Water Shortages
          </Text>
          <Text px="3px"> Countries Underwater </Text>
          <Text fontWeight="bold" px="3px">
            Loss of Wildlife
          </Text>
        </Flex>
      </HStack>
      <Box bg="white" w="100%" color="black">
        <Container
          maxW={{ base: "100vw", md: "container.lg" }}
          bg="white"
          py="20px"
        >
          <Heading size="lg" py="5px">
            It's already happening at 1°C
          </Heading>

          <VStack
            justifyContent={{ base: "start", md: "center" }}
            alignContent={{ base: "start", md: "center" }}
            py="1px"
          >
            <Heading
              size="md"
              justifyContent={{ base: "start", md: "center" }}
              fontWeight="semibold"
            >
              It's getting too hot.
            </Heading>
            <Divider bg="red" height="3px" width="60%" />
            <SimpleGrid
              columns={{ sm: 1, md: 4 }}
              spacing={{ base: "5px", md: "40px" }}
              py="5px"
              width="100%"
            >
              <ArticleBox data={articles.hotArticle1} />
              <ArticleBox data={articles.hotArticle2} />
              <ArticleBox data={articles.hotArticle3} />
              <ArticleBox data={articles.hotArticle4} />
            </SimpleGrid>
          </VStack>
          <VStack
            justifyContent={{ base: "start", md: "center" }}
            alignContent={{ base: "start", md: "center" }}
            py="1px"
          >
            <Heading
              size="md"
              justifyContent={{ base: "start", md: "center" }}
              fontWeight="semibold"
            >
              It's getting too wet.
            </Heading>
            <Divider bg="blue" height="3px" width="60%" />
            <SimpleGrid
              columns={{ sm: 1, md: 4 }}
              spacing={{ base: "5px", md: "40px" }}
              py="5px"
              width="100%"
            >
              <ArticleBox data={articles.wetArticle1} />
              <ArticleBox data={articles.wetArticle2} />
              <ArticleBox data={articles.wetArticle3} />
              <ArticleBox data={articles.wetArticle4} />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      <Box bg="#FEFBE0" w="100%" color="black">
        <Container maxW="container.lg" py="20px">
          <Heading size="lg" py="5px">
            The Science
          </Heading>
          <Box>graphs go here</Box>
        </Container>
      </Box>
    </>
  );
};

export default IndexPage;
