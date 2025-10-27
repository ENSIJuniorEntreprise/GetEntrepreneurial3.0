import React, { useState } from 'react';
import './agenda.css';

const agendaData = {
  friday: [
    {
      id: 1,
      type: 'Accueil des participants',
      time: '09H00',
      speaker: '',
      description: ''
    },
    {
      id: 2,
      type: "Ouverture de l'événement",
      time: '09H30',
      speaker: '',
      description: ''
    },
    {
      id: 3,
      type: 'Conférence Plénière – Innovation Act : ambition à concrétiser',
      time: '10H00',
      speaker: '',
      description: ''
    },
    {
      id: 4,
      type: 'Keynotes',
      time: '11H00',
      speaker: '',
      description: '<ul><li>Ooredoo</li><li>Gomycode</li></ul>'
    },
    {
        id: 5,
        type: 'Worshop Ooredoo : How to land an internship that open doors',
        time: '11H15',
        speaker: '',
        description: ''
    },
    {
      id: 6,
      type: 'Panel – Tunisie 2035 : Où miser pour faire la différence ?',
      time: '12H00',
      speaker: '',
      description: ''
    },
    {
      id: 7,
      type: 'Pause Café',
      time: '12H45',
      speaker: '',
      description: ''
    },
    {
      id: 8,
      type: 'Panel – Accès aux Marchés Publics & Internationaux',
      time: '13H15',
      speaker: '',
      description: ''
    },
    {
      id: 9,
      type: 'Panel – Financement et investissement',
      time: '14H00',
      speaker: '',
      description: ''
    },
    {
      id: 10,
      type: 'Clôture',
      time: '15H00',
      speaker: '',
      description: ''
    }
  ],
  // --- MODIFICATION ICI ---
  tuesday: [
    {
      id: 1,
      type: 'Coffee time',
      time: '09H30',
      speaker: '',
      description: ''
    },
    {
      id: 2,
      type: 'Présentation des candidats & Workshop',
      time: '10H00 - 11H00',
      speaker: '',
      description: '<ul><li>Session de pitch </li><li>Workshop en parallèle</li></ul>'
    },
    {
      id: 3,
      type: 'Pause Café',
      time: '11H00',
      speaker: '',
      description: ''
    },
    {
      id: 4,
      type: 'Présentation des candidats & Workshop',
      time: '11H30 - 12H30',
      speaker: '',
      description: '<ul><li>Session de pitch </li><li>Workshop en parallèle</li></ul>'
    }
  ],
  wednesday: []
};


const Agenda = () => {
  const [activeTab, setActiveTab] = useState('friday');

  const getActiveDayName = () => {
    if (activeTab === 'tuesday') return 'GREEN & TECH DAY';
    if (activeTab === 'wednesday') return 'B2B Deal Day';
    return '';
  };

  return (
    <div className="agenda-container">
      <div className="agenda-header">
        <h1>GET ENTREPRENEURIAL 3.0 <br /><span>Agenda</span></h1>
        <nav className="agenda-nav">
          <button onClick={() => setActiveTab('friday')} className={activeTab === 'friday' ? 'active' : ''}>
            BIG DAY
          </button>
          <button onClick={() => setActiveTab('tuesday')} className={activeTab === 'tuesday' ? 'active' : ''}>
            GREEN & TECH DAY
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
                    {activity.speaker && <p className="timeline-speaker" dangerouslySetInnerHTML={{ __html: activity.speaker }} />}
                    {activity.description && <div className="timeline-description" dangerouslySetInnerHTML={{ __html: activity.description }} />}
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