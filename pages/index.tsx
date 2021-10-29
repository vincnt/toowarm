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
} from "@chakra-ui/react";

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
      <Box bg="white" w="100%" color="black">
        <Container
          maxW={{ base: "100vw", md: "container.lg" }}
          bg="white"
          py="20px"
        >
          <Heading size="lg" py="5px">
            The Signs
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
