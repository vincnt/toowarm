import { NewsArticle } from "../components/NewsArticle";

const articles: Record<string, NewsArticle> = {
  hotArticle1: {
    articleUrl:
      "https://www.theguardian.com/environment/2021/oct/29/apocalypse-soon-reluctant-middle-east-forced-to-open-eyes-to-climate-crisis",
    imageUrl:
      "https://i.guim.co.uk/img/media/07ce31e42e37f703ccb8f895dc86ba00e12a35fc/0_0_5400_3240/master/5400.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=0efc297c34bd6692ce18b4e9f2790f98",
    imageAlt:
      "‘Apocalypse soon’: reluctant Middle East forced to open eyes to climate crisis",
    text: "‘Apocalypse soon’: reluctant Middle East forced to open eyes to climate crisis",
    source: "The Guardian",
  },
  hotArticle2: {
    articleUrl:
      "https://www.theguardian.com/environment/2021/oct/26/asia-had-hottest-year-on-record-in-2020-un",
    imageUrl:
      "https://i.guim.co.uk/img/media/d8fcf241ae390a3ba8c9381fbff8c2adc06826ea/0_346_5184_3110/master/5184.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=365be2f42682c47a6a666092f7347f23",
    imageAlt: "Asia had hottest year on record in 2020 – UN",
    text: "Asia had hottest year on record in 2020 – UN",
    source: "The Guardian",
  },
  hotArticle3: {
    articleUrl:
      "https://edition.cnn.com/2021/10/14/us/california-summer-drought-worst-on-record/index.html",
    imageUrl:
      "https://cdn.cnn.com/cnnnext/dam/assets/211013163831-lake-oroville-california-101121-file-restricted-exlarge-169.jpg",
    imageAlt: "The drought in California this summer was the worst on record",
    text: "The drought in California this summer was the worst on record",
    source: "CNN",
  },
  hotArticle4: {
    articleUrl:
      "https://www.reuters.com/world/africa/drought-northern-kenya-pushes-millions-towards-hunger-2021-10-15/",
    imageUrl:
      "https://www.reuters.com/resizer/SeiWqNkRYRvzmXNPRVcX78XuR-g=/1200x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/L6GFAQMKV5MZ7JR4AXCZMZT2ZI.jpg",
    imageAlt: "Drought in northern Kenya pushes millions towards hunger",
    text: "Drought in northern Kenya pushes millions towards hunger",
    source: "Reuters",
  },
  wetArticle1: {
    articleUrl:
      "https://news.sky.com/story/italy-29-inches-of-rain-in-12-hours-sets-new-european-record-as-extreme-weather-lashes-country-12428005",
    text: "Italy: 29 inches of rain in 12 hours sets new European record as extreme weather lashes country",
    imageUrl:
      "https://e3.365dm.com/21/10/2048x1152/skynews-rain-climate-flooding_5538227.jpg?bypass-service-worker&20211007121202",
    imageAlt:
      "Italy: 29 inches of rain in 12 hours sets new European record as extreme weather lashes country",
    source: "Sky News",
  },
  wetArticle2: {
    articleUrl:
      "https://www.washingtonpost.com/world/germany-comes-to-grips-with-massive-flood-damage-as-some-regions-brace-for-more-rains/2021/07/18/903c3444-e73b-11eb-88c5-4fd6382c47cb_story.html",
    text: "Germany comes to grips with massive flood damage as some regions brace for more rains",
    imageUrl:
      "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/WRB2GEHHZII6XCKQ245T5E77P4.jpg&w=916",
    imageAlt:
      "Germany comes to grips with massive flood damage as some regions brace for more rains",
    source: "Washington Post",
  },
  wetArticle3: {
    articleUrl:
      "https://www.thetimes.co.uk/article/netherlands-in-danger-as-sea-level-rises-faster-than-forecast-3ptfjgw5w",
    text: "Netherlands in danger as sea level rises faster than forecast",
    imageUrl:
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F8354ece2-3756-11ec-8ef4-8e6db1a4b82a.jpg?crop=5496%2C3091%2C0%2C286&resize=1200",
    imageAlt: "Netherlands in danger as sea level rises faster than forecast",
    source: "The Times",
  },
  wetArticle4: {
    articleUrl:
      "https://www.independent.co.uk/climate-change/china-floods-bus-homes-evacuated-b1936122.html",
    text: "China flooding: Bus swept away and millions displaced by deadly deluge",
    imageUrl:
      "https://static.independent.co.uk/2021/10/11/13/urnpublicidap.org0d911b9e37fb4ba8b17655d27902c504.jpg?width=990&auto=webp&quality=75",
    imageAlt:
      "China flooding: Bus swept away and millions displaced by deadly deluge",
    source: "The Independent",
  },
};

export { articles };
