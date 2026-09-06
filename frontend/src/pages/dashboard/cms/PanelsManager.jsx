import React, { useState, useEffect, useCallback } from 'react';
import axiosClient from '../../../api/axiosClient';
import { clearCached } from '../../../api/contentCache';
import ConfirmDialog from './ConfirmDialog';
import ImageUploader from './ImageUploader';
import './cms.css';

const emptyPanel = (section, order) => ({
  section,
  order,
  title: '',
  subtitle: '',
  items: [''],
  speakers: [],
});

const PanelsManager = () => {
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [formPanel, setFormPanel] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchPanels = useCallback(async () => {
    setLoading(true);
    try {
      const [settingsRes, panelsRes] = await Promise.all([
        axiosClient.get('/content/settings'),
        axiosClient.get('/content/panels'),
      ]);
      const fetchedDays = settingsRes.data.data.days || [];
      setSections(fetchedDays);
      setActiveSection((current) => current && fetchedDays.some((d) => d.key === current) ? current : (fetchedDays[0]?.key || ''));
      setPanels(panelsRes.data.data);
    } catch (err) {
      setStatus({ type: 'error', message: 'Impossible de charger les panels.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPanels(); }, [fetchPanels]);

  const list = panels.filter((p) => p.section === activeSection);

  const openNewForm = () => setFormPanel(emptyPanel(activeSection, list.length));
  const openEditForm = (panel) => setFormPanel({ ...panel, items: panel.items.length ? panel.items : [''] });

  const updateItem = (index, value) => {
    setFormPanel((p) => {
      const items = [...p.items];
      items[index] = value;
      return { ...p, items };
    });
  };
  const addItem = () => setFormPanel((p) => ({ ...p, items: [...p.items, ''] }));
  const removeItem = (index) => setFormPanel((p) => ({ ...p, items: p.items.filter((_, i) => i !== index) }));

  const updateSpeaker = (index, field, value) => {
    setFormPanel((p) => {
      const speakers = [...p.speakers];
      speakers[index] = { ...speakers[index], [field]: value };
      return { ...p, speakers };
    });
  };
  const addSpeaker = () => setFormPanel((p) => ({ ...p, speakers: [...p.speakers, { name: '', role: '', photoUrl: '', photoPublicId: '' }] }));
  const removeSpeaker = (index) => setFormPanel((p) => ({ ...p, speakers: p.speakers.filter((_, i) => i !== index) }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    const payload = { ...formPanel, items: formPanel.items.filter((i) => i.trim() !== '') };
    try {
      if (formPanel._id) {
        await axiosClient.put(`/content/panels/${formPanel._id}`, payload);
      } else {
        await axiosClient.post('/content/panels', payload);
      }
      clearCached('/content/panels');
      setFormPanel(null);
      await fetchPanels();
      setStatus({ type: 'success', message: 'Panel enregistré.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || "Échec de l'enregistrement." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/content/panels/${deleteTarget._id}`);
      clearCached('/content/panels');
      setDeleteTarget(null);
      await fetchPanels();
    } catch (err) {
      setStatus({ type: 'error', message: 'Échec de la suppression.' });
      setDeleteTarget(null);
    }
  };

  if (!loading && sections.length === 0) {
    return (
      <div className="cms-section">
        <p>Aucune journée n'est encore définie. Ajoutez-en dans <strong>Réglages événement</strong> avant de créer des panels.</p>
      </div>
    );
  }

  return (
    <div className="cms-section">
      {status && <p className={status.type === 'success' ? 'cms-alert-success' : 'cms-alert-error'}>{status.message}</p>}

      <div className="cms-tabs">
        {sections.map((s) => (
          <button key={s.key} type="button" className={`cms-tab ${activeSection === s.key ? 'active' : ''}`} onClick={() => setActiveSection(s.key)}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="cms-toolbar">
        <h3 style={{ margin: 0 }}>{sections.find((s) => s.key === activeSection)?.label}</h3>
        <button type="button" className="cms-btn cms-btn-primary" onClick={openNewForm}>+ Ajouter</button>
      </div>

      {loading ? (
        <p className="loading">Chargement...</p>
      ) : (
        <div className="cms-list">
          {list.length === 0 && <p>Aucun panel pour cette section.</p>}
          {list.map((panel) => (
            <div className="cms-list-item" key={panel._id}>
              <div className="cms-list-item-info">
                <h4>{panel.title}</h4>
                <p>{panel.speakers.length} intervenant(s) · {panel.items.length} point(s)</p>
              </div>
              <div className="cms-list-item-actions">
                <button type="button" className="cms-btn" onClick={() => openEditForm(panel)}>Modifier</button>
                <button type="button" className="cms-btn cms-btn-danger" onClick={() => setDeleteTarget(panel)}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formPanel && (
        <form className="cms-card" onSubmit={handleSave}>
          <h4>{formPanel._id ? 'Modifier le panel' : 'Nouveau panel'}</h4>
          <div className="cms-form-row">
            <label>Titre</label>
            <input className="cms-input" value={formPanel.title} onChange={(e) => setFormPanel({ ...formPanel, title: e.target.value })} required />
          </div>
          <div className="cms-form-row">
            <label>Sous-titre</label>
            <input className="cms-input" value={formPanel.subtitle} onChange={(e) => setFormPanel({ ...formPanel, subtitle: e.target.value })} />
          </div>
          <div className="cms-form-row">
            <label>Ordre</label>
            <input type="number" className="cms-input" value={formPanel.order} onChange={(e) => setFormPanel({ ...formPanel, order: Number(e.target.value) })} />
          </div>

          <div className="cms-form-row">
            <label>Points clés</label>
            {formPanel.items.map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input className="cms-input" value={item} onChange={(e) => updateItem(index, e.target.value)} />
                <button type="button" className="cms-btn cms-btn-danger" onClick={() => removeItem(index)}>×</button>
              </div>
            ))}
            <button type="button" className="cms-btn" onClick={addItem}>+ Ajouter un point</button>
          </div>

          <div className="cms-form-row">
            <label>Intervenants</label>
            {formPanel.speakers.map((speaker, index) => (
              <div className="cms-speaker-row" key={index}>
                <div className="cms-form-row">
                  <label>Nom</label>
                  <input className="cms-input" value={speaker.name} onChange={(e) => updateSpeaker(index, 'name', e.target.value)} required />
                </div>
                <div className="cms-form-row">
                  <label>Rôle</label>
                  <input className="cms-input" value={speaker.role} onChange={(e) => updateSpeaker(index, 'role', e.target.value)} />
                </div>
                <div className="cms-form-row">
                  <label>Photo</label>
                  <ImageUploader
                    folder="speakers"
                    value={{ url: speaker.photoUrl }}
                    onChange={({ url, publicId }) => {
                      updateSpeaker(index, 'photoUrl', url);
                      updateSpeaker(index, 'photoPublicId', publicId);
                    }}
                  />
                </div>
                <button type="button" className="cms-btn cms-btn-danger" onClick={() => removeSpeaker(index)}>Retirer</button>
              </div>
            ))}
            <button type="button" className="cms-btn" onClick={addSpeaker}>+ Ajouter un intervenant</button>
          </div>

          <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</button>{' '}
          <button type="button" className="cms-btn" onClick={() => setFormPanel(null)}>Annuler</button>
        </form>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Supprimer ce panel ?"
          message={`"${deleteTarget.title}" sera définitivement supprimé.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default PanelsManager;
