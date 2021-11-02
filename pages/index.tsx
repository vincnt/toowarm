import Head from "next/head";
import NextImage from "next/image";

import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Divider,
  Image,
  Text,
  Center,
  Flex,
  Spacer,
  Tooltip,
  SimpleGrid,
  Grid,
  GridItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { TiMediaRewindOutline } from "react-icons/ti";
import { articles } from "../data/theSigns";
import {
  co2AndTempLineChart,
  co2HistoricLineChart,
  sspProjectionLineChart,
} from "../components/Charts";
import co2Graphic from "../public/images/co2-graphic.png";
import { ArticlesList } from "../components/NewsArticle";

export async function getStaticProps() {
  const noaaCo2 = await import("../data/noaa_co2.json");
  const vostokCo2Temp = await import("../data/vostok_temp_co2.json");
  const sspProjections = await import("../data/iam_projections.json");

  return {
    props: {
      co2Data: noaaCo2.default.timeseries.filter(
        (e, i) => i % 5 == 0 || e.age < 5000
      ),
      co2AndTempData: vostokCo2Temp.default.timeseries.filter(
        (e, i) => i % 15 == 0
      ),
      sspProjections: sspProjections.default.timeseries,
    },
  };
}

const IndexPage = ({
  co2Data,
  co2AndTempData,
  sspProjections,
}: {
  co2Data: any;
  co2AndTempData: any;
  sspProjections: any;
}) => {
  const [switchValue, setSwitchValue] = useState(false);
  const maxArticles = 5;
  const articlesArray = Object.values(articles).slice(0, maxArticles + 1);
  const [currentArticleNumber, setCurrentArticleNumber] = useState(0);
  const [currentArticle, setCurrentArticle] = useState(articlesArray[0]);
  const [currentArticleHover, setCurrentArticleHover] = useState(false);
  const maximumCo2Age = Math.max.apply(
    Math,
    co2Data.map((o: any) => o.age)
  );
  const [co2SliderValue, setCo2SliderValue] = useState(maximumCo2Age);

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

  return (
    <>
      <Head>
        <title>Climate Change Summary - It's Getting Too Warm</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* Hero Section */}
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
          <Box
            backgroundImage="linear-gradient(to right, blue 0%,#ff0000 100%)"
            backgroundRepeat="no-repeat"
            backgroundPosition="center center"
            height="15px"
            width="70%"
            mt="10px"
          ></Box>
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
            <HStack spacing="0px" pr="20%">
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
                  backgroundImage="linear-gradient(#000000, #000000)"
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
                      <Text pl="50px" color="#ff0000" fontWeight="bold">
                        +3°C
                      </Text>
                    </Box>
                    <Spacer />
                  </VStack>
                </Box>
                <Box width="100%" textAlign="center">
                  <Text>
                    2100
                    <Tooltip
                      label="Climate Action Tracker estimate for global increase in Earth's temperature by 2100 if no further actions are taken. More details below."
                      fontSize="sm"
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

      {/* Sub Hero Section */}
      <Box
        width={{ sm: "80%", md: "80%" }}
        margin="auto"
        py={{ base: "30px", md: "80px" }}
        mb={{ sm: "20px", md: "20px" }}
        px="15px"
      >
        <HStack spacing="20px">
          <Spacer />

          <VStack>
            <Flex direction="row" wrap="wrap" margin="0" padding="0">
              <Text color="red" fontWeight="bold" px="2px">
                At +3°C
              </Text>
              <Text px="2px">
                Extreme Temperatures, Floods, Food Shortages, Droughts and Loss
                of Wildlife
              </Text>
              <Text fontWeight="bold" px="2px">
                become the norm.
              </Text>
            </Flex>
          </VStack>
          <Spacer />
        </HStack>
      </Box>

      {/* It's already happening Section */}

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
              <VStack
                spacing="1px"
                textAlign="left"
                alignItems="left"
                width="100%"
              >
                {ArticlesList({
                  articlesArray,
                  currentArticle,
                  setCurrentArticle,
                  setCurrentArticleHover,
                })}
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
            {ArticlesList({
              articlesArray,
              currentArticle,
              setCurrentArticle,
              setCurrentArticleHover,
            })}
          </VStack>
        </Container>
      </Box>

      {/* The Science Section */}

      <Flex w="100%" color="black" py="20px">
        <Container maxW="container.lg" py="20px">
          <Box py="30px">
            <Heading size="lg" py="5px" px="5px" textAlign="center">
              How does it work?
            </Heading>
            <Divider
              bg="blue"
              height="3px"
              width="80%"
              my="5px"
              margin="auto"
            />
          </Box>

          <Box bg="white">
            <SimpleGrid
              minChildWidth={{ base: "100%", md: "40%" }}
              width="90%"
              margin="auto"
              spacing={{ base: "10px", md: "20px" }}
            >
              <Box width="100%" height="100%" pb={{ base: "10px", md: "20px" }}>
                <Heading size="sm" fontWeight="bold">
                  1. Our activities produce carbon dioxide
                </Heading>
                <Box height="200px" py="10px">
                  <Text> Factories, vehicles, </Text>
                </Box>
              </Box>
              <Box width="100%" height="100%" pb={{ base: "5px", md: "20px" }}>
                <Heading size="sm" fontWeight="bold">
                  2. Carbon dioxide levels are at a record high
                </Heading>
                <Box height="200px" py="5px">
                  {switchValue ? (
                    <>
                      {co2HistoricLineChart({ co2Data, co2SliderValue })}{" "}
                      <VStack width="100%">
                        <Slider
                          aria-label="co2-slider"
                          defaultValue={Math.cbrt(maximumCo2Age)}
                          min={5}
                          max={Math.cbrt(maximumCo2Age)}
                          onChange={(val) => setCo2SliderValue(val ** 3)}
                          width="50%"
                          colorScheme="gray"
                        >
                          <SliderTrack height="2px">
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb height="15px" width="15px">
                            <Box as={TiMediaRewindOutline} />
                          </SliderThumb>
                        </Slider>
                        <Text fontSize="sm"> Adjust Time Range</Text>
                      </VStack>
                    </>
                  ) : (
                    <Box width="90%" height="80%">
                      <NextImage src={co2Graphic} alt="me" />
                    </Box>
                  )}
                </Box>
              </Box>
              <Box width="100%" pt={{ base: "2px", md: "25px" }}>
                <Heading size="sm" fontWeight="semibold">
                  3. Carbon dioxide levels are linked to Earth's temperature.
                </Heading>
                {co2AndTempLineChart({ co2AndTempData })}
              </Box>

              <Box width="100%" pt={{ base: "2px", md: "25px" }}>
                <Heading size="sm" fontWeight="semibold">
                  4. Earth's temperature will rise rapidly if we don't cut down
                  on our carbon dioxide production
                </Heading>
                {sspProjectionLineChart({ sspProjections })}
              </Box>
            </SimpleGrid>
          </Box>
          <Box py="20px" pl={{ base: "10px", md: "40px" }}>
            <Switch
              size="sm"
              onChange={(event) => setSwitchValue(event.target.checked)}
              color="gray"
            >
              Don't believe these graphs? See the real ones.
            </Switch>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default IndexPage;
