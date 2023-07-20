const NewsArticle = ({ newsArticle }) => (
  <li className="posts-list__item col-pad col-6 lg-col-3">
    <time className="posts-list__date text-xs mono" dateTime={newsArticle.datetime}>{newsArticle.datetime}</time>
    <a href={newsArticle.url} className="posts-list__link">
      <h2 className="text-md">{newsArticle.title}</h2>
      <div className="text-sm sans">

        {newsArticle.text}

      </div>
    </a>
  </li>
);

export default NewsArticle;
