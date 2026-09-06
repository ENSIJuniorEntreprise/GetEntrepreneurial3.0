import React from 'react';
import './cms.css';

// values: string[]; onChange(newValues: string[])
const StringListEditor = ({ label, values, onChange, placeholder }) => {
  const update = (index, value) => {
    const next = [...values];
    next[index] = value;
    onChange(next);
  };
  const add = () => onChange([...values, '']);
  const remove = (index) => onChange(values.filter((_, i) => i !== index));

  return (
    <div className="cms-form-row">
      {label && <label>{label}</label>}
      {values.map((value, index) => (
        <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            className="cms-input"
            value={value}
            placeholder={placeholder}
            onChange={(e) => update(index, e.target.value)}
          />
          <button type="button" className="cms-btn cms-btn-danger" onClick={() => remove(index)}>×</button>
        </div>
      ))}
      <button type="button" className="cms-btn" onClick={add}>+ Ajouter</button>
    </div>
  );
};

export default StringListEditor;
