import React, { useState, useEffect } from 'react';
import './Apropos.css'; // Le CSS mis à jour
import { FALLBACK_APROPOS_DATA } from './data/aproposData';
import axiosClient from '../../api/axiosClient';
import { getCached, setCached } from '../../api/contentCache';
import Spinner from '../../components/Spinner/Spinner';

import GrandPublicTab from './components/GrandPublicTab';
import B2BDealDayTab from './components/B2BDealDayTab';
import GreenTechDayTab from './components/GreenTechDayTab';

const mapSpeakersForDisplay = (speakers) =>
  (speakers || []).map((speaker) => ({
    name: speaker.name,
    role: speaker.role,
    image: speaker.photoUrl,
  }));

// panels arrive à plat (les journées sont dynamiques, cf. EventSettings.days) :
// on les regroupe ici par leur champ "section".
const buildPanelsData = (flatPanels) => {
  // grandPublic (l'onglet "Thème") n'est pas encore piloté par le CMS.
  const data = { grandPublic: FALLBACK_APROPOS_DATA.grandPublic };

  const panels = flatPanels || [];
  const b2bPanels = panels.filter((p) => p.section === 'b2bDealDay');
  const workshops = panels.filter((p) => p.section === 'greenTechDay');

  data.b2bDealDay = b2bPanels.length > 0
    ? {
        panels: b2bPanels.map((panel, index) => ({
          id: index + 1,
          title: panel.title,
          items: panel.items,
          speakers: mapSpeakersForDisplay(panel.speakers),
        })),
      }
    : FALLBACK_APROPOS_DATA.b2bDealDay;

  data.greenTechDay = workshops.length > 0
    ? {
        workshops: workshops.map((workshop, index) => ({
          id: index + 1,
          title: workshop.title,
          subtitle: workshop.subtitle,
          speakers: mapSpeakersForDisplay(workshop.speakers),
        })),
      }
    : FALLBACK_APROPOS_DATA.greenTechDay;

  return data;
};

const Apropos = () => {
  const cachedPanels = getCached('/content/panels');
  const [activeTab, setActiveTab] = useState('GRAND PUBLIC');
  const [aproposData, setAproposData] = useState(buildPanelsData(cachedPanels));
  const [loading, setLoading] = useState(!cachedPanels);

  useEffect(() => {
    if (getCached('/content/panels')) return;
    let isMounted = true;
    axiosClient.get('/content/panels')
      .then(({ data }) => {
        setCached('/content/panels', data.data);
        if (isMounted) setAproposData(buildPanelsData(data.data));
      })
      .catch(() => {
        // Le contenu reste sur les données de secours en cas d'échec réseau.
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const renderContent = () => {
    if (loading && activeTab !== 'GRAND PUBLIC') return <Spinner />;
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
          <h1>À propos le <span className='big'>BIG DAY</span></h1>
          <p>Carte vers l'Excellence Entrepreneuriale !</p>
        </div>
      </header>

      {/* Contenu principal (onglets et panneaux) */}
      <main className="apropos-main-content">
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === 'GRAND PUBLIC' ? 'active' : ''}`}
            onClick={() => setActiveTab('GRAND PUBLIC')}>
            Thème
          </button>
          <button
            className={`tab-btn ${activeTab === 'B2B Deal Day' ? 'active' : ''}`}
            onClick={() => setActiveTab('B2B Deal Day')}>
            Panels
          </button>
          <button
            className={`tab-btn1 ${activeTab === 'GREEN&Tech Day' ? 'active' : ''}`}
            onClick={() => setActiveTab('GREEN&Tech Day')}>
            Workshops
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
