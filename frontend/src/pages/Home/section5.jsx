import React, { useState } from 'react';
import './section5.css';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin, FaTimes } from 'react-icons/fa';

// Importez les images
import speakerImg1 from '../../assets/images/espace.JPG';
import speakerImgPlaceholder from '../../assets/images/espace.JPG';

const speakersData = [
  { 
    name: 'Gbite Oduneye', 
    title: 'Managing Partner @ ODBA | Investor | VC & Private Equity - UK | NIGERIA', 
    image: speakerImg1, 
    linkedin: 'https://www.linkedin.com/in/gbite-oduneye-9844983/', 
    description: 'Accélérer l\'avenir de l\'IA en Afrique : la convergence des incubateurs, accélérateurs et investisseurs.',
    countryCode: 'ng'
  },
  { 
    name: 'Jane Doe', 
    title: 'Lead Designer, TechCorp', 
    image: speakerImgPlaceholder, 
    linkedin: '#', 
    description: 'Le design thinking comme moteur de l\'innovation durable dans les startups africaines.',
    countryCode: 'tn'
  },
  // ... (les autres speakers restent les mêmes)
  { 
    name: 'John Smith', 
    title: 'AI Specialist, Innovate Inc.', 
    image: speakerImgPlaceholder, 
    linkedin: '#', 
    description: 'Les défis et opportunités de l\'intelligence artificielle générative pour le marché local.',
    countryCode: 'fr'
  },
  { 
    name: 'Amine Mezghich', 
    title: 'CEO Smart IT', 
    image: speakerImgPlaceholder, 
    linkedin: '#', 
    description: 'De la startup à la scale-up : les clés du financement et de la croissance en Afrique du Nord.',
    countryCode: 'tn'
  },
  { 
    name: 'Michael Brown', 
    title: 'Founder, Future Ventures', 
    image: speakerImgPlaceholder, 
    linkedin: '#', 
    description: 'Investir dans la prochaine génération : comment identifier les startups à fort potentiel.',
    countryCode: 'us'
  },
  { 
    name: 'Sarah Green', 
    title: 'CTO, Dev Solutions', 
    image: speakerImgPlaceholder, 
    linkedin: '#', 
    description: 'Les architectures techniques scalables pour les produits à forte croissance.',
    countryCode: 'de'
  },
  { 
    name: 'David Black', 
    title: 'CEO, Creative Minds', 
    image: speakerImgPlaceholder, 
    linkedin: '#', 
    description: 'La créativité et la culture d\'entreprise comme avantages compétitifs.',
    countryCode: 'ca'
  },
  { 
    name: 'Fatima Al-Fihri', 
    title: 'EdTech Innovator', 
    image: speakerImgPlaceholder, 
    linkedin: '#', 
    description: 'Révolutionner l\'éducation en Afrique grâce à la technologie.',
    countryCode: 'ma'
  },
];

const Section5 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="speakers-section" ref={ref}>
      <div className="speakers-header">
        <h2>À la rencontre de <span className="text-orange">Nos Conférenciers</span></h2>
      </div>
      <div className="gallery-container">
        <div className="gallery">
          {speakersData.slice(0, 8).map((speaker, index) => (
            <span key={index} style={{ '--i': index + 1 }}>
              <img src={speaker.image} alt={speaker.name} />
              <div className="gallery-speaker-info">
                <h3>{speaker.name}</h3>
                <p>{speaker.title}</p>
                <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <FaLinkedin />
                </a>
              </div>
            </span>
          ))}
        </div>
      </div>
      <div className="see-all-container">
        <button className="see-all-button" onClick={() => setIsModalOpen(true)}>
          See all Speakers
        </button>
      </div>
      <div className={`speakers-modal ${isModalOpen ? 'open' : ''}`}>
        <button className="modal-close-button" onClick={() => setIsModalOpen(false)}><FaTimes /></button>
        <div className="modal-content">
          <h2>Nos Conférenciers</h2>
          <div className="speakers-grid">
            {speakersData.map((speaker, index) => (
              <div className="grid-speaker-card" key={index}>
                <div className="card-image-container">
                  <img src={speaker.image} alt={speaker.name} className="card-speaker-image" />
                  {/* ===> LE DRAPEAU A ÉTÉ SUPPRIMÉ D'ICI <=== */}
                </div>
                <div className="card-static-info">
                  <h3 className="card-speaker-name">{speaker.name}</h3>
                  <p className="card-speaker-title">{speaker.title}</p>
                </div>
                <div className="card-overlay">
                  <div className="overlay-text-content">
                    {/* On affiche à nouveau le nom et le titre dans l'overlay */}
                    <h3 className="overlay-speaker-name">{speaker.name}</h3>
                    <p className="overlay-speaker-title">{speaker.title}</p>
                    <p className="overlay-speaker-description">{speaker.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5;