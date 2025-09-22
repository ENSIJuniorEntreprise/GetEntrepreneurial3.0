import React from 'react';
import './GrandPublicTab.css'; // Le CSS a été ajusté en conséquence

const GrandPublicTab = ({ data }) => {
  return (
    <div className="gp-tab-container">
      {/* 1. Titre principal */}
      <header className="gp-tab-header">
        <h2>{data.title}</h2>
      </header>

      {/* 2. Paragraphe de description */}
      {data.description && (
        <section className="description-section">
          <p>{data.description}</p>
        </section>
      )}

      {/* 3. Section des grands axes */}
      {data.axes && (
        <section className="strategic-axes-section">
          <h3 className="axes-title">{data.axes.title}</h3>
          <div className="axes-grid">
            {data.axes.points.map((axis, index) => (
              <div 
                key={index}
                // --- MODIFICATION ICI ---
                // La logique d'alternance a été retirée.
                // Tous les blocs ont maintenant le même style de base.
                className="axis-card"
              >
                <p dangerouslySetInnerHTML={{ __html: axis }} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default GrandPublicTab;