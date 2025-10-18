import React from 'react';
import './GreenTechDayTab.css'; // Le CSS devra être mis à jour pour les nouvelles classes

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
                {/* --- Le titre et sous-titre sont communs --- */}
                <span className="workshop-number">{workshop.title}</span>
                <h3 className="workshop-subtitle">{workshop.subtitle}</h3>
              </div>

              {/* --- MODIFICATION : Affichage conditionnel --- */}
              
              {/* CAS 1 : Si le workshop a des 'details' (cible, thèmes, etc.) */}
              {workshop.details && (
                <div className="workshop-details-content">
                  <div className="details-meta">
                    <div className="detail-item">
                      <strong>Public Cible :</strong> {workshop.details.target}
                    </div>
                    {/* Vous pouvez ajouter la durée si elle existe */}
                  </div>
                  
                  <ul className="topics-list">
                    {workshop.details.topics.map((topic, index) => (
                      <li key={index} className="topic-item">{topic}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CAS 2 : Si le workshop a des 'speakers' (animateurs) */}
              {workshop.speakers && (
                <div className="workshop-speakers-content">
                  <h4 className="speakers-title">Animé par :</h4>
                  <div className="speakers-grid-container">
                    {workshop.speakers.map((speaker, index) => (
                      <div key={index} className="speaker-profile">
                        <img src={speaker.image} alt={speaker.name} className="speaker-image" />
                        <div className="speaker-info">
                          <span className="speaker-name">{speaker.name}</span>
                          <span className="speaker-role">{speaker.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreenTechDayTab;