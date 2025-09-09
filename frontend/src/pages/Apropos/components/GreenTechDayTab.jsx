import React from 'react';
import './GreenTechDayTab.css'; // Le CSS sera aussi mis à jour

const GreenTechDayTab = ({ data }) => {
  return (
    <div className="gt-tab-container">
      <header className="gt-tab-header">
        <h2>Workshops</h2>
        <p>Des sessions pratiques et interactives animées par des experts de l'écosystème.</p>
      </header>
      
      <div className="workshops-list">
        {data.workshops.map((workshop) => (
          <div key={workshop.id} className="workshop-card">
            
            <div className="workshop-info">
              <div className="workshop-titles">
                <span className="workshop-number">{workshop.title}</span>
                <h3 className="workshop-subtitle">{workshop.subtitle}</h3>
              </div>

              {/* --- NOUVELLE SECTION POUR LES DÉTAILS --- */}
              <div className="workshop-details-content">
                <div className="details-meta">
                  <div className="detail-item">
                    <strong>Public Cible :</strong> {workshop.details.target}
                  </div>
                  <div className="detail-item">
                    
                  </div>
                </div>
                
                <ul className="topics-list">
                  {workshop.details.topics.map((topic, index) => (
                    <li key={index} className="topic-item">{topic}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreenTechDayTab;
