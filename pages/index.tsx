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
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { TiMediaRewindOutline } from "react-icons/ti";
import { articles } from "../data/theSigns";
import {
  co2AndTempLineChart,
  co2HistoricLineChart,
  sspProjectionLineChart,
  co2BreakdownPie,
} from "../components/Charts";

import co2Breakdown from "../public/images/co2 production graphic.png";
import co2Graphic from "../public/images/co2-graphic.png";
import co2AndTempGraphic from "../public/images/co2AndTemp-graphic.png";
import projectedGraphic from "../public/images/projected temp graphic.png";

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
        <title>Climate change in one page - It's Getting Too Warm</title>
        <link rel="shortcut icon" href="/favicon.svg" />
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
            width={{ base: "90%", md: "70%" }}
            mt="20px"
          ></Box>
        </Center>
        <Flex width={{ base: "90%", md: "70%" }} margin="auto">
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
            <Text color="red" fontWeight="bold" fontSize="lg">
              What happens when the Earth gets warmer?
            </Text>

            <Text>
              <Text as="span" fontWeight="bold">
                &#10052; Extreme Temperatures:
              </Text>{" "}
              Freezing winters and unbearable summers.
            </Text>
            <Text>
              <Text as="span" fontWeight="bold">
                &#127754; More Floods:
              </Text>{" "}
              Rising sea levels will increase frequency and amount of flooding.
            </Text>
            <Text>
              <Text as="span" fontWeight="bold">
                &#128293; Droughts and Wildfires:
              </Text>{" "}
              Will result in loss of life as well as food and water shortages.
            </Text>
            <Text>
              <Text as="span" fontWeight="bold">
                &#128060; Loss of Wildlife :
              </Text>{" "}
              Habitats are thrown off balance, plants and animals will die,
              resulting in food shortages.
            </Text>
          </VStack>
          <Spacer />
        </HStack>
        <Box width={{ base: "100%", md: "60%" }} margin="auto" mt="40px">
          <Heading
            fontSize="2xl"
            fontWeight="normal"
            textAlign="center"
            mb="5px"
          >
            At +3°C these events become extremely common!
          </Heading>
          <Divider bg="black" height="2px" margin="auto" width="90%" />
        </Box>
      </Box>

      {/* It's already happening Section */}

      <Box bg="white" w="100%" color="black" id="evidence" pb="20px">
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

      <Flex w="100%" color="black" id="howItWorks" pb="20px">
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

          <Flex bg="white">
            <SimpleGrid
              minChildWidth={{ base: "100%", md: "40%" }}
              width="90%"
              margin="auto"
              spacing={{ base: "3px", md: "20px" }}
              pb="30px"
            >
              <Box width="100%" height="100%" mb={{ base: "5px", md: "35px" }}>
                <Heading size="sm" fontWeight="bold">
                  1. Our activities produce carbon dioxide
                </Heading>
                <Box
                  height={{
                    base: switchValue ? "300px" : "180px",
                    md: "200px",
                  }}
                  width="100%"
                >
                  {switchValue ? (
                    <>
                      <Box width="100%"> {co2BreakdownPie()}</Box>
                      <Text fontSize="xs" color="gray">
                        Source:{" "}
                        <Link
                          href="https://ourworldindata.org/emissions-by-sector"
                          isExternal
                        >
                          Our World In Data
                        </Link>
                      </Text>
                    </>
                  ) : (
                    <Box pt={{ base: "20px", md: "40px" }} width="80%">
                      <NextImage src={co2Breakdown} alt="me" />
                    </Box>
                  )}
                </Box>
              </Box>
              <Box width="100%" height="100%" mb={{ base: "55px", md: "35px" }}>
                <Heading size="sm" fontWeight="bold">
                  2. Carbon dioxide levels are at a record high
                </Heading>
                <Box
                  height={{
                    base: switchValue ? "250px" : "150px",
                    md: "200px",
                  }}
                  mt={{ base: "20px", md: "10px" }}
                >
                  {switchValue ? (
                    <Flex flexDirection="column">
                      {co2HistoricLineChart({ co2Data, co2SliderValue })}
                      <VStack width="100%" pb="5px">
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
                      <Text fontSize="xs" color="gray">
                        Source:{" "}
                        <Link
                          href="https://www.ncei.noaa.gov/access/paleo-search/study/17975"
                          isExternal
                        >
                          National Centers for Environmental Information (NCEI)
                        </Link>
                      </Text>
                    </Flex>
                  ) : (
                    <Box width="90%" height="80%" pt="20px">
                      <NextImage src={co2Graphic} alt="me" />
                    </Box>
                  )}
                </Box>
              </Box>
              <Box
                width="100%"
                height={{ base: switchValue ? "250px" : "150px", md: "200px" }}
                my={{ base: "30px", md: "50px" }}
              >
                <Heading size="sm" fontWeight="semibold" pb="10px">
                  3. Carbon dioxide levels are linked to Earth's temperature.
                </Heading>

                {switchValue ? (
                  <>
                    {co2AndTempLineChart({ co2AndTempData })}
                    <Text fontSize="xs" color="gray">
                      Source:{" "}
                      <Link
                        href="http://www.climatedata.info/proxies/data-downloads/"
                        isExternal
                      >
                        climatedata.info
                      </Link>
                    </Text>
                  </>
                ) : (
                  <Box width="80%" height="100%" py="40px">
                    <NextImage src={co2AndTempGraphic} alt="me" />
                  </Box>
                )}
              </Box>

              <Box
                width="100%"
                height={{ base: switchValue ? "250px" : "150px", md: "200px" }}
                mt={{ base: "20px", md: "50px" }}
              >
                <Heading size="sm" fontWeight="semibold" pb="10px">
                  4. Earth's temperature will rise rapidly if we don't cut down
                  on our carbon dioxide production
                </Heading>
                {switchValue ? (
                  <Box pt="5px">
                    {sspProjectionLineChart({ sspProjections })}
                    <Text fontSize="xs" color="gray">
                      Source:{" "}
                      <Link href="https://tntcat.iiasa.ac.at/SspDb" isExternal>
                        SSP Database
                      </Link>
                    </Text>
                  </Box>
                ) : (
                  <Box width="100%" height="100%" pt="10px">
                    <NextImage src={projectedGraphic} alt="me" />
                  </Box>
                )}
              </Box>
            </SimpleGrid>
          </Flex>
          <Center>
            <Box
              mt={{ base: switchValue ? "30px" : "50px", md: "10px" }}
              pl={{ base: "10px", md: "10px" }}
            >
              <Switch
                size="md"
                onChange={(event) => setSwitchValue(event.target.checked)}
                color="gray"
                colorScheme="red"
              >
                Don't believe these graphs? See the real ones.
              </Switch>
            </Box>
          </Center>
        </Container>
      </Flex>

      {/* How can I help */}

      <Flex w="100%" color="black" pb="20px" id="howToHelp">
        <Container maxW="container.lg" py="20px">
          <Box py="30px">
            <Heading size="lg" py="5px" px="5px" textAlign="center">
              How can I do my part?
            </Heading>
            <Divider
              bg="green"
              height="3px"
              width="80%"
              my="5px"
              margin="auto"
            />
          </Box>
          <Box borderStyle="solid" borderColor="black" borderWidth="1px">
            <Box p="25px">
              <Heading size="md" fontWeight="normal" py="15px">
                The Government
              </Heading>
              <Box pl="20px" py="5px">
                <Text fontWeight="semibold">Carbon Tax</Text>
                <Text>Higher carbon taxes on corporations.</Text>
              </Box>
              <Box pl="20px" py="5px">
                <Text fontWeight="semibold">Renewables Incentives</Text>
                <Text>
                  Subsidise renewable energies or tax carbon production.
                </Text>
              </Box>
              <Box pl="20px" py="5px">
                <Text fontWeight="semibold">Renewables Research</Text>
                <Text> Speed up research into fusion, solar power</Text>
              </Box>
            </Box>
          </Box>
          <Box
            borderStyle="solid"
            borderColor="black"
            borderWidth="1px"
            mt="15px"
          >
            <Box p="25px">
              <Heading size="md" fontWeight="normal" py="15px">
                You
              </Heading>
              <Box pl="20px" py="5px">
                <Text fontWeight="semibold">Vote</Text>
                <Text>Vote for the government to achieve it's goals</Text>
              </Box>
              <Box pl="20px" py="5px">
                <Text fontWeight="semibold">Use green transport</Text>
                <Text>Use public transport. fly less, only when needed.</Text>
              </Box>
              <Box pl="20px" py="5px">
                <Text fontWeight="semibold">Use energy efficient devices</Text>
                <Text>helps marginally</Text>
              </Box>
              <Box pl="20px" py="5px">
                <Text fontWeight="semibold">Eat less meat</Text>
                <Text>helps marginally</Text>
              </Box>
            </Box>
          </Box>
        </Container>
      </Flex>

      <Flex w="100%" color="black" pb="20px" id="faq">
        <Container maxW="container.lg" py="20px">
          <Box py="30px">
            <Heading size="lg" py="5px" px="5px" textAlign="center">
              FAQ
            </Heading>
            <Divider
              bg="green"
              height="3px"
              width="80%"
              my="5px"
              margin="auto"
            />
          </Box>

          <Accordion>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Section 1 title
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </Flex>
    </>
  );
};

export default IndexPage;
