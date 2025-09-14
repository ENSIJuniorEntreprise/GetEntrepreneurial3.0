import React, { useState, useEffect } from 'react'; // Ajout de useEffect
import './section2.css';

// IMPORTANT : Assurez-vous que les chemins d'accès à vos images sont corrects
import ensiLogo from '../../assets/images/logo.png'; 
import groupPhoto1 from '../../assets/images/eje2025.jpg';
import groupPhoto2 from '../../assets/images/couverture.png';
import groupPhoto3 from '../../assets/images/slider1.jpg';
import groupPhoto4 from '../../assets/images/slider3.jpg';

const Section2 = () => {
  const sliderImages = [groupPhoto1, groupPhoto2, groupPhoto3, groupPhoto4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // MODIFICATION : Logique pour le slide automatique
  useEffect(() => {
    const timer = setInterval(() => {
      const isLastSlide = currentImageIndex === sliderImages.length - 1;
      const newIndex = isLastSlide ? 0 : currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
    }, 4000); // Change d'image toutes les 4 secondes

    return () => clearInterval(timer); // Nettoie le timer quand le composant est démonté
  }, [currentImageIndex, sliderImages.length]);


  return (
    <div className="section2-container">
      <div className="about-card">
        <div className="left-column">
          <div className="card-header">
            <div className="about-logo">
              <img src={ensiLogo} alt="Ensi Junior Enterprise Logo" />
            </div>
            <div className="title-group"> 
              <h2>QUI SOMMES-NOUS ?</h2>
              <div className="subtitle">
                <span className="line"></span>
                <p>Découvrez Notre Histoire !</p>
                <span className="line"></span>
              </div>
            </div>
          </div>

          <div className="text-content">
            <p>
              <span className="highlight">Ensi Junior Enterprise</span>, fondée en 2006, est une association étudiante affiliée à l’École Nationale des Sciences de l’Informatique (ENSI).
            </p>
            <p>
              Notre mission est d'introduire les étudiants tunisiens à la vie professionnelle à travers des activités axées sur trois principaux piliers : la formation, les événements et le développement de projets TIC. De plus, nous assumons activement la responsabilité de promouvoir un esprit entrepreneurial au sein de l'écosystème tunisien, grâce à nos activités, notamment les événements qui renforcent le lien entre les étudiants et les entreprises.
            </p>
          </div>
          
          <div className="about-button-container">
            <a 
              href="https://ensijuniorentreprise.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="about-button"
            >
              À propos de nous
            </a>
          </div>
        </div>

        <div className="right-column">
          <div className="image-slider">
            {/* MODIFICATION : Flèches supprimées */}
            <div className="slider-image-container">
              <img 
                src={sliderImages[currentImageIndex]} 
                alt={`Équipe Ensi Junior Enterprise ${currentImageIndex + 1}`} 
                className="slider-image"
              />
            </div>
            <div className="pagination-dots">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Aller à l'image ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;