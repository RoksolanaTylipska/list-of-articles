import React from 'react';
import { Link } from 'react-router-dom';
import './FeedArticles.scss'

const FeedArticles = ({ articles }) => {
  return (
    <div className='articles'>
      <ul>
        {articles.map((article, index) => (
          <li className='articles__item' key={index}>
            <Link className='articles__item-link' to={article.link} target='_blank'>
              {article.title}
            </Link>
            <p>{article.published}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedArticles;