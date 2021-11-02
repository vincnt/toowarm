import { Text, LinkBox, LinkOverlay, Flex } from "@chakra-ui/react";

export type NewsArticle = {
  imageUrl: string;
  imageAlt: string;
  articleUrl: string;
  text: string;
  source: string;
};

export const ArticlesList = ({
  articlesArray,
  currentArticle,
  setCurrentArticle,
  setCurrentArticleHover,
}: {
  articlesArray: NewsArticle[];
  currentArticle: NewsArticle;
  setCurrentArticle: (value: NewsArticle) => void;
  setCurrentArticleHover: (value: boolean) => void;
}) =>
  articlesArray.map((article) => (
    <LinkBox key={article.articleUrl} width="100%">
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
