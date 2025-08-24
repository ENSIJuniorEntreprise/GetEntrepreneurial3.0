import React from 'react';
import './section4.css';
import { useInView } from 'react-intersection-observer'; // Importation du hook

// Assurez-vous que le chemin vers vos images est correct
import b2bImage from '../../assets/images/BToB.jpg';
import b2cImage from '../../assets/images/BtoC.jpg';
import b2sImage from '../../assets/images/BtoS.jpg';

// Le contenu de la face arrière de chaque carte est défini ici
const BackContent1 = () => (
  <div className="card-back-content">
    <p>
      L'événement propose des ateliers, des sessions de networking et des panels pour favoriser la rencontre entre startups et grandes entreprises, afin de développer des partenariats stratégiques durables. Les participants auront l'opportunité d'explorer des technologies innovantes et des solutions permettant d'améliorer l'efficacité opérationnelle. L'objectif est de permettre aux entreprises d'accéder à des innovations et de créer des collaborations qui soutiendront leur croissance.
    </p>
    <a href="#" className="subscribe-button">SUBSCRIBE</a>
  </div>
);
const BackContent2 = () => (
  <div className="card-back-content">
    <p>
      Des stands d'exposition, des démonstrations en direct et des opportunités d'acquisition de clients sont proposés pour permettre aux startups et entreprises de rencontrer directement leur clientèle cible. C'est l'occasion idéale de tester vos produits, de recueillir des retours instantanés et de fidéliser de nouveaux clients. Les participants peuvent ainsi mieux comprendre les besoins du marché, ajuster leurs offres en temps réel et renforcer leur présence auprès de leur public.
    </p>
    <a href="#" className="subscribe-button">SUBSCRIBE</a>
  </div>
);
const BackContent3 = () => (
  <div className="card-back-content">
    <p>
      Des sessions privées de pitching avec des investisseurs et des tables rondes avec des décideurs politiques sont proposées, offrant ainsi aux entrepreneurs l'opportunité de se connecter avec des investisseurs, des représentants du gouvernement et des influenceurs du secteur. C'est une occasion clé pour établir des relations cruciales en matière de financement, de réglementation et de croissance. Ces échanges permettent d'influencer les futurs cadres légaux.
    </p>
    <a href="#" className="subscribe-button">SUBSCRIBE</a>
  </div>
);

const Section4 = () => {
  // Hook pour l'animation d'entrée
  const { ref, inView } = useInView({
    triggerOnce: true, // L'animation ne se joue qu'une seule fois
    threshold: 0.1,    // Se déclenche quand 10% de la section est visible
  });

  return (
    // On ajoute la référence et la classe conditionnelle au conteneur principal
    <section className={`axes-section ${inView ? 'visible' : ''}`} ref={ref}>
      <div className="axes-title-group">
        <h2>Get Entrepreneurial</h2>
        <div className="axes-subtitle">
          <span className="line"></span>
          <h3>Trois Axes, Une Destination</h3>
          <span className="line"></span>
        </div>
      </div>

      <div className="axes-cards-container">
        {/* Carte 1: Business To Business */}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front" style={{ backgroundImage: `url(${b2bImage})` }}>
              <div className="card-title-content">
                <div className="title-decorator-line"></div>
                <h4>
                  <span className="text-orange">B</span>usiness
                </h4>
                <h4>
                  <span className="text-orange">To</span> <span className="text-orange">B</span>usiness
                </h4>
              </div>
            </div>
            <div className="flip-card-back">
              <BackContent1 />
            </div>
          </div>
        </div>

        {/* Carte 2: Business To Client */}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front" style={{ backgroundImage: `url(${b2cImage})` }}>
               <div className="card-title-content">
                <div className="title-decorator-line"></div>
                <h4>
                  <span className="text-orange">B</span>usiness
                </h4>
                <h4>
                  <span className="text-orange">To</span> <span className="text-orange">C</span>lient
                </h4>
              </div>
            </div>
            <div className="flip-card-back">
              <BackContent2 />
            </div>
          </div>
        </div>

        {/* Carte 3: Business To Stakeholders */}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front" style={{ backgroundImage: `url(${b2sImage})` }}>
              <div className="card-title-content">
                <div className="title-decorator-line"></div>
                <h4>
                  <span className="text-orange">B</span>usiness
                </h4>
                <h4>
                  <span className="text-orange">To</span> <span className="text-orange">S</span>takeholders
                </h4>
              </div>
            </div>
            <div className="flip-card-back">
              <BackContent3 />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;