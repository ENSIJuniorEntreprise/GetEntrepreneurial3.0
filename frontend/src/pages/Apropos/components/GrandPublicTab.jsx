import React from 'react';
import './GrandPublicTab.css'; // Ce fichier CSS n'a pas besoin d'être modifié

const GrandPublicTab = ({ data }) => {
  return (
    <div className="gp-tab-container">
      {/* Titre principal */}
      <header className="gp-tab-header">
        <h2>{data.title}</h2>
      </header>

      {/* Section 1: La Problématique */}
      <section className="problem-section">
        <h3>{data.problem.title}</h3>
        <ul className="problem-list">
          {data.problem.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Section 2: Le Thème détaillé */}
      <section className="theme-details-section">
        <h3>{data.theme.title}</h3>
        <p>{data.theme.description}</p>
      </section>

      {/* Section 3: Les Statistiques */}
      <section className="stats-section">
        <div className="stats-grid">
          {data.stats.map(stat => (
            <div key={stat.value} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Les Axes Stratégiques (partie visuelle) */}
      <section className="strategic-axes-section">
        <div className="axes-grid">
          {data.strategicAxes.map((axis, index) => (
            <div 
              key={index} 
              // --- SEULE MODIFICATION CI-DESSOUS ---
              // L'ancienne logique était : index % 3 === 0 || index % 3 === 2
              // La nouvelle logique alterne correctement sur 4 éléments.
              className={`axis-card ${index % 4 === 0 || index % 4 === 3 ? 'dark' : 'light'}`}
            >
              <p dangerouslySetInnerHTML={{ __html: axis }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GrandPublicTab;