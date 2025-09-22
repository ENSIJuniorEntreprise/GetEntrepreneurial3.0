import React, { useState } from 'react';
import './section5.css';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin, FaTimes } from 'react-icons/fa';

// --- ÉTAPE 1 : Importer toutes les images des conférenciers ---
import raziMilaniImg from '../../assets/images/razi.png';
import taoufikRajhiImg from '../../assets/images/tawfik.png';
import walidBelHajAmorImg from '../../assets/images/walid.png';
import ridhaGouiaImg from '../../assets/images/ridha.png';
import imenLouatiImg from '../../assets/images/imen.png';
import karimBenSaidImg from '../../assets/images/karim.jpg';
import tarekGassaImg from '../../assets/images/tarek.png';
import amineMezghichImg from '../../assets/images/amin.png';
import hamedBenidaImg from '../../assets/images/Hamed.jpg';
import sawssenBelhajAmorImg from '../../assets/images/saws.png';
// Vous pouvez en ajouter d'autres ici si nécessaire

// --- ÉTAPE 2 : Remplacer les données avec les vraies informations ---
const speakersData = [
  { 
    name: 'Razi Milani', 
    title: 'CEO of COGEPHA', 
    image: raziMilaniImg, 
    linkedin: '#', // Remplacez par le vrai lien LinkedIn
    description: 'Une vision stratégique pour l\'industrie pharmaceutique et la croissance durable en Afrique du Nord.'
  },
  { 
    name: 'Taoufik Rajhi', 
    title: 'Économiste et Ancien Ministre', 
    image: taoufikRajhiImg, 
    linkedin: '#',
    description: 'Analyse des réformes économiques et des perspectives de développement pour la Tunisie post-transition.'
  },
  { 
    name: 'Walid Bel Haj Amor', 
    title: 'Expert International en Gestion des Contrats', 
    image: walidBelHajAmorImg, 
    linkedin: '#',
    description: 'Les clés de la négociation et de la gestion de contrats complexes dans un contexte international.'
  },
  { 
    name: 'Ridha Gouia', 
    title: 'Économiste et Professeur à la FSEG', 
    image: ridhaGouiaImg, 
    linkedin: '#',
    description: 'Les modèles économiques émergents et leur applicabilité dans l\'écosystème tunisien.'
  },
  { 
    name: 'Imen Louati', 
    title: 'Conseillère en ODD et Transition Durable', 
    image: imenLouatiImg, 
    linkedin: '#',
    description: 'Comment intégrer les Objectifs de Développement Durable au cœur de la stratégie des entreprises.'
  },
  { 
    name: 'Karim Ben Said', 
    title: 'Auteur et Chroniqueur Économique', 
    image: karimBenSaidImg, 
    linkedin: '#',
    description: 'Décryptage des tendances économiques et des enjeux pour l\'entrepreneuriat en Tunisie.'
  },
  { 
    name: 'Tarek Gassa', 
    title: 'Consultant en Ressources Humaines', 
    image: tarekGassaImg, 
    linkedin: '#',
    description: 'Le capital humain comme levier de performance : attirer, développer et retenir les talents.'
  },
  { 
    name: 'Amine Mezghich', 
    title: 'CEO de Smart IT', 
    image: amineMezghichImg, 
    linkedin: '#',
    description: 'La transformation digitale des entreprises : défis, opportunités et retours d\'expérience.'
  },
  { 
    name: 'Hamed Benida', 
    title: 'Modérateur et Expert en Communication', 
    image: hamedBenidaImg, 
    linkedin: '#',
    description: 'Facilitateur des échanges, il guide les discussions pour en extraire des insights pertinents et concrets.'
  },
  { 
    name: 'Sawssen Belhaj Amor', 
    title: 'Modératrice et Spécialiste de l\'Écosystème Startup', 
    image: sawssenBelhajAmorImg, 
    linkedin: '#',
    description: 'Animatrice des débats, elle apporte son expertise pour connecter les idées et stimuler l\'innovation.'
  },
];

const Section5 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Bloque/débloque le scroll de la page quand la modale s'ouvre/se ferme
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