import React from 'react';
import './section6.css';

// Importez les logos de vos sponsors
import logoTalys from '../../assets/images/stand.jpeg';
import logoA from '../../assets/images/stand.jpeg';
import logoDar from '../../assets/images/stand.jpeg';
// Ajoutez autant de logos que nécessaire
// import logoAutre from '../../assets/images/sponsors/autre.png';

const sponsorsData = [
  { name: 'Talys', logo: logoTalys },
  { name: 'Sponsor A', logo: logoA },
  { name: 'Dar Blockchain', logo: logoDar },
  // Ajoutez d'autres sponsors ici
  // { name: 'Autre Sponsor', logo: logoAutre },
];

const Section6 = () => {
  // On duplique la liste pour créer une boucle fluide et parfaite
  const duplicatedSponsors = [...sponsorsData, ...sponsorsData];

  return (
    <section className="sponsors-section">
      <div className="sponsors-header">
        <h2>Nos Sponsors</h2>
        <div className="sponsors-subtitle">
          <span className="line"></span>
          <p>Ils nous font confiance</p>
          <span className="line"></span>
        </div>
      </div>

      <div className="scroller-container">
        <div className="scroller">
          <ul className="sponsors-list">
            {duplicatedSponsors.map((sponsor, index) => (
              <li className="sponsor-item" key={index}>
                <img src={sponsor.logo} alt={sponsor.name} />
                {sponsor.name === 'Dar Blockchain' && <p>{sponsor.name}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Section6;