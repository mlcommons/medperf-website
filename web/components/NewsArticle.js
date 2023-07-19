const NewsArticle = ({ news_article, i }) => {
  return (<li class="posts-list__item col-pad col-6 lg-col-3">
    <time class="posts-list__date text-xs mono" datetime={news_article.datetime}>{news_article.datetime}</time>
    <a href={news_article.url} class="posts-list__link">
      <h2 class="text-md">{news_article.title}</h2>
      <div class="text-sm sans">

        {news_article.text}

      </div>
    </a>
  </li>);
};

export default NewsArticle;
