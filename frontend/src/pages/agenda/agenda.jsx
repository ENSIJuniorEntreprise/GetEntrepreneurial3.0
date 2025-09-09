import React, { useState } from 'react';
import './agenda.css';

const agendaData = {
  friday: [
    { id: 1, type: 'Conférence Plénière', time: '09h00 – 11h00', speaker: 'Ouverture Officielle', description: 'Rétrospective et analyse du Startup Act 1.0, et proposition de valeur vers un "Innovation Act". (Session commune)' },
    
    // --- DÉBUT DES SESSIONS EN PARALLÈLE ---
    { 
      id: 2, 
      type: 'Success Stories / Workshop', 
      time: '11h00 – 12h00', 
      speaker: 'Sessions en parallèle', 
      description: `
--- SESSION PRINCIPALE ---
Présentation de 3 à 4 parcours inspirants d'entrepreneurs locaux et de la diaspora.

--- WORKSHOP (en parallèle) ---
Workshop 1 : Build Your Startup from Scratch
Pour étudiants et jeunes entrepreneurs en phase d’idéation.
      ` 
    },
    { 
      id: 3, 
      type: 'Panel Stratégique / Workshop', 
      time: '12h00 – 12h45', 
      speaker: 'Sessions en parallèle', 
      description: `
--- PANEL ---
Tunisie 2035 : Où miser pour faire la différence ? Identification des secteurs prioritaires.

--- WORKSHOP (en parallèle) ---
Workshop 2 : Étudiant & Startups – Développez les compétences pour réussir demain.
      ` 
    },
    { id: 4, type: 'Pause Café & Networking', time: '12h45 – 13h15', speaker: 'Échanges & Connexions', description: 'Un moment pour connecter avec les participants, speakers et animateurs.' },
    { 
      id: 5, 
      type: 'Panel Opérationnel / Workshop', 
      time: '13h15 – 14h00', 
      speaker: 'Sessions en parallèle', 
      description: `
--- PANEL ---
Accès aux marchés publics & internationaux : état acheteur innovant et rôle de la diaspora.

--- WORKSHOP (en parallèle) ---
Workshop 3 : AI ERA : Nouvelle Cartographie des Métiers.
      ` 
    },
    { 
      id: 6, 
      type: 'Panel Opérationnel / Workshop', 
      time: '14h00 – 14h45', 
      speaker: 'Sessions en parallèle', 
      description: `
--- PANEL ---
Financement et Investissement : Gaps structurels et introduction des SAFE Notes.

--- WORKSHOP (en parallèle) ---
Workshop 4 : Freelance & Opportunités : Trouvez vos premiers clients.
      ` 
    },
    
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
                    <p className="timeline-description" style={{ whiteSpace: 'pre-wrap' }}>{activity.description}</p>
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