const NewsArticle = ({ newsArticle }) => (
  <li className="posts-list__item col-pad col-6 lg-col-3">
    <time className="posts-list__date mb-1" dateTime={newsArticle.datetime}><small>{newsArticle.datetime}</small></time>
    <a href={newsArticle.url} className="posts-list__link">
      <h2 className="news-title">{newsArticle.title}</h2>
      <div className="news-description">

        {newsArticle.text}

      </div>
    </a>
  </li>
);

export default NewsArticle;
