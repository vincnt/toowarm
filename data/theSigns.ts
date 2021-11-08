import { NewsArticle } from "../components/NewsArticle";

const articles: Record<string, NewsArticle> = {
  hotArticle2: {
    articleUrl:
      "https://www.theguardian.com/environment/2021/oct/26/asia-had-hottest-year-on-record-in-2020-un",
    imageUrl:
      "https://i.guim.co.uk/img/media/d8fcf241ae390a3ba8c9381fbff8c2adc06826ea/0_346_5184_3110/master/5184.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=365be2f42682c47a6a666092f7347f23",
    imageAlt: "Asia had hottest year on record in 2020",
    text: "Asia had hottest year on record in 2020",
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
  hotArticle1: {
    articleUrl: "https://www.bbc.co.uk/news/world-us-canada-57890935",
    imageUrl:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/10E31/production/_119496196_hi068690236.jpg",
    imageAlt:
      "Oregon Bootleg Fire: Evacuations as largest US fire burns 364,000 acres",
    text: "Oregon Bootleg Fire: Evacuations as largest US fire burns 364,000 acres",
    source: "BBC",
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
    articleUrl: "https://www.bbc.co.uk/news/world-asia-india-58951456",
    text: "Death toll passes 180 in Nepal and India floods",
    imageUrl:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/17862/production/_121145369_gettyimages-1235976495.jpg",
    imageAlt: "Death toll passes 180 in Nepal and India floods",
    source: "BBC",
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
