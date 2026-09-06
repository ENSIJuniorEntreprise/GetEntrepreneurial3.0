import React from 'react';
import './cms.css';

const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => (
  <div className="cms-modal-overlay" onClick={onCancel}>
    <div className="cms-modal" onClick={(e) => e.stopPropagation()}>
      <h3>{title}</h3>
      <p>{message}</p>
      <div className="cms-modal-actions">
        <button type="button" className="cms-btn" onClick={onCancel}>Annuler</button>
        <button type="button" className="cms-btn cms-btn-danger" onClick={onConfirm}>Confirmer</button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;
