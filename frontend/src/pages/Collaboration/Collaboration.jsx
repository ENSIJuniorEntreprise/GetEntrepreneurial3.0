import React from 'react';
import './Collaboration.css'; // Le CSS est inchangé

// --- Logos existants ---
import managersLogo from '../../assets/images/managers.png';
import uibLogo from '../../assets/images/uib.png';
import lapresseLogo from '../../assets/images/lapresse.png';
import atbLogo from '../../assets/images/ATB.png';
// Note: Le nom du fichier dans l'image est "asteell.png", j'utilise "Asteelflash.png" qui était déjà dans votre code
import asteelflashLogo from '../../assets/images/Asteelflash.png'; 
import talysLogo from '../../assets/images/talys.png';
import digitalcollegeLogo from '../../assets/images/digitalcollege.png';
import slrLogo from '../../assets/images/SLR.png';
import darblockchainLogo from '../../assets/images/darblockchain.png';
import digicomLogo from '../../assets/images/digicom.png';
import monetiqueLogo from '../../assets/images/monétique.png';
import ctaImage from '../../assets/images/stand.jpeg'; 
import anetiLogo from '../../assets/images/Anettti.png';
import apiiLogo from '../../assets/images/apiii.png';
import tachghilLogo from '../../assets/images/tachghill.png';

// --- AJOUT : Import des logos manquants de la capture ---
import atiiLogo from '../../assets/images/atiii.png';
import biasLogo from '../../assets/images/BIASS.png';
import bidLogo from '../../assets/images/BIDD.png';
import conectLogo from '../../assets/images/CONECT (2).png';
import daamLogo from '../../assets/images/DAAM-.png';
import fondationTunisieLogo from '../../assets/images/fond.png';
import honorisLogo from '../../assets/images/honoo.png';
import hotelLaicoLogo from '../../assets/images/hotell.png'; // En supposant que "hotel.png" est Laico
import ooredooLogo from '../../assets/images/oreedo-.png';
import smartCapitalLogo from '../../assets/images/smartcapital-logo.png';
import tunisianStartupsLogo from '../../assets/images/Tunisian startups.png';
import umaLogo from '../../assets/images/umaa.png';
import villageLogo from '../../assets/images/villagee.png'; // En supposant que "village.png" est The Dot (Village by CA)


// --- MODIFICATION : Liste complète des partenaires ---
const partnersData = [
  { image: uibLogo, name: 'UIB', link: 'https://www.uib.com.tn/' },
  { image: atbLogo, name: 'ATB', link: 'https://www.atb.tn/' },
  { image: daamLogo, name: 'DAAM', link: 'https://www.daam.tn/' }, 
  { image: anetiLogo, name: 'ANETI', link: 'https://www.emploi.nat.tn/fo/Fr/global.php' },
   { image: fondationTunisieLogo, name: 'Fondation de Tunisie', link: 'https://fondationtunisie.org' },
  { image: honorisLogo, name: 'Honoris United Universities', link: 'https://honoris.net/our-institutions/tunisia/' },
  { image: ooredooLogo, name: 'Ooredoo', link: 'https://www.ooredoo.tn/' },
   { image: atiiLogo, name: 'ATII', link: 'https://www.atii.tn/' },
  { image: biasLogo, name: 'BIAS', link: 'https://bias.com.tn/fr' },
  { image: villageLogo, name: 'The Dot (Village by CA)', link: 'https://www.startupvillage.tn/en/' },
  { image: apiiLogo, name: 'APII', link: 'https://www.tunisieindustrie.nat.tn/FR/doc.asp?docid=753&mcat=22&mrub=178' },
  { image: tachghilLogo, name: 'Ministère de l\'Emploi', link: 'https://www.emploi.gov.tn/fr/' },
  { image: bidLogo, name: '', link: 'https://bidata-consulting.tn/' },
  { image: conectLogo, name: 'CONECT', link: 'https://www.conect.org.tn/' },
  { image: tunisianStartupsLogo, name: 'Tunisian Startups', link: 'https://startup.gov.tn/' },
  { image: umaLogo, name: 'UMA', link: 'https://uma.rnu.tn/fr' },
  { image: darblockchainLogo, name: 'Dar Blockchain', link: 'https://darblockchain.io/' },
  { image: asteelflashLogo, name: 'Asteelflash', link: 'https://www.asteelflash.com/' },
  { image: managersLogo, name: 'Managers', link: 'https://managers.tn/' },
  { image: lapresseLogo, name: 'La Presse', link: 'https://lapresse.tn/' },
  { image: talysLogo, name: 'Talys', link: 'https://www.talys.digital/' },
  { image: hotelLaicoLogo, name: 'Laico Hotel' },
  { image: digitalcollegeLogo, name: 'Digital College', link: 'https://digital-college.fr/campus/tunis/' },
  { image: slrLogo, name: 'SLR', link: 'https://www.slrconsulting.com/' },
  { image: digicomLogo, name: 'Digicom', link: 'https://www.digicom.io/' },
  { image: monetiqueLogo, name: 'Monétique Tunisie', link: 'https://monetiquetunisie.com/' },
  // --- AJOUTS ---
  
];

const Collaboration = () => {
  return (
    <div className="collaboration-page">
      
      <section className="collab-section partners">
        <div className="section-header">
          <h2>Nos <span className="highlight">Partenaires</span> </h2>
          <p> Ensemble, nous créons un écosystème où l’innovation prospère.</p>
        </div>
        <div className="partners-grid">
          {partnersData.map((partner, index) => (
            <a 
              key={index} 
              href={partner.link} 
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