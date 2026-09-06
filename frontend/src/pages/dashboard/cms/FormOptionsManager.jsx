import React, { useState, useEffect, useCallback } from 'react';
import axiosClient from '../../../api/axiosClient';
import { clearCached } from '../../../api/contentCache';
import StringListEditor from './StringListEditor';
import './cms.css';

const EMPTY_OPTIONS = { regions: [], statuts: [], expertises: [], experiences: [], orgTypes: [] };

const FIELDS = [
  { key: 'regions', label: 'Régions' },
  { key: 'statuts', label: 'Statuts (participant)' },
  { key: 'expertises', label: "Domaines d'expertise" },
  { key: 'experiences', label: "Niveaux d'expérience" },
  { key: 'orgTypes', label: "Types d'organisation (exposant)" },
];

const FormOptionsManager = () => {
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const fetchOptions = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get('/content/form-options');
      setOptions({ ...EMPTY_OPTIONS, ...data.data });
    } catch (err) {
      setStatus({ type: 'error', message: 'Impossible de charger les options.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchOptions(); }, [fetchOptions]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await axiosClient.put('/content/form-options', options);
      clearCached('/content/form-options');
      setStatus({ type: 'success', message: 'Options enregistrées.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || "Échec de l'enregistrement." });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !options) return <p className="loading">Chargement...</p>;

  return (
    <div className="cms-section">
      {status && <p className={status.type === 'success' ? 'cms-alert-success' : 'cms-alert-error'}>{status.message}</p>}
      <p style={{ color: 'var(--text-secondary)', marginTop: 0 }}>
        Ces listes alimentent les menus déroulants des formulaires d'inscription Participant et Exposant.
      </p>
      <form className="cms-card" onSubmit={handleSave}>
        {FIELDS.map(({ key, label }) => (
          <StringListEditor
            key={key}
            label={label}
            values={options[key]}
            onChange={(values) => setOptions({ ...options, [key]: values })}
          />
        ))}
        <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</button>
      </form>
    </div>
  );
};

export default FormOptionsManager;
