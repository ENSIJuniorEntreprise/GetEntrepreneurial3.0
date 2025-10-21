import React from 'react';
import './Collaboration.css'; // Le CSS est inchangé

// --- Logos existants ---
import managersLogo from '../../assets/images/managers.png';
import uibLogo from '../../assets/images/uib.png';
import lapresseLogo from '../../assets/images/lapresse.png';
import atbLogo from '../../assets/images/ATB.png';
import asteelflashLogo from '../../assets/images/cdcc.png'; 
import talysLogo from '../../assets/images/talys.png';
import digitalcollegeLogo from '../../assets/images/digitalcollege.png';
// import slrLogo from '../../assets/images/SLR.png'; // Ancien logo, remplacé
import darblockchainLogo from '../../assets/images/darblockchain.png';
import digicomLogo from '../../assets/images/digicom.png';
import monetiqueLogo from '../../assets/images/monétique.png';
import ctaImage from '../../assets/images/stand.jpeg'; 
import anetiLogo from '../../assets/images/Anettti.png';
import apiiLogo from '../../assets/images/apiii.png';
import tachghilLogo from '../../assets/images/tachghill.png';

// --- Logos existants (suite) ---
import atiiLogo from '../../assets/images/atiii.png';
import biasLogo from '../../assets/images/BIASS.png';
import bidLogo from '../../assets/images/BID.png';
import conectLogo from '../../assets/images/CONECT (2).png';
import daamLogo from '../../assets/images/DAAM-.png';
import fondationTunisieLogo from '../../assets/images/fond.png';
import honorisLogo from '../../assets/images/honoo.png';
import hotelLaicoLogo from '../../assets/images/hotell.png';
import ooredooLogo from '../../assets/images/oreedo-.png';
import smartCapitalLogo from '../../assets/images/smartcapital-logo.png';
import tunisianStartupsLogo from '../../assets/images/Tunisian startups.png';
import umaLogo from '../../assets/images/umaa.png';
import villageLogo from '../../assets/images/villagee.png';

// --- NOUVEAUX IMPORTS ---
import slrDarkLogo from '../../assets/images/SLRdark.png'; // Nouveau logo SLR
import sepicmLogo from '../../assets/images/sepcmm.png';
import insatPressLogo from '../../assets/images/insat_press.png';


// --- NOUVELLE STRUCTURE DES PARTENAIRES ---

const goldPartners = [
  { image: asteelflashLogo, name: 'Asteelflash', link: 'https://www.cdc.tn/fr' },
  { image: ooredooLogo, name: 'Ooredoo', link: 'https://www.ooredoo.tn/' },
  { image: villageLogo, name: 'The Dot (Village by CA)', link: 'https://www.startupvillage.tn/en/' },
];

const silverPartners = [
  { image: daamLogo, name: 'DAAM', link: 'https://www.daam.tn/' },
  { image: atiiLogo, name: 'ATII', link: 'https://www.atii.tn/' },
  { image: hotelLaicoLogo, name: 'Laico Hotel' },
  { image: sepicmLogo, name: 'SEPCM' }, // AJOUT
];

const alliesPartners = [
  { image: biasLogo, name: 'BIAS', link: 'https://bias.com.tn/fr' },
  { image: fondationTunisieLogo, name: 'Fondation de Tunisie', link: 'https://fondationtunisie.org' },
  { image: honorisLogo, name: 'Honoris United Universities', link: 'https://honoris.net/our-institutions/tunisia/' },
  { image: smartCapitalLogo, name: 'Smart Capital', link: 'https://www.smartcapital.tn/' },
  { image: tunisianStartupsLogo, name: 'Tunisian Startups', link: 'https://startup.gov.tn/' },
  { image: bidLogo, name: 'BID', link: 'https://bidata-consulting.tn/' }, // AJOUT
];

const institutionalPartners = [
  { image: umaLogo, name: 'UMA', link: 'https://uma.rnu.tn/fr' },
  { image: conectLogo, name: 'CONECT', link: 'https://www.conect.org.tn/' },
  { image: anetiLogo, name: 'ANETI', link: 'https://www.emploi.nat.tn/fo/Fr/global.php' },
  { image: apiiLogo, name: 'APII', link: 'https://www.tunisieindustrie.nat.tn/FR/doc.asp?docid=753&mcat=22&mrub=178' },
  { image: slrDarkLogo, name: 'SLR', link: 'https://www.slrconsulting.com/' }, // MODIFICATION
  { image: lapresseLogo, name: 'La Presse', link: 'https://lapresse.tn/' },
  { image: tachghilLogo, name: 'Ministère de l\'Emploi', link: 'https://www.emploi.gov.tn/fr/' },
  { image: insatPressLogo, name: 'INSAT Presse' }, // AJOUT
];

// Helper pour afficher une grille de partenaires
const PartnerGrid = ({ partners }) => (
  <div className="partners-grid">
    {partners.map((partner, index) => (
      <a 
        key={index} 
        href={partner.link || '#'} // Fallback pour les liens non définis
        target="_blank" 
        rel="noopener noreferrer" 
        className="partner-card-link"
      >
        <div className="partner-card">
          <img src={partner.image} alt={`Logo de ${partner.name}`} />
        </div>
      </a>
    ))}
  </div>
);

const Collaboration = () => {
  return (
    <div className="collaboration-page">
      
      <header className="collab-header">
        <h2>Nos <span className="highlight">Partenaires</span></h2>
        <p>Ensemble, nous créons un écosystème où l’innovation prospère</p>
      </header>

      {/* --- Section Gold --- */}
      <section className="collab-section partners-category">
        <h3 className="category-title">Gold</h3>
        <PartnerGrid partners={goldPartners} />
      </section>

      {/* --- Section Silver --- */}
      <section className="collab-section partners-category">
        <h3 className="category-title">Silver</h3>
        <PartnerGrid partners={silverPartners} />
      </section>

      {/* --- Section Nos Alliés --- */}
      <section className="collab-section partners-category">
        <h3 className="category-title">Nos Alliés</h3>
        <PartnerGrid partners={alliesPartners} />
      </section>
      
      {/* --- Section Institutions --- */}
      <section className="collab-section partners-category">
        <h3 className="category-title">Institutions</h3>
        <PartnerGrid partners={institutionalPartners} />
      </section>


      <section className="collab-section become-partner-cta">
        <div className="cta-card">
          <div className="cta-image">
            <img src={ctaImage} alt="Partenaires discutant lors d'un événement" />
          </div>
          <div className="cta-content">
            <h3>Rejoignez les partenaires de GET E 3.0</h3>
            <p>
              À travers Get Entrepreneurial 3.0, vous bénéficiez d’une visibilité stratégique: renforcez votre image de marque et créez des connexions durables avec des startups, investisseurs, institutions et acteurs clés de l’innovation en Tunisie.
            </p>
            <div className="cta-buttons">
              <a href="/exposant" className="cta-btn primary">Devenir Partenaire</a>
              <a href="/Dossierpartenariat.pdf" className="cta-btn secondary" download="Dossier partenariat.pdf">Dossier de collaboration</a>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Collaboration;