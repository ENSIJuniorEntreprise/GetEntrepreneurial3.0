import React from 'react';
import './B2BDealDayTab.css'; // CSS modifié

const B2BDealDayTab = ({ data }) => {
  return (
    <div className="b2b-tab-container">
      <header className="tab-header">
        <h2>{data.title}</h2>
        <p className="tab-description">{data.description}</p>
      </header>

      <div className="stats-grid">
        {data.stats.map(stat => (
          <div key={stat.label} className="stat-card">
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="info-section">
        <p>{data.projectInfo}</p>
      </div>

      <div className="key-points-grid">
        {data.keyPoints.map((point, index) => (
          <div key={index} className="key-point-card">
            <span className="key-point-icon">✓</span>
            <p>{point}</p>
          </div>
        ))}
      </div>

      <div className="conclusion-section">
        <p>{data.conclusion}</p>
      </div>
    </div>
  );
};

export default B2BDealDayTab;