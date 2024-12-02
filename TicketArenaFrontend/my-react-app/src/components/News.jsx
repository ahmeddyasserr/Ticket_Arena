import React from "react";
import "../index.css"; // For custom styling
import hansiFlickImage from "/public/imgs/Hansi Flick Barcelona 110224.jpg"; 
import MohamedSalah from "/public/imgs/Mo-Salah.png";
import pep from "/public/imgs/Guardiola.png";
import Anceloti from "/public/imgs/Carlo.jpg";
import mount from "/public/imgs/mount.png";
import kroos from "/public/imgs/kroos.png";
import messi from "/public/imgs/messi.png";
import palmer from "/public/imgs/palmer.png";
import bruno from "/public/imgs/bruno.jpg";
function News() {
  const news = [
    {
      image: hansiFlickImage, // Use imported image directly
      title: "Hansi Flick explains reasons behind Barcelona's recent La Liga slump",
      published_at: "2024-12-01",
      original_url: "https://www.sportingnews.com/in/football/news/hansi-flick-reasons-behind-barcelonas-recent-la-liga-slump/151f0ac02449595700d5fe0c"
    },
    {
      image: MohamedSalah,
      title: "Liverpool's patience over Mohamed Salah's contract renewal might be paying off",
      published_at: "2024-12-02",
      original_url: "https://www.sportingnews.com/in/football/news/liverpool-patience-mohamed-salah-contract-renewal-paying/317840936da6b4cafc306787"
    },
    {
      image: pep,
      title: "Jamie Carragher gives brutally honest verdict on Manchester City this season",
      published_at: "2024-12-02",
      original_url: "https://www.sportingnews.com/in/football/news/jamie-carragher-honest-verdict-manchester-city-liverpool/f8bc32dc64ee0b63ff478cc4"
    },
    {
        image: Anceloti,
        title: "Real Madrid 'enquire about third Premier League right-back' after Alexander-Arnold and Porro",
        published_at: "2024-12-02",
        original_url: "https://www.sportingnews.com/in/football/news/real-madrid-enquire-third-premier-league-right-back/de8483c1c89c425964c41562"
      },
      {
        image: mount,
        title: "Cole Palmer matched Mason Mount's Chelsea feat in a sickening amount of time",
        published_at: "2024-12-02",
        original_url: "https://www.sportingnews.com/in/football/news/cole-palmer-matched-mason-mounts-chelsea-feat-time/2653605e613d91b315a28598"
      },
      {
        image: kroos,
        title: "Real Madrid 'may raid Chelsea, Liverpool or Man City' for Toni Kroos successor",
        published_at: "2024-12-02",
        original_url: "https://www.sportingnews.com/in/football/news/real-madrid-raid-chelsea-liverpool-manchester-city-toni-kroos/9123cedc553c74c01df60338"
      },
      {
        image: messi,
        title: "Lionel Messi’s son sparks Barcelona buzz in Lamine Yamal jersey",
        published_at: "2024-12-02",
        original_url: "https://www.sportingnews.com/in/football/news/lionel-messi-son-barcelona-lamine-yamal-jersey/fd269cd97c02dad9c551bfd9"
      },
      {
        image: palmer,
        title: "Premier League top goal scorers 2024/2025: EPL golden boot rankings as Salah closes on Haaland",
        published_at: "2024-12-02",
        original_url: "https://www.sportingnews.com/in/football/news/premier-league-top-goal-scorer-updated-golden-boot-ranking/1gng0xz39t2h01sqbl6yfkle14"
      },
      {
        image: bruno,
        title: "Bruno Fernandes sparks injury fears after Man United's win over Everton",
        published_at: "2024-12-02",
        original_url: "https://www.sportingnews.com/in/football/news/bruno-fernandes-injury-man-utd-win-over-everton/d56352c1f80fe21a58d38f64"
      }
  ];

  return (
    <div className="news-container">
      <div className="news-grid">
        {news.map((article, index) => (
          <div className="news-card" key={index}>
            <img src={article.image} alt={article.title} className="news-image" />
            <div className="news-content">
              <h3 className="news-title">{article.title}</h3>
              <p className="news-author">{article.published_at}</p>
              <a href={article.original_url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
