import React from 'react';
import './GreenTechDayTab.css'; // CSS modifié

const GreenTechDayTab = ({ data }) => {
  return (
    <div className="gt-tab-container">
       <header className="tab-header dark-theme">
        <h2>GREEN & Tech Day</h2>
        <p className="tab-description">Une journée dédiée à l'intersection de la technologie durable et de l'innovation entrepreneuriale.</p>
      </header>
      
      <div className="workshops-list">
        {data.workshops.map((workshop, index) => (
          <div key={workshop.id} className="workshop-card">
            <div className="workshop-details">
              <span className="workshop-number">Workshop {index + 1}</span>
              <h3 className="workshop-title">{workshop.subtitle}</h3>
              <div className="workshop-speaker">
                <p className="speaker-name">{workshop.speaker.name}</p>
                <p className="speaker-role">{workshop.speaker.role}</p>
              </div>
            </div>
            <div className="workshop-image">
              <img src={`/src/assets/images${workshop.speaker.image}`} alt={workshop.speaker.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreenTechDayTab;