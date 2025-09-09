import React from 'react';
import './Collaboration.css'; // Le CSS a été entièrement réécrit

// --- Importer tous les logos des partenaires ---
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
import ctaImage from '../../assets/images/stand.jpeg'; 


const partnersData = [
  { image: uibLogo, name: 'UIB' },
  { image: atbLogo, name: 'ATB' },
  { image: darblockchainLogo, name: 'Dar Blockchain' },
  { image: asteelflashLogo, name: 'Asteelflash' },
  { image: managersLogo, name: 'Managers' },
  { image: lapresseLogo, name: 'La Presse' },
  { image: talysLogo, name: 'Talys' },
  { image: resnatiLogo, name: 'API' },
  { image: digitalcollegeLogo, name: 'Digital College' },
  { image: slrLogo, name: 'SLR' },
  { image: digicomLogo, name: 'Digicom' },
  { image: monetiqueLogo, name: 'Monétique' },
];

const Collaboration = () => {
  return (
    <div className="collaboration-page">
      
      {/* La section hero a été supprimée, la page commence ici */}

      <section className="collab-section partners">
        <div className="section-header">
          <h2>Nos <span className="highlight">Partenaires</span> Stratégiques</h2>
          <p>Une synergie d’expertises et de ressources. Ensemble, nous créons un écosystème où l’innovation prospère.</p>
        </div>
        <div className="partners-grid">
          {partnersData.map((partner, index) => (
            <div key={index} className="partner-card">
              <img src={partner.image} alt={partner.name} />
            </div>
          ))}
        </div>
      </section>

      <section className="collab-section become-partner-cta">
        <div className="cta-card">
          <div className="cta-image">
            <img src={ctaImage} alt="Partenaires discutant lors d'un événement" />
          </div>
          <div className="cta-content">
            <h3>Rejoignez les partenaires stratégiques de GET 3.0</h3>
            <p>
              Participez à trois jours de coopération, de visibilité ciblée et d’échanges à forte valeur ajoutée. En tant que partenaire, vous accompagnez l’un des plus grands événements tech du continent et affirmez votre engagement pour l’innovation et la transformation digitale en Afrique.
            </p>
            <div className="cta-buttons">
              <a href="/exposant" className="cta-btn primary">Devenir Partenaire</a>
              <a href="/Dossierpartenariat.pdf" className="cta-btn secondary" download="Dossier partenariat.pdf">Dossier de partenariat</a>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Collaboration;