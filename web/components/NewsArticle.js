const NewsArticle = ({ newsArticle }) => (
  <li className="posts-list__item col-pad col-6 lg-col-3">
    <time className="mb-1" dateTime={newsArticle.datetime}><small>{newsArticle.datetime}</small></time>
    <h2 className="news-title">{newsArticle.title}</h2>
    <p className="mb-4">

      {newsArticle.text}

    </p>
    <a className="justify-self-start underline" href={newsArticle.url}>Read more</a>
  </li>
);

export default NewsArticle;
