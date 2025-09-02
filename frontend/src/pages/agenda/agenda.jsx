import React, { useState } from 'react';
import './agenda.css';

const agendaData = {
  friday: [
    { id: 1, type: 'Conférence Plénière', time: '09h00 – 11h00', speaker: 'Ouverture Officielle', description: 'Rétrospective et analyse du Startup Act 1.0, et proposition de valeur vers un "Innovation Act".' },
    { id: 2, type: 'Success Stories', time: '11h00 – 12h00', speaker: 'Entrepreneurs Locaux & Diaspora', description: 'Présentation de 3 à 4 parcours inspirants illustrant les leviers et freins rencontrés.' },
    { id: 3, type: 'Panel Stratégique', time: '12h00 – 12h45', speaker: 'Experts & Décideurs', description: 'Tunisie 2035 : Où miser pour faire la différence ? Identification des secteurs prioritaires.' },
    { id: 4, type: 'Pause Café', time: '12h45 – 13h15', speaker: 'Networking', description: 'Un moment d\'échange et de connexion entre les participants et speakers.' },
    { id: 5, type: 'Panel Opérationnel', time: '13h15 – 14h00', speaker: 'Spécialistes Marchés', description: 'Accès aux marchés publics & internationaux : état acheteur innovant et rôle de la diaspora.' },
    { id: 6, type: 'Panel Opérationnel', time: '14h00 – 14h45', speaker: 'Investisseurs & Financiers', description: 'Financement et Investissement : Gaps structurels et introduction des SAFE Notes.' },
    { id: 7, type: 'Clôture', time: '14h45 – 15h00', speaker: 'Synthèse & Recommandations', description: 'Résumé des points clés et présentation des recommandations finales pour l\'écosystème.' },
  ],
  tuesday: [],
  wednesday: []
};

const Agenda = () => {
  const [activeTab, setActiveTab] = useState('friday');

  const getActiveDayName = () => {
    if (activeTab === 'tuesday') return 'Green Tech Day';
    if (activeTab === 'wednesday') return 'B2B Deal Day';
    return '';
  };

  return (
    <div className="agenda-container">
      <div className="agenda-header">
        <h1>Get Entrepreneurial 3.0 <br /><span>Agenda</span></h1>
        <nav className="agenda-nav">
          <button onClick={() => setActiveTab('friday')} className={activeTab === 'friday' ? 'active' : ''}>
            BIG DAY
          </button>
          <button onClick={() => setActiveTab('tuesday')} className={activeTab === 'tuesday' ? 'active' : ''}>
            Green Tech Day
          </button>
          <button onClick={() => setActiveTab('wednesday')} className={activeTab === 'wednesday' ? 'active' : ''}>
            B2B Deal Day
          </button>
        </nav>
      </div>

      <div className="agenda-content" key={activeTab}>
        {agendaData[activeTab].length > 0 ? (
          <div className="timeline-container">
            <ul className="timeline">
              {agendaData[activeTab].map((activity) => (
                <li className="timeline-item" key={activity.id}>
                  <div className="timeline-time">{activity.time}</div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">{activity.type}</h3>
                    <p className="timeline-speaker">{activity.speaker}</p>
                    <p className="timeline-description">{activity.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // ===> STRUCTURE "COMING SOON" SIMPLIFIÉE <===
          <div className="coming-soon-wrapper">
            <div className="cs-card">
              <h2 className="cs-title">{getActiveDayName()}</h2>
              <p className="cs-status">COMING SOON</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agenda;