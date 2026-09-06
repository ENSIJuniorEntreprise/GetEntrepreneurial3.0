import React from 'react';
import './cms.css';

// values: { label, href, isDownload? }[]; onChange(newValues)
const LinkListEditor = ({ label, values, onChange, showDownloadToggle }) => {
  const update = (index, field, value) => {
    const next = [...values];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };
  const add = () => onChange([...values, { label: '', href: '', isDownload: false }]);
  const remove = (index) => onChange(values.filter((_, i) => i !== index));

  return (
    <div className="cms-form-row">
      {label && <label>{label}</label>}
      {values.map((item, index) => (
        <div key={index} className="cms-form-grid" style={{ marginBottom: '0.5rem', alignItems: 'end' }}>
          <input
            className="cms-input"
            placeholder="Libellé"
            value={item.label}
            onChange={(e) => update(index, 'label', e.target.value)}
          />
          <input
            className="cms-input"
            placeholder="Lien (/page ou https://...)"
            value={item.href}
            onChange={(e) => update(index, 'href', e.target.value)}
          />
          {showDownloadToggle && (
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 400 }}>
              <input
                type="checkbox"
                checked={!!item.isDownload}
                onChange={(e) => update(index, 'isDownload', e.target.checked)}
              />
              Téléchargement
            </label>
          )}
          <button type="button" className="cms-btn cms-btn-danger" onClick={() => remove(index)}>Retirer</button>
        </div>
      ))}
      <button type="button" className="cms-btn" onClick={add}>+ Ajouter un lien</button>
    </div>
  );
};

export default LinkListEditor;
