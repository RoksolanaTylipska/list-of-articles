import React, { useState } from 'react';
import { parseString } from 'xml2js';
import { Box, CircularProgress } from '@mui/material';
import './FeedList.scss';
import FeedArticles from '../ArticleList/FeedArticles.jsx';


const feeds = [
  { name: 'NASA', url: 'https://www.nasa.gov/news-release/feed/' },
  { name: 'Reddit', url: 'https://www.reddit.com/.rss' },
  { name: 'Netflix', url: 'https://netflixtechblog.com/feed' },
];

const corsProxy = 'https://cors.eu.org/';

const FeedList = () => {
  const [articles, setArticles] = useState([]);
  const [articlesLoaded, setArticlesLoaded] = useState(false);
  const [loader, setLoader] = useState(false)

  const fetchFeed = (url) => {
    setLoader(true);

    fetch(corsProxy + url)
      .then((res) => res.text())
      .then((data) => {
        parseString(data, (err, parsedData) => {
          if (err) {
            console.warn("err", err);
          } else {
            let feedArticles = [];

            if (url === "https://www.nasa.gov/news-release/feed/") {
              feedArticles = parsedData.rss.channel[0].item.map(item => ({
                title: item.title[0],
                published: item.pubDate ? item.pubDate[0] : 'No Published Date',
                link: item.link[0],
              }));
              console.log(parsedData)
            }

            if (url === "https://www.reddit.com/.rss") {
              feedArticles = parsedData.feed.entry.map(item => ({
                title: item.title[0],
                published: item.published ? item.published[0] : 'No Published Date',
                link: item.link[0].$.href
              }));
              console.log(parsedData)
            }

            if (url === "https://netflixtechblog.com/feed") {
              feedArticles = parsedData.rss.channel[0].item.map(item => ({
                title: item.title[0],
                published: item.pubDate ? item.pubDate[0] : 'No Published Date',
                link: item.link[0]
              }));
              console.log(parsedData)
            }

            setArticles(feedArticles);
            setArticlesLoaded(true)
          }
        });
      })
      .catch((err) => {
        console.warn("fetch err", err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleRadioChange = (event) => {
    const selectedFeedUrl = event.target.value;
    fetchFeed(selectedFeedUrl);
  };

  return (
    <div className='feed-list'>
      <form className='feed-list__feeds'>
        {feeds.map((feed) => (
          <label key={feed.name}>
            <input
              type="radio"
              value={feed.url}
              onChange={handleRadioChange}
              name="feed"
            />
            {feed.name}
          </label>
        ))}
      </form>
      {loader && (
        <div className='feed-list__loader'>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      {!loader && articlesLoaded ? <FeedArticles articles={articles} /> : false}
    </div>
  );
};

export default FeedList;
