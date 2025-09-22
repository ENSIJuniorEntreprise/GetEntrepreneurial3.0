import React from 'react';
import './section6.css';

import managersLogo from '../../assets/images/managers.png';
import uibLogo from '../../assets/images/uib.png';
import lapresseLogo from '../../assets/images/lapresse.png';
import atbLogo from '../../assets/images/ATB.png';
import asteelflashLogo from '../../assets/images/Asteelflash.png';
import talysLogo from '../../assets/images/talys.png';
import resnatiLogo from '../../assets/images/resnati.png';
import digitalcollegeLogo from '../../assets/images/digitalcollege.png';
import slrLogo from '../../assets/images/SLR.png';
import darblockchainLogo from '../../assets/images/darblockchain.png';
import digicomLogo from '../../assets/images/digicom.png';
import monetiqueLogo from '../../assets/images/monétique.png';

const sponsorsData = [
  { logo: managersLogo },
  { logo: uibLogo },
  { logo: lapresseLogo },
  { logo: atbLogo },
  { logo: asteelflashLogo },
  { logo: talysLogo },
  { logo: resnatiLogo },
  { logo: digitalcollegeLogo },
  { logo: slrLogo },
  { logo: darblockchainLogo },
  { logo: digicomLogo },
  { logo: monetiqueLogo },
];

const Section6 = () => {
  const duplicatedSponsors = [...sponsorsData, ...sponsorsData];

  return (
    <section className="sponsors-section">
      <div className="sponsors-header">
        <h2>Nos Précieux Alliés</h2>
      </div>
      <div className="scroller-container"> 
        <ul className="sponsors-list">
          {duplicatedSponsors.map((sponsor, index) => (
            <li className="sponsor-item" key={index}>
              {/* MODIFICATION : Le nom du partenaire a été supprimé */}
              <img src={sponsor.logo} alt={`Logo partenaire ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Section6;