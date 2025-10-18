import React from 'react';
import './section6.css';

// --- Imports (tous les logos sont ici) ---
import managersLogo from '../../assets/images/managers.png';
import uibLogo from '../../assets/images/uib.png';
import lapresseLogo from '../../assets/images/lapresse.png';
import atbLogo from '../../assets/images/ATB.png';
import asteelflashLogo from '../../assets/images/asteelll.png';
import talysLogo from '../../assets/images/talys.png';
import digitalcollegeLogo from '../../assets/images/digitalcollege.png';
import slrLogo from '../../assets/images/SLR.png';
import darblockchainLogo from '../../assets/images/darblockchain.png';
import digicomLogo from '../../assets/images/digicom.png';
import monetiqueLogo from '../../assets/images/monétique.png';
import anetiLogo from '../../assets/images/Anettti.png';
import apiiLogo from '../../assets/images/apiii.png';
import atiiLogo from '../../assets/images/atiii.png';
import biasLogo from '../../assets/images/BIASS.png';
import bidLogo from '../../assets/images/BIDD.png';
import conectLogo from '../../assets/images/CONECT (2).png';
import daamLogo from '../../assets/images/DAAM-.png';
import fondationTunisieLogo from '../../assets/images/fond.png';
import honorisLogo from '../../assets/images/honoo.png';
import hotelLogo from '../../assets/images/hotell.png';
import ooredooLogo from '../../assets/images/oreedo-.png';
import tachghilLogo from '../../assets/images/tachghill.png';
import tunisianStartupsLogo from '../../assets/images/Tunisian startups.png';
import umaLogo from '../../assets/images/umaa.png';
import villageLogo from '../../assets/images/villagee.png';

// --- MODIFICATION : Nouvel ordre logique des sponsors ---
const sponsorsData = [
  // Catégorie : Partenaires Institutionnels & Publics
  { logo: apiiLogo },
  { logo: ooredooLogo },
  { logo: asteelflashLogo },
  { logo: talysLogo },
  { logo: anetiLogo },
  { logo: tachghilLogo },
  { logo: conectLogo },
  { logo: bidLogo },

  // Catégorie : Partenaires Financiers & Banques
  
  { logo: monetiqueLogo },
  { logo: digicomLogo },
  { logo: slrLogo },
  { logo: uibLogo },
  { logo: atbLogo },
  { logo: biasLogo },

  // Catégorie : Grandes Entreprises & Tech
  

  // Catégorie : Écosystème Startup & Éducation
  { logo: tunisianStartupsLogo },
  { logo: villageLogo },
  { logo: darblockchainLogo },
  { logo: honorisLogo },
  { logo: digitalcollegeLogo },
  { logo: umaLogo },
  { logo: atiiLogo },

  // Catégorie : Média & Services
  { logo: lapresseLogo },
  { logo: managersLogo },
  { logo: hotelLogo },
  { logo: daamLogo },
  { logo: fondationTunisieLogo },
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
              <img src={sponsor.logo} alt={`Logo partenaire ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Section6;