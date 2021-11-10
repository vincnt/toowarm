import Head from "next/head";
import NextImage from "next/image";
import * as gtag from "../lib/gtag";

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
  UnorderedList,
  ListItem,
  Select,
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

import co2Breakdown from "../public/images/co2-by-sector.png";
import co2Graphic from "../public/images/co2-levels.png";
import co2AndTempGraphic from "../public/images/co2-trap.png";
import projectedGraphic from "../public/images/temperature-projections.png";

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

const OutboundLink = ({ href, children, color }: any) => (
  <Link
    href={href}
    color={color}
    isExternal
    onClick={() => gtag.outbound({ href })}
  >
    {children}
  </Link>
);

const countryContactDetails: any = {
  us: (
    <UnorderedList>
      <ListItem>
        <OutboundLink href="https://community.citizensclimate.org/tools/call-congress-about-the-energy-innovation-and-carbon-dividend-act#/54/">
          Call your members of Congress about enacting a carbon price.
        </OutboundLink>
      </ListItem>
      <ListItem>
        <OutboundLink href="https://www.givinggreen.earth/recommendations">
          Find out the most effective places to donate to.
        </OutboundLink>
      </ListItem>
    </UnorderedList>
  ),
  uk: (
    <UnorderedList>
      <ListItem>
        <OutboundLink href="https://thetimeisnow.uk/">
          Sign this petition. (Over 200,000 signatures already)
        </OutboundLink>
      </ListItem>
      <ListItem>
        <OutboundLink href="https://www.theclimatecoalition.org/write-to-your-mp">
          Write to your MP with this ready-made letter.
        </OutboundLink>
      </ListItem>
    </UnorderedList>
  ),
  others: (
    <UnorderedList>
      <ListItem>
        <OutboundLink href="https://www.givinggreen.earth/recommendations">
          Find out the most effective places to donate to.
        </OutboundLink>
      </ListItem>
    </UnorderedList>
  ),
};

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
  const [userCountry, setUserCountry] = useState("");
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

  const peachColour = "#d87e68";
  const offWhite = "#f8f8ff";

  return (
    <>
      <Head>
        <title>climate change explained</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>&#129397;</text></svg>"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Climate change summary. Evidence and predictions for climate change. How individuals and governments can help fight climate change."
        />
      </Head>
      <style jsx global>{`
        body {
          background-image: linear-gradient(${peachColour}, red) !important;
        }
      `}</style>

      {/* Hero Section */}
      <Container
        maxW={{ base: "95%", md: "container.xl" }}
        bg="#f8f8ff"
        borderRadius="25px"
        my={{ base: "20px", md: "50px" }}
      >
        <Box
          w="100%"
          color="black"
          pt={{ base: "40px", md: "100px" }}
          pb="20px"
          margin="auto"
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
              mt="50px"
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
                        <Text pl="50px" color="black" fontWeight="bold">
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
          py={{ base: "30px", md: "60px" }}
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
                Rising sea levels will increase frequency and amount of
                flooding.
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
      </Container>

      {/* It's already happening Section */}
      <Container
        maxW={{ base: "95%", md: "container.xl" }}
        bg={offWhite}
        borderRadius="25px"
        my="50px"
      >
        <Box w="100%" color="black" id="evidence" pb="20px">
          <Container maxW={{ base: "100vw", md: "container.lg" }} py="10px">
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
      </Container>

      {/* The Science Section */}
      <Container
        maxW={{ base: "95%", md: "container.xl" }}
        bg={offWhite}
        borderRadius="25px"
        my="50px"
      >
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

            <Flex>
              <SimpleGrid
                minChildWidth={{ base: "100%", md: "40%" }}
                width="90%"
                margin="auto"
                spacing={{ base: "3px", md: "30px" }}
                pb="30px"
              >
                <Box
                  width="100%"
                  height="100%"
                  mb={{ base: "5px", md: "35px" }}
                >
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
                        <Box width="80%"> {co2BreakdownPie()}</Box>
                        <Text fontSize="xs" color="gray">
                          Source:{" "}
                          <OutboundLink href="https://ourworldindata.org/emissions-by-sector">
                            Our World In Data
                          </OutboundLink>
                        </Text>
                      </>
                    ) : (
                      <Box pt={{ base: "20px", md: "40px" }} width="80%">
                        <NextImage src={co2Breakdown} alt="me" />
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  width="100%"
                  height="100%"
                  mb={{ base: switchValue ? "0px" : "50px", md: "35px" }}
                >
                  <Heading size="sm" fontWeight="bold">
                    2. Carbon dioxide levels are at a record high
                  </Heading>
                  <Box
                    height={{
                      base: switchValue ? "250px" : "150px",
                      md: "200px",
                    }}
                    mt={{ base: switchValue ? "10px" : "10px", md: "10px" }}
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
                          <OutboundLink href="https://www.ncei.noaa.gov/access/paleo-search/study/17975">
                            National Centers for Environmental Information
                            (NCEI)
                          </OutboundLink>
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
                  height={{
                    base: switchValue ? "250px" : "150px",
                    md: "200px",
                  }}
                  mb={{ base: switchValue ? "10px" : "40px", md: "50px" }}
                  mt={{ base: switchValue ? "50px" : "20px", md: "50px" }}
                >
                  <Heading size="sm" fontWeight="semibold" pb="10px">
                    3. Carbon dioxide traps heat, increasing Earth's
                    temperature.
                  </Heading>

                  {switchValue ? (
                    <>
                      {co2AndTempLineChart({ co2AndTempData })}
                      <Text fontSize="xs" color="gray">
                        Source:{" "}
                        <OutboundLink href="http://www.climatedata.info/proxies/data-downloads/">
                          climatedata.info
                        </OutboundLink>
                      </Text>
                    </>
                  ) : (
                    <Box
                      width="70%"
                      height="100%"
                      my={{ base: "20px", md: "5px" }}
                      margin="auto"
                    >
                      <NextImage src={co2AndTempGraphic} alt="me" />
                    </Box>
                  )}
                </Box>

                <Box
                  width="100%"
                  height={{
                    base: switchValue ? "250px" : "150px",
                    md: "200px",
                  }}
                  mt={{ base: "40px", md: "50px" }}
                >
                  <Heading size="sm" fontWeight="semibold" pb="10px">
                    4. Earth's temperature will rise rapidly if we don't cut
                    down on our carbon dioxide production
                  </Heading>
                  {switchValue ? (
                    <Box pt="5px">
                      {sspProjectionLineChart({ sspProjections })}
                      <Text fontSize="xs" color="gray">
                        Source:{" "}
                        <OutboundLink href="https://tntcat.iiasa.ac.at/SspDb">
                          SSP Database
                        </OutboundLink>
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
      </Container>

      {/* How can I help */}
      <Container
        maxW={{ base: "95%", md: "container.xl" }}
        bg={offWhite}
        borderRadius="25px"
        my="50px"
      >
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
              <Box p="25px" maxW="90%">
                <Heading size="md" fontWeight="normal" py="15px">
                  You
                </Heading>
                <Box pl="20px" py="5px">
                  <Text fontWeight="semibold">Make your voice heard.</Text>
                  <Text fontStyle="italic">
                    The most power in fighting climate change lies in the hands
                    of your government.
                  </Text>
                  <Text>
                    Vote, speak out or send letters to your local authorities.
                    The more people do this the more they will prioritise
                    climate change policies.
                  </Text>
                </Box>

                <Box pl="20px" py="5px">
                  <Text fontWeight="semibold">Reduce car usage</Text>
                  <Text>
                    Use more public transport. Cut back on driving private cars,
                    and invest in an electric car.
                  </Text>
                </Box>
                <Box pl="20px" py="5px">
                  <Text fontWeight="semibold">Reduce energy usage at home</Text>
                  <Text>
                    Use energy efficient devices such as LED bulbs. Swap out gas
                    devices such as stoves and boilers for electric versions.
                    Ensure your home is properly insulated. Wear extra layers
                    instead of turning up the heating. Switch to a green energy
                    provider.
                  </Text>
                </Box>
                <Box pl="20px" py="5px">
                  <Text fontWeight="semibold">Eat less meat.</Text>
                  <Text>
                    Reduce meat and dairy consumption. Eat more vegetables.
                  </Text>
                </Box>

                <Box pl="20px" py="5px">
                  <Text fontWeight="semibold">Spread the word.</Text>
                  <Text>
                    Speak to your friends and family about climate change, what
                    you've done and how they can help too.
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box
              borderStyle="solid"
              borderColor="black"
              borderWidth="1px"
              mt="15px"
            >
              <Box p="25px" maxW="90%">
                <Heading size="md" fontWeight="normal" py="15px">
                  The Government
                </Heading>

                <Box pl="20px" py="5px">
                  <Text fontWeight="semibold">Renewables Research</Text>
                  <Text>
                    Speed up research into renewable energies like nuclear
                    fusion and solar power.
                  </Text>
                </Box>
                <Box pl="20px" py="5px">
                  <Text fontWeight="semibold">Public Transport</Text>
                  <Text>
                    Invest in more public transport infrastructure. Ban the sale
                    of fossil fuel vehicles.
                  </Text>
                </Box>
                <Box pl="20px" py="5px">
                  <Text fontWeight="semibold">Insulate homes</Text>
                  <Text>Insulate walls and roofs to reduce heat escaping.</Text>
                </Box>
                <Box pl="20px" py="5px">
                  <Text fontWeight="semibold">Carbon Capture</Text>
                  <Text>
                    Protect forests and plant more trees to capture carbon from
                    the atmosphere.
                  </Text>
                </Box>
                <Box pl="20px" py="5px">
                  <Text fontWeight="semibold">Green energy incentives</Text>
                  <Text>
                    Push companies to move towards green energy through tax
                    reliefs and other incentives.
                  </Text>
                </Box>
              </Box>
            </Box>
          </Container>
        </Flex>
      </Container>

      <Container
        maxW={{ base: "95%", md: "container.xl" }}
        bg="#f8f8ff"
        borderRadius="25px"
        my="50px"
      >
        <Flex w="100%" color="black" pb="20px" id="faq">
          <Container maxW="container.lg" py="20px">
            <Box py="30px">
              <Heading size="lg" py="5px" px="5px" textAlign="center">
                FAQ
              </Heading>
              <Divider
                bg="orange"
                height="3px"
                width="80%"
                my="5px"
                margin="auto"
              />
            </Box>

            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      How do I know climate change is real?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Yes it has been proven repeatedly to be real. Even skeptics
                  agree that climate change is real (their argument is over the
                  disastrous effects of climate change).{" "}
                  <OutboundLink
                    href="https://climate.nasa.gov/evidence/"
                    color="blue"
                  >
                    This
                  </OutboundLink>{" "}
                  article by NASA showcases the clear evidence for climate
                  change.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Hasn't enough been done already?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text>
                    Definitely not. Some progress has been made but not enough
                    to reach our targets.{" "}
                    <OutboundLink
                      href="https://www.nytimes.com/interactive/2021/10/25/climate/world-climate-pledges-cop26.html"
                      color="blue"
                    >
                      This
                    </OutboundLink>{" "}
                    article explains it well.
                  </Text>
                  <Text>
                    {" "}
                    <OutboundLink
                      href="https://climateactiontracker.org/"
                      color="blue"
                    >
                      This
                    </OutboundLink>{" "}
                    website allows you to find your country and view it's
                    progress.
                  </Text>
                  <Text>
                    {" "}
                    <OutboundLink
                      href="https://www.wri.org/insights/climate-action-must-progress-far-faster-achieve-15-c-goal"
                      color="blue"
                    >
                      This
                    </OutboundLink>{" "}
                    article details which sectors are doing well and which are
                    far behind.
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Who can I contact in my country?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Select
                    placeholder="Select your country"
                    onChange={(val) => setUserCountry(val.target.value)}
                    width={{ base: "80%", md: "30%" }}
                  >
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="others">Others</option>
                  </Select>
                  <Box mt="15px" pl="15px">
                    {userCountry in countryContactDetails
                      ? countryContactDetails[userCountry]
                      : countryContactDetails["others"]}
                  </Box>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Can my actions actually make a difference?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Yes they can. While eating less meat and reducing waste may
                  seem to not make an impact, the true power of your actions is
                  that they will influence others to do the same. Soon, enough
                  people will be making a positive change that it will actually
                  make a difference.{" "}
                  <OutboundLink
                    href="https://www.wired.com/story/does-climate-change-mean-you-should-fly-less-yeah-maybe/"
                    color="blue"
                  >
                    Here
                  </OutboundLink>{" "}
                  is a great article on this effect.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Where can I learn more about climate change?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text fontStyle="italic">
                    Click the descriptions below to open the links in a new tab.{" "}
                  </Text>
                  <UnorderedList spacing="5px" mt="10px">
                    <ListItem>
                      <OutboundLink href="https://www.globalwarmingprimer.com/">
                        Easy to follow primer for global warming.{" "}
                        <Text as="span" color="gray">
                          (globalwarmingprimer.com)
                        </Text>
                      </OutboundLink>
                    </ListItem>
                    <ListItem>
                      <OutboundLink href="https://eapsweb.mit.edu/sites/default/files/Climate_Primer.pdf">
                        Primer with more scientific details.{" "}
                        <Text as="span" color="gray">
                          (Massachusetts Institute of Technology)
                        </Text>
                      </OutboundLink>
                    </ListItem>
                    <ListItem>
                      <OutboundLink href="https://www.ipcc.ch/report/ar6/wg1/">
                        Extremely detailed climate change reports for policy
                        makers.{" "}
                        <Text as="span" color="gray">
                          (The Intergovernmental Panel on Climate Change (IPCC))
                        </Text>
                      </OutboundLink>
                    </ListItem>
                    <ListItem>
                      <OutboundLink href="https://skepticalscience.com/argument.php">
                        Common climate change myths debunked.{" "}
                        <Text as="span" color="gray">
                          (skepticalscience.com)
                        </Text>
                      </OutboundLink>
                    </ListItem>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Container>
        </Flex>
        {/* <Box position="relative" width="100%">
          <Box
            bg={offWhite}
            position="absolute"
            borderRadius="50%"
            width="30px"
            height="20px"
            top="-10px"
            left="5px"
          />
          <Box
            bg={offWhite}
            position="absolute"
            borderRadius="50%"
            width="30px"
            height="60px"
            top="-15px"
            left="15px"
          />
          <Box
            bg={offWhite}
            position="absolute"
            borderRadius="50%"
            width="30px"
            height="60px"
            top="-15px"
            left="25px"
          />
        </Box> */}
      </Container>
    </>
  );
};

export default IndexPage;
