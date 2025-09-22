import React, { useState } from 'react';
import './agenda.css';

const agendaData = {
  // --- MODIFICATION ICI : Tous les champs 'speaker' ont été vidés ---
  friday: [
    {
      id: 1,
      type: 'PLÉNIÈRE – INNOVATION ACT: COMMENT CONCRÉTISER ?',
      time: '09h00 – 10h15',
      speaker: '', // <- Supprimé
      description: `• 09h00 – 09h15 | Ouverture officielle<br />• 09h15 – 09h45 | Rétrospective du Startup Act 1.0 et analyse critique<br />• 09h45 – 10h15 | État de lieux`
    },
    {
      id: 2,
      type: 'KEYNOTES',
      time: '10h30 – 11h00',
      speaker: '', // <- Supprimé
      description: `Des diasporants et des locaux présentent leurs trajectoires.<br />Objectif : Illustrer concrètement les leviers et freins rencontrés.`
    },
    {
      id: 3,
      type: 'PAUSE CAFÉ',
      time: '11h00 – 11h30',
      speaker: '', // <- Supprimé
      description: 'Favoriser les rencontres et les échanges informels entre les participants.'
    },
    {
      id: 4,
      type: 'PANEL 1 – TUNISIE 2035 : OÙ MISER POUR FAIRE LA DIFFÉRENCE ?',
      time: '11h30 – 12h15',
      speaker: '', // <- Supprimé
      description: `<div class="session-block">
                      <div class="session-content">• L'arbitrage : financer moins mais mieux<br />• Un cadre sélectif et itératif pour le financement<br />• Les filières où la Tunisie peut être compétitive dans 10 ans</div>
                    </div>
                    <div class="session-block">
                      <h4 class="session-title workshop-title-main">Workshop 1</h4>
                      <div class="session-content">Build Your Startup from Scratch</div>
                    </div>`
    },
    {
      id: 5,
      type: 'PANEL 2 – ACCÈS AUX MARCHÉS PUBLICS & INTERNATIONAUX',
      time: '12h30 – 13h45',
      speaker: '', // <- Supprimé
      description: `<div class="session-block">
                      <div class="session-content">• Marchés publics : vers un État acheteur innovant<br />• Accélérer l'accès aux marchés globaux : Rôle de la Diaspora<br />• Vision internationale dès la création</div>
                    </div>
                    <div class="session-block">
                      <h4 class="session-title workshop-title-main">Workshop 2</h4>
                      <div class="session-content">Étudiant et Startups – Développez les compétences pour réussir demain</div>
                    </div>`
    },
    {
      id: 6,
      type: 'PANEL 3 – FINANCEMENT ET INVESTISSEMENT',
      time: '14h00 – 14h45',
      speaker: '', // <- Supprimé
      description: `<div class="session-block">
                      <div class="session-content">• Cartographie actuelle du financement<br />• Rôle de la diaspora dans le financement international<br />• Modernisation des mécanismes d'investissement</div>
                    </div>
                    <div class="session-block">
                      <h4 class="session-title workshop-title-main">Workshop 3</h4>
                      <div class="session-content">AI ERA : Nouvelle Cartographie des Métiers</div>
                    </div>`
    },
    {
      id: 7,
      type: 'CLÔTURE',
      time: '14h45 – 15h00',
      speaker: '', // <- Supprimé
      description: `Mot de clôture et proposition de valeur vers un "Innovation Act".`
    },
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
                    {/* Le paragraphe <p> ne s'affichera pas s'il est vide */}
                    <p className="timeline-speaker">{activity.speaker}</p> 
                    <div className="timeline-description" dangerouslySetInnerHTML={{ __html: activity.description }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
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