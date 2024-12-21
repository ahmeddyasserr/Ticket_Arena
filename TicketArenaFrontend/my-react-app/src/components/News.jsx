import React, { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/news/"); // Adjust API URL
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h1 className="text-center mb-4">News</h1>
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div className="news-grid">
          {news.map((article) => (
            <div className="news-card" key={article.id}>
              <img
                src={article.image}
                alt={article.title}
                className="news-image"
              />
              <div className="news-content">
                <h3 className="news-title">{article.title}</h3>
                <p className="news-date">{article.published_at}</p>
                <a
                  href={article.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
