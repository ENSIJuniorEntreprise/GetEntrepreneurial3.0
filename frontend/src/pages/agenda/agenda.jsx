// src/components/Agenda/Agenda.jsx
import React, { useState } from 'react';
import './agenda.css';

// ... (votre agendaData reste le même)
const agendaData = {
  friday: [
    { id: 1, type: 'WORKSHOP', time: '9:00 am-10:00 am', description: 'Description pour l\'activité 1 du vendredi.' },
    { id: 2, type: 'PANEL', time: '10:30 am-11:30 am', description: 'Description pour l\'activité 2 du vendredi.' },
    { id: 3, type: 'PAUSE CAFE', time: '12:00 pm-12:30 pm', description: 'Description pour l\'activité 3 du vendredi.' },
    { id: 4, type: 'KEYNOTE', time: '1:00 pm-2:00 pm', description: 'Description pour l\'activité 4 du vendredi.' },
    { id: 5, type: 'WORKSHOP', time: '2:00 pm-3:00 pm', description: 'Description pour l\'activité 5 du vendredi.' },
    { id: 6, type: 'PANEL', time: '4:00 pm-5:00 pm', description: 'Description pour l\'activité 6 du vendredi.' },
    { id: 7, type: 'NETWORKING', time: '5:00 pm-6:00 pm', description: 'Description pour l\'activité 7 du vendredi.' },
    { id: 8, type: 'COCKTAIL', time: '6:00 pm-7:00 pm', description: 'Description pour l\'activité 8 du vendredi.' },
  ],
  tuesday: [
    { id: 9, type: 'KEYNOTE', time: '9:00 am-10:00 am', description: 'Description pour l\'activité 1 du mardi.' },
    { id: 10, type: 'PANEL', time: '10:30 am-11:30 am', description: 'Description pour l\'activité 2 du mardi.' },
    { id: 11, type: 'PAUSE', time: '12:00 pm-12:30 pm', description: 'Description pour l\'activité 3 du mardi.' },
    { id: 12, type: 'WORKSHOP', time: '2:00 pm-3:00 pm', description: 'Description pour l\'activité 4 du mardi.' },
    { id: 13, type: 'WORKSHOP', time: '4:00 pm-5:00 pm', description: 'Description pour l\'activité 5 du mardi.' },
    { id: 14, type: 'DEMO', time: '5:00 pm-6:00 pm', description: 'Description pour l\'activité 6 du mardi.' },
    { id: 15, type: 'Q&A', time: '6:00 pm-6:30 pm', description: 'Description pour l\'activité 7 du mardi.' },
    { id: 16, type: 'DINNER', time: '7:00 pm-8:00 pm', description: 'Description pour l\'activité 8 du mardi.' },
  ],
  wednesday: [
    { id: 17, type: 'BREAKFAST', time: '9:00 am-10:00 am', description: 'Description pour l\'activité 1 du mercredi.' },
    { id: 18, type: 'PANEL', time: '10:30 am-11:30 am', description: 'Description pour l\'activité 2 du mercredi.' },
    { id: 19, type: 'PAUSE CAFE', time: '12:00 pm-12:30 pm', description: 'Description pour l\'activité 3 du mercredi.' },
    { id: 20, type: 'WORKSHOP', time: '2:00 pm-3:00 pm', description: 'Description pour l\'activité 4 du mercredi.' },
    { id: 21, type: 'PITCHS', time: '4:00 pm-5:00 pm', description: 'Description pour l\'activité 5 du mercredi.' },
    { id: 22, type: 'AWARDS', time: '5:00 pm-6:00 pm', description: 'Description pour l\'activité 6 du mercredi.' },
    { id: 23, type: 'CLOSING', time: '6:00 pm-6:30 pm', description: 'Description pour l\'activité 7 du mercredi.' },
    { id: 24, type: 'PARTY', time: '7:00 pm-onwards', description: 'Description pour l\'activité 8 du mercredi.' },
  ]
};

const Agenda = () => {
  const [activeTab, setActiveTab] = useState('friday');

  return (
    <div className="agenda-container">
      <div className="agenda-header">
        <h1>Get Entrepreneurial 3.0 <br /><span>Agenda</span></h1>
        <nav className="agenda-nav">
          <button onClick={() => setActiveTab('friday')} className={activeTab === 'friday' ? 'active' : ''}>
            Friday <br /> 22 October
          </button>
          <button onClick={() => setActiveTab('tuesday')} className={activeTab === 'tuesday' ? 'active' : ''}>
            Tuesday <br /> 23 October
          </button>
          <button onClick={() => setActiveTab('wednesday')} className={activeTab === 'wednesday' ? 'active' : ''}>
            Wednesday <br /> 24 October
          </button>
        </nav>
      </div>

      <div className="agenda-grid" key={activeTab}>
        {agendaData[activeTab].map((activity) => (
          <div className="activity-card" key={activity.id}>
            <div className="activity-header">
              <img src={`https://i.pravatar.cc/40?img=${activity.id}`} alt="Animateur" />
              <h3>Activité {activity.id} : <span>{activity.type}</span></h3>
            </div>
            <p className="activity-description">{activity.description}</p>
            <p className="activity-time">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agenda;