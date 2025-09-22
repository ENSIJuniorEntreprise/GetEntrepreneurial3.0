import React, { useState, useEffect, useRef } from 'react';
import './edition2.css';

// --- IMPORTEZ VOS IMAGES ICI ---
// Remplacez les chemins par les vôtres

// Pour la section Hero
import heroBackgroundImage from '../../assets/images/famillecompr.png';
import editionTextImage from './2emeedition.png';

// Pour la section About (Carrousel)
import aboutImage1 from '../../assets/images/lahisl.jpeg';
import aboutImage2 from '../../assets/images/poledc.JPG';
import aboutImage3 from '../../assets/images/amenistand.jpeg';
import aboutImage4 from '../../assets/images/lahiani.JPG';
import aboutImage5 from '../../assets/images/stand.jpeg';

// Pour la section Allies (Logos)
import logo1 from '../../assets/images/darblockchain.png';
import logo2 from '../../assets/images/digicom.png';
import logo3 from '../../assets/images/digitalcollege.png';
import logo4 from '../../assets/images/Asteelflash.png';
import logo5 from '../../assets/images/lapresse.png';
import logo6 from '../../assets/images/managers.png';
import logo7 from '../../assets/images/monétique.png';
import logo8 from '../../assets/images/resnati.png';
import logo9 from '../../assets/images/SLR.png';


// --- Custom Hook pour l'animation des chiffres ---
const useCountUp = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = target;
          if (start === end) {
            setCount(end);
            return;
          };

          let startTime = null;
          const animate = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const newCount = Math.floor(progress * (end - start) + start);
            setCount(newCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [target, duration]);

  return { count, ref };
};


// --- Section 1: Hero ---
const Hero = () => {
  return (
    <section className="hero-edition">
        <img src={heroBackgroundImage} alt="Get Entrepreneurial 1ère édition" className="hero-background-image" />
        <div className="hero-color-overlay"></div>
        <div className="hero-overlay-content">
          <div className="main-title-container">
            <h1><span className="text-orange">GET E</span>NTREPRENEURIAL</h1>
            <img src={editionTextImage} alt="2ème édition" className="edition-image" />
          </div>
          <div className="hero-tagline">
            <span className="line"></span>
            <p>Innovation et Entrepreneuriat pour un Avenir Durable</p>
            <span className="line"></span>  
          </div>
        </div>
      </section>
  );
};

// --- Section 2: Stats ---
const StatItem = ({ value, label }) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
    const { count, ref } = useCountUp(numericValue, 2000);
    const prefix = value.startsWith('+') ? '+' : '';
    const suffix = value.endsWith('%') ? '%' : '';
    
    return (
        <div ref={ref} className="stat-item">
            <p className="stat-item-value">{`${prefix}${count}${suffix}`}</p>
            <p className="stat-item-label">{label}</p>
        </div>
    );
};

const Stats = () => {
    return (
        <section className="stats-section">
            <div className="stats-container">
                <h2 className="stats-title">Les chiffres clés</h2>
                <div className="stats-divider">
                    <div className="stats-divider-line"></div>
                    <p className="stats-divider-text">L'impact de notre initiative en quelques chiffres</p>
                    <div className="stats-divider-line"></div>
                </div>
                <div className="stats-grid">
                    <StatItem value="+11" label="Sponsors" />
                    <StatItem value="+86%" label="Taux de Satisfaction" />
                    <StatItem value="+500" label="Participants" />
                </div>
            </div>
        </section>
    );
};

// --- Section 3: About ---
const aboutImages = [aboutImage1, aboutImage2, aboutImage3, aboutImage4, aboutImage5];

