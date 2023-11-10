
import { parseString } from 'xml2js';
const corsProxy = 'https://cors.eu.org/';

const feeds = [
  { name: 'NASA', url: 'https://www.nasa.gov/news-release/feed/'},
  { name: 'Reddit', url: 'https://www.reddit.com/.rss'},
  { name: 'Netflix', url: 'https://netflixtechblog.com/feed'},
];

const fetchFeed = (url) => {
  fetch(corsProxy + url)
    .then((res) => res.text())
    .then((data) => {
      parseString(data, (err, parsedData) => {
        if (err) {
          console.warn("err", err);
        } else {

          if (url === "https://www.nasa.gov/news-release/feed/") {
            const feedArticle = parsedData.rss.channel[0].item.map(item => ({
              title: item.title[0],
              published: item.pubDate ? item.pubDate[0] : 'No Published Date',
              link: item.link[0]
            }));

            setArticles((arg) => [...arg, ...feedArticle]);
          }

          if (url === "https://www.reddit.com/.rss") {
            const feedArticle = parsedData.feed.entry.map(item => ({
              title: item.title[0],
              published: item.published ? item.published[0] : 'No Published Date' ,
              link: item.link[0].$.href
            }));

            setArticles((arg) => [...arg, ...feedArticle]);
          }

          if (url === "https://netflixtechblog.com/feed") {
            const feedArticle = parsedData.rss.channel[0].item.map(item => ({
              title: item.title[0],
              published: item.pubDate ? item.pubDate[0] : 'No Published Date',
              link: item.link[0]
            }));

            setArticles((arg) => [...arg, ...feedArticle]);
          }

          setArticlesLoaded(true);
        }
      });
    })
    .catch((err) => console.warn("fetch err", err));
};

export default fetchFeed