import React from 'react';
import './B2BDealDayTab.css';

const B2BDealDayTab = ({ data }) => {
  // Fonction pour mettre en surbrillance un texte spécifique dans un titre
  const renderTitle = (title) => {
    // Le mot à surligner est maintenant "Conférence"
    const textToHighlight = 'Conférence'; 
    const parts = title.split(new RegExp(`(${textToHighlight})`, 'gi'));

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === textToHighlight.toLowerCase() ? (
            <span key={index} className="highlight-orange">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="b2b-tab-container">
      <header className="b2b-tab-header">
        <h2>Programme des Panels</h2>
        <p>Explorez les discussions stratégiques qui façonneront l'avenir de l'écosystème entrepreneurial.</p>
      </header>

      <div className="b2b-panels-grid">
        {data.panels.map((panel) => (
          <div key={panel.id} className="b2b-panel-card">
            
            <h3 className="b2b-panel-title">
              {/* Logique pour afficher "Conférence" sans numéro, et "Panel X" pour les autres */}
              {panel.id === 1 ? (
                renderTitle(panel.title)
              ) : (
                <>
                  <span className="panel-number">Panel {panel.id - 1} :</span>
                  {renderTitle(panel.title)}
                </>
              )}
            </h3>
            
            <ul className="b2b-panel-items-list">
              {panel.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>

            {/* Section pour afficher les intervenants (modérateurs et panélistes) */}
            {panel.speakers && panel.speakers.length > 0 && (
              <div className="b2b-panel-speakers">
                <h4 className="speakers-section-title">Intervenants</h4>
                <div className="speakers-list">
                  {panel.speakers.map((speaker, speakerIndex) => (
                    <div key={speakerIndex} className="speaker-item">
                      <img src={speaker.image} alt={speaker.name} className="speaker-image" />
                      <div className="speaker-info">
                        <p className="speaker-name">{speaker.name}</p>
                        <p className="speaker-role">{speaker.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default B2BDealDayTab;