const About = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === aboutImages.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, []);

    const getTransformValue = () => {
        return `translateX(-${currentIndex * 100}%)`;
    };

    return (
        <section className="about-section">
            <div className="about-grid">
                <div className="about-text-content">
                    <h2 className="about-title">Get Entrepreneurial 2.0</h2>
                    <h3 className="about-subtitle">Thématique</h3>
                    <p className="about-description">
                        La 2ème édition de Get Entrepreneurial - tenue le 24 janvier 2024, à l'UTICA, représente un tournant majeur pour l' ENSI Junior Entreprise. En mettant en lumière notre engagement pour l'innovation et l'excellence, cet évènement a offert une plateforme précieuse où les startups, incubateurs et entreprises se sont réunis pour échanger et collaborer.
                    </p>
                </div>
                <div className="about-carousel-container">
                    <div className="about-carousel-track" style={{ transform: getTransformValue() }}>
                        {aboutImages.map((src, index) => (
                            <div key={index} className="about-carousel-slide">
                                <img src={src} alt={`Event slide ${index + 1}`} className="about-image" />
                            </div>
                        ))}
                    </div>
                     <button onClick={nextSlide} className="about-nav-button">
                          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                      <div className="about-dots-container">
                          {aboutImages.map((_, index) => (
                              <button
                                  key={index}
                                  onClick={() => setCurrentIndex(index)}
                                  className={`about-dot ${index === currentIndex ? 'active' : ''}`}
                              ></button>
                          ))}
                      </div>
                </div>
            </div>
        </section>
    );
};

// --- Section 4 & 5: Allies et Nav fusionnées ---
const allLogos = [
    { src: logo1, alt: 'Logo 1', heightClass: 'h-12' },
    { src: logo2, alt: 'Logo 2', heightClass: 'h-16' },
    { src: logo3, alt: 'Logo 3', heightClass: 'h-16' },
    { src: logo4, alt: 'Logo 4', heightClass: 'h-12' },
    { src: logo5, alt: 'Logo 5', heightClass: 'h-16' },
    { src: logo6, alt: 'Logo 6', heightClass: 'h-14' },
    { src: logo7, alt: 'Logo 7', heightClass: 'h-12' },
    { src: logo8, alt: 'Logo 8', heightClass: 'h-16' },
    { src: logo9, alt: 'Logo 9', heightClass: 'h-14' },
];

const AlliesAndNav = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const logosPerPage = 3;
    const totalPages = Math.ceil(allLogos.length / logosPerPage);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
        }, 5000);
        return () => clearInterval(timer);
    }, [totalPages]);

    return (
        <section className="allies-nav-section">
            <div className="allies-container">
                <h2 className="allies-title">Nos Précieux Alliés</h2>
                 <div className="allies-divider">
                     <div className="allies-divider-line"></div>
                     <p className="allies-divider-text">Ensemble, nous bâtissons l’avenir entrepreneurial</p>
                     <div className="allies-divider-line"></div>
                 </div>
                <div className="allies-logo-carousel">
                    <div
                        className="allies-logo-track"
                        style={{ transform: `translateX(-${currentPage * 100}%)` }}
                    >
                        {Array.from({ length: totalPages }).map((_, pageIndex) => (
                            <div key={pageIndex} className="allies-logo-page">
                                {allLogos.slice(pageIndex * logosPerPage, (pageIndex + 1) * logosPerPage).map((logo, index) => (
                                    <div key={index} className="allies-logo-item">
                                        <img src={logo.src} alt={logo.alt} className={`allies-logo-img ${logo.heightClass}`} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="allies-dots-container">
                      {Array.from({ length: totalPages }).map((_, index) => (
                          <button
                              key={index}
                              onClick={() => setCurrentPage(index)}
                              className={`allies-dot ${currentPage === index ? 'active' : ''}`}
                              aria-label={`Go to slide ${index + 1}`}
                          ></button>
                      ))}
                </div>
            </div>
             <div className="edition-nav-container">
                 <a href="/edition1" className="edition-nav-button">
                     Retour à la 1ère édition
                 </a>
                 {/* MODIFICATION : Bouton "Prochaine édition" supprimé */}
             </div>
        </section>
    );
};


// --- Composant Principal de la Page ---
const Edition2 = () => {
    return (
        <div>
            <Hero />
            <Stats />
            <About />
            <AlliesAndNav />
        </div>
    );
};

export default Edition2;