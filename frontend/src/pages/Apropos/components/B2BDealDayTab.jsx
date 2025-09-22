import React from 'react';
import './B2BDealDayTab.css';

const B2BDealDayTab = ({ data }) => {
  return (
    <div className="b2b-tab-container">
      <header className="b2b-tab-header">
        <h2>Programme des Panels</h2>
        <p>Explorez les discussions stratégiques qui façonneront l'avenir de l'écosystème entrepreneurial.</p>
      </header>

      <div className="b2b-panels-grid">
        {data.panels.map((panel, index) => (
          <div key={panel.id} className="b2b-panel-card">
            
            {/* --- MODIFICATION CI-DESSOUS --- */}
            <h3 className="b2b-panel-title">
              {index === 0
                // Si c'est le premier élément (index 0), on affiche seulement le titre
                ? panel.title
                // Pour tous les autres, on ajoute le préfixe "Panel X :"
                // Le numéro du panel est l'index, car on commence à compter à partir de Panel 1 pour le 2ème élément.
                : (
                  <>
                    <span className="panel-number">Panel {index} :</span>
                    {panel.title}
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