import React, { useState } from 'react';
import './Apropos.css'; // Le CSS mis à jour
import { aproposData } from './data/aproposData';

import GrandPublicTab from './components/GrandPublicTab';
import B2BDealDayTab from './components/B2BDealDayTab';
import GreenTechDayTab from './components/GreenTechDayTab';

const Apropos = () => {
  const [activeTab, setActiveTab] = useState('GRAND PUBLIC');

  const renderContent = () => {
    switch (activeTab) {
      case 'GRAND PUBLIC':
        return <GrandPublicTab data={aproposData.grandPublic} />;
      case 'B2B Deal Day':
        return <B2BDealDayTab data={aproposData.b2bDealDay} />;
      case 'GREEN&Tech Day':
        return <GreenTechDayTab data={aproposData.greenTechDay} />;
      default:
        return <GrandPublicTab data={aproposData.grandPublic} />;
    }
  };

  return (
    // Conteneur principal de la page
    <div className="apropos-page">
      {/* Section Bannière/Header */}
      <header className="apropos-header">
        <div className="header-content">
          <h1>À propos de l'Événement</h1>
          <p>Carte vers l'Excellence Entrepreneuriale !</p>
        </div>
      </header>

      {/* Contenu principal (onglets et panneaux) */}
      <main className="apropos-main-content">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'GRAND PUBLIC' ? 'active' : ''}`}
            onClick={() => setActiveTab('GRAND PUBLIC')}>
            GRAND PUBLIC
          </button>
          <button 
            className={`tab-btn ${activeTab === 'B2B Deal Day' ? 'active' : ''}`}
            onClick={() => setActiveTab('B2B Deal Day')}>
            B2B Deal Day
          </button>
          <button 
            className={`tab-btn ${activeTab === 'GREEN&Tech Day' ? 'active' : ''}`}
            onClick={() => setActiveTab('GREEN&Tech Day')}>
            GREEN&Tech Day
          </button>
        </div>

        <div className="tab-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Apropos;