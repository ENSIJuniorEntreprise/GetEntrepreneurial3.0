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
              <span className="panel-number">Panel {index + 1} :</span> {panel.title}
            </h3>
            
            <ul className="b2b-panel-items-list">
              {panel.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </div>
        ))}
      </div>
    </div>
  );
};

export default B2BDealDayTab;