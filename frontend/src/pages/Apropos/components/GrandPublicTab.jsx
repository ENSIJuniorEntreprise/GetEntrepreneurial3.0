import React from 'react';
import './GrandPublicTab.css'; 

const GrandPublicTab = ({ data }) => {
  return (
    <div className="tab-pane">
      <div className="section-intro">
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </div>

      {data.panels.map(panel => (
        <div key={panel.id} className="panel-section">
          <h4>{panel.title}</h4>
          <p className="panel-description">{panel.description}</p>
          <div className="speakers-grid">
            {panel.speakers.map(speaker => (
              <div key={speaker.name} className="speaker-card">
                <img src={`/src/assets/images${speaker.image}`} alt={speaker.name} className="speaker-img"/>
                <p className="speaker-name">{speaker.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="webinaire-section">
          <h5>{data.webinaire.title}</h5>
          <p>{data.webinaire.description}</p>
      </div>

       <div className="key-points-grid">
            <div className="key-point">La libéralisation de l'initiative entrepreneuriale</div>
            <div className="key-point highlighted">L'innovation comme moteur de croissance économique</div>
            <div className="key-point highlighted">Le capital humain : un atout économique stratégique</div>
            <div className="key-point">L'amélioration de la compétitivité</div>
      </div>
    </div>
  );
};

export default GrandPublicTab;