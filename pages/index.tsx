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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { articles } from "../data/theSigns";
import { useState, useEffect } from "react";

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
  const maxArticles = 5;
  const articlesArray = Object.values(articles).slice(0, maxArticles + 1);
  const [currentArticleNumber, setCurrentArticleNumber] = useState(0);
  const [currentArticle, setCurrentArticle] = useState(articlesArray[0]);
  const [currentArticleHover, setCurrentArticleHover] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArticleNumber((i) => (i < maxArticles ? i + 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!currentArticleHover) {
      setCurrentArticle(articlesArray[currentArticleNumber]);
    }
  }, [currentArticleNumber]);

  const articlesList = articlesArray.map((article) => (
    <LinkBox>
      <Flex
        wrap="wrap"
        onMouseEnter={() => {
          setCurrentArticle(article);
          setCurrentArticleHover(true);
        }}
        onMouseLeave={() => setCurrentArticleHover(false)}
        key={article.articleUrl}
        py="1px"
      >
        <LinkOverlay href={article.articleUrl} isExternal={true}>
          <Text
            fontSize="sm"
            color={
              article.articleUrl == currentArticle.articleUrl ? "black" : "gray"
            }
            _hover={{
              color: "black",
            }}
          >
            {article.text}
          </Text>
        </LinkOverlay>
      </Flex>
    </LinkBox>
  ));
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
        pb="20px"
        px="15px"
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
                    2100 Estimate
                    <Tooltip
                      label="Estimate from Climate Action Tracker. More details below."
                      fontSize="md"
                    >
                      <InfoOutlineIcon h="12px" w="12px" pl="3px" />
                    </Tooltip>
                  </Text>
                </Box>
              </VStack>
            </HStack>
          </HStack>
        </Flex>
      </Box>
      <Box
        width={{ sm: "80%", md: "80%" }}
        margin="auto"
        py="80px"
        mb={{ sm: "20px", md: "20px" }}
        px="15px"
      >
        <HStack spacing="20px">
          <Spacer />
          <Heading size="md" pl="20px" color="red">
            At +3°C
          </Heading>
          <VStack>
            <Flex direction="row" wrap="wrap" margin="0" padding="0">
              <Text fontWeight="semibold" px="3px">
                Extreme Temperatures
              </Text>
              <Text px="3px"> Floods </Text>
              <Text fontWeight="semibold" px="3px">
                Food Shortages
              </Text>
              <Text px="3px"> Droughts </Text>
              <Text fontWeight="semibold" px="3px">
                Loss of Wildlife
              </Text>
            </Flex>
          </VStack>
          <Spacer />
        </HStack>
        <Center py="20px">
          <Text fontWeight="bold" fontSize="lg">
            Become the norm.
          </Text>
        </Center>
      </Box>
      <Box bg="white" w="100%" color="black">
        <Container
          maxW={{ base: "100vw", md: "container.lg" }}
          bg="white"
          py="10px"
        >
          <Grid
            templateColumns="repeat(8, 1fr)"
            gap={4}
            height="100%"
            py="20px"
            display={{ base: "none", md: "flex" }}
          >
            <GridItem colSpan={5}>
              <Box pb="10px">
                <Heading size="lg">It's already happening at 1°C</Heading>
                <Divider bg="red" height="3px" width="80%" my="5px" />
              </Box>
              <VStack spacing="1px" textAlign="left" alignItems="left">
                {articlesList}
              </VStack>
            </GridItem>
            <GridItem colSpan={3}>
              <Image
                src={currentArticle.imageUrl}
                height="250px"
                width="400px"
                alt={"alt"}
                objectFit="cover"
              />
            </GridItem>
          </Grid>
          <VStack display={{ base: "flex", md: "none" }}>
            <Heading size="lg">It's already happening at 1°C</Heading>
            <Divider bg="red" height="3px" width="80%" my="5px" />
            {articlesList}
          </VStack>
        </Container>
      </Box>

      {/* <Box bg="white" w="100%" color="black">
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
      </Box> */}
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
