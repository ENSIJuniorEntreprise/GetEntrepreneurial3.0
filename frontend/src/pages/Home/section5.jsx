import React, { useState } from 'react';
import './section5.css';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin, FaTimes } from 'react-icons/fa';

// --- VÉRIFIEZ ATTENTIVEMENT CETTE SECTION ---
// Assurez-vous que chaque nom de fichier correspond EXACTEMENT à ce que vous avez dans vos dossiers.

// Anciens imports (probablement corrects)
import raziMilaniImg from '../../assets/images/Razi Milani.jpg';
import sawssenHajAmorImg from '../../assets/images/sawsen-Haj-Amor.webp'; // Notez le .webp et les tirets
import adelChouariImg from '../../assets/images/Adel Chouari.jpg';
import fatmaTaghoutiImg from '../../assets/images/Fatma_Taghouti.jpg';
import jiheneElOukadiImg from '../../assets/images/Jihene El Oukadi.jpg';
import karimAhresImg from '../../assets/images/Karim Ahres.webp'; // Notez le .webp
import omarBouzouadaImg from '../../assets/images/Omar_Bouzouada.jpg';
import ridhaDriraImg from '../../assets/images/Ridha Drira (1).jpg';
import wahbOuertaniImg from '../../assets/images/Wahb Ouertani.webp'; // Notez le .webp

// Nouveaux imports (ceux qui posent probablement problème)
import chirazArfaouiImg from '../../assets/images/chiraz.jpg';   // Vérifiez la casse de "arfaoui"
import karimBououniImg from '../../assets/images/Karim bououni.jpg';    // Vérifiez la casse de "bououni"
import mehdiFarhatImg from '../../assets/images/mehdi farhat.png';       // Vérifiez la casse et l'extension .png
import walidHadjAmorImg from '../../assets/images/walid.png';         // Assurez-vous que speakers.JPG existe
import rymGmatiImg from '../../assets/images/gmatii.png';              // Assurez-vous que speakers.JPG existe


// --- Le reste de votre code est correct ---
const speakersData = [
  { 
    name: 'Jihene El Oukadi', 
    title: 'Émissaire du ministère de l\'Enseignement supérieur', 
    image: jiheneElOukadiImg, 
    linkedin: '#',
    description: 'Engagée dans le développement de la recherche scientifique et la promotion de l\'excellence académique.'
  },
  { 
    name: 'Chiraz Arfaoui', 
    title: 'DG Wiki startup', 
    image: chirazArfaouiImg, 
    linkedin: '#',
    description: 'Pionnière de l\'écosystème startup, elle guide les innovateurs vers le succès et la croissance.'
  },
  { 
    name: 'Sawsen Haj Amor', 
    title: 'CEO of YOU.Branded', 
    image: sawssenHajAmorImg, 
    linkedin: '#',
    description: 'Spécialiste du branding et de la stratégie de marque, aidant les entreprises à construire leur identité.'
  },
  { 
    name: 'Adel Chouari', 
    title: 'DG RNE', 
    image: adelChouariImg, 
    linkedin: '#',
    description: 'Expert en registres nationaux des entreprises, au cœur de la modernisation administrative.'
  },
  { 
    name: 'Wahb Ouertani', 
    title: 'Président CONECT INTECH', 
    image: wahbOuertaniImg, 
    linkedin: '#',
    description: 'Leader engagé pour la promotion du secteur privé et le développement économique en Tunisie.'
  },
  { 
    name: 'Omar Bouzouada', 
    title: 'DG APII', 
    image: omarBouzouadaImg, 
    linkedin: '#',
    description: 'Acteur majeur de la promotion de l\'investissement industriel et de l\'innovation en Tunisie.'
  },
  { 
    name: 'Fatma Taghouti', 
    title: 'Founder of ecospark', 
    image: fatmaTaghoutiImg, 
    linkedin: '#',
    description: 'Experte en entrepreneuriat durable et fondatrice d\'ecospark, un acteur clé de l\'innovation verte.'
  },
  { 
    name: 'Ridha Drira', 
    title: 'Président de la commission supérieure d\'exclusion', 
    image: ridhaDriraImg, 
    linkedin: '#',
    description: 'Spécialiste des marchés publics et de la régulation économique au sein de la présidence du gouvernement.'
  },
  { 
    name: 'Razi Milani', 
    title: 'CEO of COGEPHA', 
    image: raziMilaniImg, 
    linkedin: '#',
    description: 'Une vision stratégique pour l\'industrie pharmaceutique et la croissance durable en Afrique du Nord.'
  },
  { 
    name: 'Karim Ahres', 
    title: 'CEO Netcom Tunisia & BE CONECT', 
    image: karimAhresImg, 
    linkedin: '#',
    description: 'Visionnaire dans le secteur des technologies de l\'information et des télécommunications en Tunisie.'
  },
  { 
    name: 'Walid Hadj Amor', 
    title: 'Administrateur Pegazeus International', 
    image: walidHadjAmorImg, 
    linkedin: '#',
    description: 'Expert en commerce international et en développement de partenariats stratégiques.'
  },
  { 
    name: 'Karim Bououni', 
    title: 'Responsable pôle métier à la CDC', 
    image: karimBououniImg, 
    linkedin: '#',
    description: 'Spécialiste du financement et de l\'investissement au service du développement économique.'
  },
  { 
    name: 'Mehdi Farhat', 
    title: 'Responsable direction RSE chez UBCI', 
    image: mehdiFarhatImg, 
    linkedin: '#',
    description: 'Acteur clé de la responsabilité sociétale des entreprises dans le secteur bancaire.'
  },
  { 
    name: 'Rym Gmati', 
    title: 'Avocate, Spécialisée en Venture Capital', 
    image: rymGmatiImg, 
    linkedin: '#',
    description: 'Experte juridique en capital-risque, accompagnant les startups dans leurs levées de fonds.'
  },
];

const Section5 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref } = useInView({ triggerOnce: true, threshold: 0.1 });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.style.overflow = isModalOpen ? 'auto' : 'hidden';
  };

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
              </div>
            </span>
          ))}
        </div>
      </div>
      <div className="see-all-container">
        <button className="see-all-button" onClick={toggleModal}>
          Voir tous les conférenciers
        </button>
      </div>
      <div className={`speakers-modal ${isModalOpen ? 'open' : ''}`}>
        <button className="modal-close-button" onClick={toggleModal}><FaTimes /></button>
        <div className="modal-content">
          <h2>Nos Conférenciers</h2>
          <div className="speakers-grid">
            {speakersData.map((speaker, index) => (
              <div className="grid-speaker-card" key={index}>
                <div className="card-image-container">
                  <img src={speaker.image} alt={speaker.name} className="card-speaker-image" />
                </div>
                <div className="card-static-info">
                  <h3 className="card-speaker-name">{speaker.name}</h3>
                  <p className="card-speaker-title">{speaker.title}</p>
                </div>
                <div className="card-overlay">
                  <div className="overlay-text-content">
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