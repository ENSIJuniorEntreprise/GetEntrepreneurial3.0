import React from 'react';
import './B2BDealDayTab.css';

const B2BDealDayTab = ({ data }) => {
  // --- DÉBUT DE LA MODIFICATION ---
  // Fonction pour mettre en surbrillance un texte spécifique dans un titre
  const renderTitle = (title) => {
    const textToHighlight = 'Conférence Plénière';
    // On divise le titre en parties, en gardant le texte à surligner
    const parts = title.split(new RegExp(`(${textToHighlight})`, 'gi'));

    return (
      <>
        {parts.map((part, index) =>
          // Si la partie correspond au texte (insensible à la casse), on lui donne la classe CSS
          part.toLowerCase() === textToHighlight.toLowerCase() ? (
            <span key={index} className="highlight-orange">
              {part}
            </span>
          ) : (
            // Sinon, on affiche le texte normalement
            part
          )
        )}
      </>
    );
  };
  // --- FIN DE LA MODIFICATION ---

  return (
    <div className="b2b-tab-container">
      <header className="b2b-tab-header">
        <h2>Programme des Panels</h2>
        <p>Explorez les discussions stratégiques qui façonneront l'avenir de l'écosystème entrepreneurial.</p>
      </header>

      <div className="b2b-panels-grid">
        {data.panels.map((panel, index) => (
          <div key={panel.id} className="b2b-panel-card">
            
            <h3 className="b2b-panel-title">
              {index === 0
                // On utilise la fonction renderTitle pour le premier élément
                ? renderTitle(panel.title)
                // Et aussi pour tous les autres
                : (
                  <>
                    <span className="panel-number">Panel {index} :</span>
                    {renderTitle(panel.title)}
                  </>
                )
              }
            </h3>
            
            <ul className="b2b-panel-items-list">
              {panel.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>

          </div>
        ))}
      </div>
    </div>
  );
};

export default B2BDealDayTab;