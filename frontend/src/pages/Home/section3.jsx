import React, { useState } from 'react';
import './section3.css';
import { useInView } from 'react-intersection-observer';
import { FaChevronLeft, FaChevronRight, FaArrowLeft } from 'react-icons/fa';

// Assurez-vous que les chemins vers vos images sont corrects
import img1 from '../../assets/images/speakers.JPG';
import img2 from '../../assets/images/speakers2.JPG';
import img3 from '../../assets/images/stand.jpeg';
import img4 from '../../assets/images/tout.JPG';
import img5 from '../../assets/images/tout1.JPG';

const articlesData = [
  {
    image: img1,
    category: 'BUSINESS',
    date: 'July 22, 2025',
    title: 'Generation Of Wealth',
    content: 'Le contenu détaillé de l\'article sur le business. Curabitur et lacus magna. Nulla vel euismod purus. Ac tellus, suspendisse sed, mattis ullamcorper, turpis. Sed quis nulla et odio eleifend feugiat.'
  },
  {
    image: img3,
    category: 'AI',
    date: 'July 22, 2025',
    title: 'Generation Of Wealth',
    content: 'Le contenu détaillé de l\'article sur l\'intelligence artificielle. Cras consequat iaculis purus, ac friningilla quam. Praesent eu ultrices nunc. Nam vestibulum, neque ut feugiat laoreet, arcu metus feugiat augue.'
  },
  {
    image: img4,
    category: 'TECHNOLOGY',
    date: 'July 15, 2025',
    title: 'Future Of Startups',
    content: 'Le contenu détaillé de l\'article sur la technologie. Vivamus eget nibh. Etiam cursus leo vel metus. Nulla facilisi. Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.'
  },
  {
    image: img2,
    category: 'INNOVATION',
    date: 'August 1, 2025',
    title: 'Generation Of Wealth',
    content: 'Le contenu détaillé de l\'article sur l\'innovation. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.'
  },
  {
    image: img5,
    category: 'FINANCE',
    date: 'July 10, 2025',
    title: 'Investment Strategies',
    content: 'Le contenu détaillé de l\'article sur la finance. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.'
  }
];

const Section3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const cardsToShow = 3;
  const maxIndex = articlesData.length > cardsToShow ? articlesData.length - cardsToShow : 0;

  const handleNext = () => setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  const handlePrev = () => setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));

  const handleCardClick = (article) => setSelectedArticle(article);
  const handleClose = () => setSelectedArticle(null);

  return (
    <section 
      className={`articles-section ${inView ? 'visible' : ''}`} 
      ref={ref}
    >
      <div className="articles-header">
        <h2>
          Discover our exclusive insights through <span className="text-orange">featured articles</span>
        </h2>
      </div>

      <div className="carousel-wrapper">
        <button className="carousel-arrow left" onClick={handlePrev} aria-label="Previous articles">
          <FaChevronLeft />
        </button>
        <div className="carousel-viewport">
          <div className="carousel-track">
            {articlesData.slice(currentIndex, currentIndex + cardsToShow).map((article, index) => (
              <div 
                className={`article-card card-${index + 1}`} // Classe unique (card-1, card-2, card-3)
                key={index} 
                onClick={() => handleCardClick(article)}
              >
                <div className="article-card-inner">
                  <div className="card-background" style={{ backgroundImage: `url(${article.image})` }}></div>
                  <div className="card-overlay"></div>
                  <div className="card-content">
                    <span className="category-tag">{article.category}</span>
                    <div className="card-footer">
                      <p className="article-date">{article.date}</p>
                      <h3 className="article-title">{article.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-arrow right" onClick={handleNext} aria-label="Next articles">
          <FaChevronRight />
        </button>
      </div>

      <div className={`article-detail-view ${selectedArticle ? 'open' : ''}`}>
        {selectedArticle && (
          <>
            <div className="detail-image-background" style={{ backgroundImage: `url(${selectedArticle.image})` }}></div>
            <div className="detail-content-overlay">
              <div className="detail-content">
                <button className="close-button" onClick={handleClose}><FaArrowLeft /> Retour</button>
                <span className="category-tag detail-category">{selectedArticle.category}</span>
                <h2 className="detail-title">{selectedArticle.title}</h2>
                <p className="detail-date">{selectedArticle.date}</p>
                <p className="detail-text">{selectedArticle.content}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Section3;