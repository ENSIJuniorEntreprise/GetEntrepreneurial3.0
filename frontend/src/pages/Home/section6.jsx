import React from 'react';
import './section6.css';

// Importez les logos de vos sponsors
import logoSponsor from '../../assets/images/stand.jpeg';

// La liste de base a été allongée pour assurer un défilement continu
const sponsorsData = [
  { name: 'Talys Consulting', logo: logoSponsor },
  { name: 'Creative Minds', logo: logoSponsor },
  { name: 'Dar Blockchain', logo: logoSponsor },
  { name: 'Innovatech', logo: logoSponsor },
  { name: 'Quantum Leap', logo: logoSponsor },
  { name: 'Synergy Hub', logo: logoSponsor },
  { name: 'Apex Solutions', logo: logoSponsor },
  { name: 'Future Forge', logo: logoSponsor },
  { name: 'Visionary Co.', logo: logoSponsor },
  { name: 'NextGen Partners', logo: logoSponsor },
];

const Section6 = () => {
  // On duplique la liste pour l'animation de défilement infinie
  const duplicatedSponsors = [...sponsorsData, ...sponsorsData];

  return (
    <section className="sponsors-section">
      <div className="sponsors-header">
        {/* Le titre que vous avez demandé */}
        <h2>Nos Partenaires Précieux</h2>
        {/* Le sous-titre que vous avez demandé */}
      </div>
      <div className="scroller-container"> 
        <ul className="sponsors-list">
          {duplicatedSponsors.map((sponsor, index) => (
            <li className="sponsor-item" key={index}>
              {/* Le nom est maintenant un <p> simple sous l'image */}
              <img src={sponsor.logo} alt={`Logo de ${sponsor.name}`} />
              <p className="sponsor-name">{sponsor.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Section6;