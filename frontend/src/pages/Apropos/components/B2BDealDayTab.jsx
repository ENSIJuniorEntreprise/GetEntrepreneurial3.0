import React from 'react';
import './B2BDealDayTab.css';

const B2BDealDayTab = ({ data }) => {
  return (
    <div className="tab-pane b2b-tab">
      <div className="section-intro">
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </div>

      <div className="stats-container">
        <div className="stat-box">
          <span className="stat-icon">⚖️</span>
          <p className="stat-value">{data.stats[0].value}</p>
          <p className="stat-label">{data.stats[0].label}</p>
        </div>
        <div className="stat-box">
          <span className="stat-icon">📈</span>
          <p className="stat-value">{data.stats[1].value}</p>
          <p className="stat-label">{data.stats[1].label}</p>
        </div>
      </div>

      <p className="project-info">{data.projectInfo}</p>
      
      <div className="key-points-grid">
        {data.keyPoints.map((point, index) => (
          <div key={index} className={`key-point ${index === 1 || index === 2 ? 'highlighted' : ''}`}>
            {point}
          </div>
        ))}
      </div>

      <p className="conclusion">{data.conclusion}</p>
    </div>
  );
};

export default B2BDealDayTab;