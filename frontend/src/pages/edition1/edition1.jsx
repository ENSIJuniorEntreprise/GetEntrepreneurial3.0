import React from 'react';
import './edition1.css';

// --- BIBLIOTHÈQUES NÉCESSAIRES ---
import Slider from 'react-slick';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ImQuotesLeft } from "react-icons/im";

// --- CSS POUR SLICK CAROUSEL ---
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// --- VOS IMAGES ---
import heroImage from '../../assets/images/047.png';
import editionImage from './1ereedition.png';
import galleryImage1 from '../../assets/images/003.png';
import galleryImage2 from '../../assets/images/015.png';
import galleryImage3 from '../../assets/images/296.png';
import galleryImage4 from '../../assets/images/167.png';
import galleryImage5 from '../../assets/images/073.png';
import testimonialImage from '../../assets/images/152.png';

// --- DONNÉES ---
const galleryImages = [
  { id: 1, src: galleryImage1, alt: 'Temps fort 1' },
  { id: 2, src: galleryImage2, alt: 'Temps fort 2' },
  { id: 3, src: galleryImage3, alt: 'Temps fort 3' },
  { id: 4, src: galleryImage4, alt: 'Temps fort 4' },
  { id: 5, src: galleryImage5, alt: 'Temps fort 5' },
  { id: 6, src: testimonialImage, alt: 'Temps fort 6' },
];

const testimonialsData = [
  { id: 1, name: 'Amine MEZGHICH', title: 'CEO Smart IT', headline: "Une édition qui pose les bases", quote: 'Une première édition exceptionnelle qui a posé les bases d’un événement incontournable pour l\'écosystème entrepreneurial tunisien.', image: testimonialImage },
  { id: 2, name: 'Jane Smith', title: 'Investor, Venture Capital', headline: "Une concentration de talents unique", quote: 'Rarement vu une telle concentration de talents et d\'idées prometteuses en un seul lieu. Un vivier d\'opportunités pour les investisseurs.', image: testimonialImage },
  { id: 3, name: 'John Doe', title: 'Founder, TechCorp', headline: "L'énergie était incroyable", quote: 'L\'énergie et le niveau des startups présentes étaient tout simplement incroyables. Cet événement est un véritable accélérateur.', image: testimonialImage },
];

// --- COMPOSANTS FLÈCHES PERSONNALISÉES ---
const NextArrow = ({ onClick, customClassName }) => <div className={`slick-arrow ${customClassName} next-arrow`} onClick={onClick}><FaChevronRight /></div>;
const PrevArrow = ({ onClick, customClassName }) => <div className={`slick-arrow ${customClassName} prev-arrow`} onClick={onClick}><FaChevronLeft /></div>;

const Edition1 = () => {

  const { ref: introRef, inView: introInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: highlightsRef, inView: highlightsInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const gallerySettings = {
    dots: true, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 1,
    nextArrow: <NextArrow customClassName="gallery-arrow" />,
    prevArrow: <PrevArrow customClassName="gallery-arrow" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  const testimonialsSettings = {
    dots: false, infinite: true, speed: 500, slidesToShow: 1,
    centerMode: true, centerPadding: '20%',
    nextArrow: <NextArrow customClassName="testimonials-arrow" />,
    prevArrow: <PrevArrow customClassName="testimonials-arrow" />,
    responsive: [ { breakpoint: 992, settings: { slidesToShow: 1, centerPadding: '10%' } } ]
  };

  return (
    <div className="edition-page-container">
      {/* --- Section 1: Hero --- */}
      <section className="hero-edition">
        <img src={heroImage} alt="Get Entrepreneurial 1ère édition" className="hero-background-image" />
        <div className="hero-color-overlay"></div>
        <div className="hero-overlay-content">
          <div className="main-title-container">
            <h1><span className="text-orange">GET E</span>NTREPRENEURIAL</h1>
            <img src={editionImage} alt="1ère édition" className="edition-image" />
          </div>
          <div className="hero-tagline">
            <span className="line"></span>
            <p>Innovation et Entrepreneuriat pour un Avenir Durable</p>
            <span className="line"></span>  
          </div>
        </div>
      </section>

      {/* --- Section 2: Intro et Statistiques --- */}
      <section className={`intro-edition ${introInView ? 'is-visible' : ''}`} ref={introRef}>
        <div className="intro-text-content">
          <h2>Get Entrepreneurial 1.0</h2>
          <h3 className="text-orange">Thématique</h3>
          <p>La 1 ère édition de Get Entrepreneurial - tenue le 24 janvier 2024, à l'UTICA, représente un tournant majeur pour l' ENSI Junior Entreprise. En mettant en lumière notre engagement pour l'innovation et l'excellence, cet événement a offert une plateforme précieuse où les startups, incubateurs et entreprises se sont réunis pour échanger et collaborer.</p>
        </div>
        <div className="stats-container">
          <div className="stat-box"><span>{introInView && <CountUp end={11} duration={2.5} />}</span><p>Sponsors</p></div>
          <div className="stat-box"><span>{introInView && <CountUp end={86} duration={2.5} />}%</span><p>Taux de Satisfaction</p></div>
          <div className="stat-box"><span>{introInView && <CountUp end={500} duration={2.5} />}</span><p>Participants</p></div>
        </div>
      </section>

      {/* --- Section 3: Galerie "Temps Forts" --- */}
      <section className={`highlights-edition ${highlightsInView ? 'is-visible' : ''}`} ref={highlightsRef}>
        <div className="highlights-header">
          <h2><span className="text-orange">Les Temps Forts </span>de Notre Dernière Rencontre</h2>
        </div>
        <div className="slider-container">
          <Slider {...gallerySettings}>
            {galleryImages.map(image => (
              <div key={image.id} className="gallery-slide">
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* --- Section 4: Témoignages (MISE À JOUR) --- */}
      <section className={`testimonials-edition ${testimonialsInView ? 'is-visible' : ''}`} ref={testimonialsRef}>
        <div className="testimonials-header">
          <h2>Témoignages</h2>
          {/* ===> AJOUT DE LA PHRASE ET DES LIGNES <=== */}
          <div className="header-subtitle">
            <span className="line"></span>
            <p>Ce qu'ils pensent de nous</p>
            <span className="line"></span>
          </div>
        </div>
        <div className="slider-container testimonials-slider-container">
          <Slider {...testimonialsSettings}>
            {testimonialsData.map(testimonial => (
              <div key={testimonial.id} className="testimonial-slide">
                <div className="testimonial-card">
                  <ImQuotesLeft className="quote-icon" />
                  <h3 className="quote-headline">"{testimonial.headline}"</h3>
                  <p className="quote-body">« {testimonial.quote} »</p>
                  <div className="author-info">
                    <img src={testimonial.image} alt={testimonial.name} />
                    <div className="author-details">
                      <p className="author-name">{testimonial.name}</p>
                      <p className="author-title">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default Edition1;