import Head from "next/head";
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
  LinkBox,
  LinkOverlay,
  Flex,
  Spacer,
  Tooltip,
  Grid,
  GridItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { InfoOutlineIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { articles } from "../data/theSigns";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { TiMediaRewindOutline } from "react-icons/ti";
export type ArticleBox = {
  imageUrl: string;
  imageAlt: string;
  articleUrl: string;
  text: string;
  source: string;
};

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

const IndexPage = ({
  co2Data,
  co2AndTempData,
  sspProjections,
}: {
  co2Data: any;
  co2AndTempData: any;
  sspProjections: any;
}) => {
  console.log("ssp", sspProjections);
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

  const co2HistoricLineChart = (
    <Center>
      <ResponsiveContainer width="70%" height={200}>
        <LineChart
          data={co2Data}
          margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
        >
          <Line type="natural" dataKey="co2" stroke="#157922" dot={false} />
          <XAxis
            dataKey="age"
            reversed={true}
            type="number"
            domain={[1, co2SliderValue]}
            allowDataOverflow={true}
            label={{ value: "Years Ago", dy: 15 }}
            ticks={[
              1, 2, 3, 5, 10, 30, 50, 100, 500, 1000, 2000, 5000, 10000, 50000,
              100000, 500000, 700000,
            ].filter((val) => val <= co2SliderValue)}
            tickFormatter={(tick) => {
              return tick.toLocaleString();
            }}
          />
          <YAxis
            label={{ value: "Carbon Dioxide", angle: -90, dx: -20 }}
            domain={[150, 450]}
          />
        </LineChart>
      </ResponsiveContainer>
    </Center>
  );
  const co2AndTempLineChart = (
    <Center>
      <ResponsiveContainer width="60%" height={200}>
        <LineChart
          data={co2AndTempData}
          margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
        >
          <Legend verticalAlign="top" height={30} />

          <Line
            name="Carbon Dioxide"
            type="basis"
            yAxisId="left"
            dataKey="co2"
            stroke="#1a156e"
            dot={false}
          />
          <Line
            name="Temperature"
            type="basis"
            yAxisId="right"
            dataKey="temp"
            stroke="#a72727"
            dot={false}
          />

          <XAxis
            dataKey="age"
            reversed={true}
            type="number"
            domain={[1, 400000]}
            allowDataOverflow={true}
            label={{ value: "Years Ago", dy: 15 }}
            ticks={[10, 10000, 100000, 300000]}
            tickFormatter={(tick) => {
              return tick.toLocaleString();
            }}
          />
          <YAxis
            hide={true}
            yAxisId="left"
            // label={{ value: "Carbon Dioxide", angle: -90, dx: -20 }}
            domain={[150, 350]}
          />
          <YAxis
            hide={true}
            yAxisId="right"
            orientation="right"
            // label={{ value: "Temperature", angle: 90, dx: 15 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Center>
  );
  const sspProjectionLineChart = (
    <Center>
      <ResponsiveContainer width="80%" height={200}>
        <LineChart
          data={sspProjections}
          margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
        >
          <Legend verticalAlign="top" height={20} />
          <Line
            name="SSP51-1.9"
            type="monotone"
            dataKey="SSP1-19-IMAGE"
            stroke="#1d13df"
            dot={false}
          />
          <Line
            name="SSP1-2.6"
            type="monotone"
            dataKey="SSP1-26-IMAGE"
            stroke="#f00a0a"
            dot={false}
          />
          <Line
            name="SSP5-4.0"
            type="monotone"
            dataKey="SSP5-Baseline-REMIND-MAGPIE"
            stroke="#0af030"
            dot={false}
          />

          <XAxis
            dataKey="year"
            type="number"
            scale="time"
            domain={[2010, 2100]}
            label={{ value: "Year", dy: 15 }}
          />
          <YAxis
            label={{ value: "Temperature Increase", angle: -90, dx: -20 }}
            domain={[0, 6]}
          />
        </LineChart>
      </ResponsiveContainer>
    </Center>
  );
  const articlesList = articlesArray.map((article) => (
    <LinkBox key={article.articleUrl}>
      <Flex
        wrap="wrap"
        onMouseEnter={() => {
          setCurrentArticle(article);
          setCurrentArticleHover(true);
        }}
        onMouseLeave={() => setCurrentArticleHover(false)}
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
        <title>Climate Change Summary - It's Getting Too Warm</title>
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
          {/* <Divider bg="gray" height="15px" width="70%" mt="40px" /> */}
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
      <Box
        width={{ sm: "80%", md: "80%" }}
        margin="auto"
        py="80px"
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
      <Flex bg="#FEFBE0" w="100%" color="black">
        <Container maxW="container.lg" py="20px">
          <Heading size="lg" py="5px">
            The Science
          </Heading>
          <Text>show technical details (tickbox)</Text>
          <Box margin="auto" width="80%" py="20px">
            <Heading size="md" py="20px">
              1. Our activities produce carbon dioxide
            </Heading>
            <Text> Factories, vehicles, </Text>
          </Box>
          <Box margin="auto" width="80%" py="20px">
            <Box margin="auto">
              <Heading size="md" py="20px">
                2. Carbon dioxide levels are at a record high
              </Heading>
              {co2HistoricLineChart}
              <Center>
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
                  <Text> Time Range</Text>
                </VStack>
              </Center>
            </Box>
          </Box>
          <Box margin="auto" width="80%">
            <Heading size="md" py="20px">
              3. Carbon dioxide levels are linked to Earth's temperature.
            </Heading>
            {co2AndTempLineChart}
          </Box>

          <Box margin="auto" width="80%" py="20px">
            <Heading size="md" py="20px">
              4. Earth's temperature will rise rapidly if we don't cut down on
              our carbon dioxide production
            </Heading>
            {sspProjectionLineChart}
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default IndexPage;
