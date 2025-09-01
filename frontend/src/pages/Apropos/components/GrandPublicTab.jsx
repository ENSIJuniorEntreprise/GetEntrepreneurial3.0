import React from 'react';
import './GrandPublicTab.css'; // Nouveau CSS

const Speaker = ({ image, name }) => (
  <div className="speaker">
    <img src={`/src/assets/images${image}`} alt={name} className="speaker-img"/>
    <p className="speaker-name">{name}</p>
  </div>
);

const GrandPublicTab = ({ data }) => {
  return (
    <div className="gp-tab-container">
      <header className="tab-header">
        <h2>{data.title}</h2>
        <p className="tab-description">{data.description}</p>
      </header>

      <div className="panels-grid">
        {data.panels.map(panel => (
          <div key={panel.id} className="panel-card">
            <h3 className="panel-title">{panel.title}</h3>
            <p className="panel-card-description">{panel.description}</p>
            <div className="panel-speakers-list">
              {panel.speakers.map(speaker => (
                <Speaker key={speaker.name} {...speaker} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="webinaire-banner">
          <h3>{data.webinaire.title}</h3>
          <p>{data.webinaire.description}</p>
      </div>
    </div>
  );
};

export default GrandPublicTab;