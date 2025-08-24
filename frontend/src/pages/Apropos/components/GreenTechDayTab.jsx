import React from 'react';
import './GreenTechDayTab.css';

const GreenTechDayTab = ({ data }) => {
  return (
    <div className="tab-pane green-tech-tab">
      {data.workshops.map(workshop => (
        <div key={workshop.id} className="workshop-card">
          <div className="workshop-info">
            <span className="workshop-title">{workshop.title}</span>
            <p className="workshop-subtitle">{workshop.subtitle}</p>
            <div className="workshop-speaker-info">
              <p className="workshop-speaker-name">{workshop.speaker.name}</p>
              <p className="workshop-speaker-role">{workshop.speaker.role}</p>
            </div>
          </div>
          <div className="workshop-speaker-img-container">
            <img src={`/src/assets/images${workshop.speaker.image}`} alt={workshop.speaker.name} className="workshop-speaker-img" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GreenTechDayTab;