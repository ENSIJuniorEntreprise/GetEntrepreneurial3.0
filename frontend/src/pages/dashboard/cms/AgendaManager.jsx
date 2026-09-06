import React, { useState, useEffect, useCallback } from 'react';
import axiosClient from '../../../api/axiosClient';
import { clearCached } from '../../../api/contentCache';
import ConfirmDialog from './ConfirmDialog';
import './cms.css';

const EMPTY_ITEM = { day: '', order: 0, time: '', title: '', speakerHtml: '', descriptionHtml: '' };

const AgendaManager = () => {
  const [days, setDays] = useState([]);
  const [activeDay, setActiveDay] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [formItem, setFormItem] = useState(null); // null = closed, object = editing/new
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [settingsRes, agendaRes] = await Promise.all([
        axiosClient.get('/content/settings'),
        axiosClient.get('/content/agenda'),
      ]);
      const fetchedDays = settingsRes.data.data.days || [];
      setDays(fetchedDays);
      setItems(agendaRes.data.data);
      setActiveDay((current) => current && fetchedDays.some((d) => d.key === current) ? current : (fetchedDays[0]?.key || ''));
    } catch (err) {
      setStatus({ type: 'error', message: 'Impossible de charger le programme.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const itemsForActiveDay = items.filter((i) => i.day === activeDay);

  const openNewForm = () => setFormItem({ ...EMPTY_ITEM, day: activeDay, order: itemsForActiveDay.length });
  const openEditForm = (item) => setFormItem({ ...item });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      if (formItem._id) {
        await axiosClient.put(`/content/agenda/${formItem._id}`, formItem);
      } else {
        await axiosClient.post('/content/agenda', formItem);
      }
      clearCached('/content/agenda');
      setFormItem(null);
      await fetchAll();
      setStatus({ type: 'success', message: 'Programme mis à jour.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || "Échec de l'enregistrement." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/content/agenda/${deleteTarget._id}`);
      clearCached('/content/agenda');
      setDeleteTarget(null);
      await fetchAll();
    } catch (err) {
      setStatus({ type: 'error', message: 'Échec de la suppression.' });
      setDeleteTarget(null);
    }
  };

  if (!loading && days.length === 0) {
    return (
      <div className="cms-section">
        <p>Aucune journée n'est encore définie. Ajoutez-en dans <strong>Réglages événement</strong> avant de créer le programme.</p>
      </div>
    );
  }

  return (
    <div className="cms-section">
      {status && <p className={status.type === 'success' ? 'cms-alert-success' : 'cms-alert-error'}>{status.message}</p>}

      <div className="cms-tabs">
        {days.map((d) => (
          <button key={d.key} type="button" className={`cms-tab ${activeDay === d.key ? 'active' : ''}`} onClick={() => setActiveDay(d.key)}>
            {d.label}
          </button>
        ))}
      </div>

      <div className="cms-toolbar">
        <h3 style={{ margin: 0 }}>{days.find((d) => d.key === activeDay)?.label}</h3>
        <button type="button" className="cms-btn cms-btn-primary" onClick={openNewForm}>+ Ajouter un élément</button>
      </div>

      {loading ? (
        <p className="loading">Chargement...</p>
      ) : (
        <div className="cms-list">
          {itemsForActiveDay.length === 0 && <p>Aucun élément pour cette journée.</p>}
          {itemsForActiveDay.map((item) => (
            <div className="cms-list-item" key={item._id}>
              <div className="cms-list-item-info">
                <h4>{item.time} — {item.title}</h4>
                {item.speakerHtml && <p dangerouslySetInnerHTML={{ __html: item.speakerHtml }} />}
              </div>
              <div className="cms-list-item-actions">
                <button type="button" className="cms-btn" onClick={() => openEditForm(item)}>Modifier</button>
                <button type="button" className="cms-btn cms-btn-danger" onClick={() => setDeleteTarget(item)}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formItem && (
        <form className="cms-card" onSubmit={handleSave}>
          <h4>{formItem._id ? "Modifier l'élément" : 'Nouvel élément'}</h4>
          <div className="cms-form-grid">
            <div className="cms-form-row">
              <label>Journée</label>
              <select className="cms-select" value={formItem.day} onChange={(e) => setFormItem({ ...formItem, day: e.target.value })}>
                {days.map((d) => <option key={d.key} value={d.key}>{d.label}</option>)}
              </select>
            </div>
            <div className="cms-form-row">
              <label>Ordre</label>
              <input type="number" className="cms-input" value={formItem.order} onChange={(e) => setFormItem({ ...formItem, order: Number(e.target.value) })} />
            </div>
            <div className="cms-form-row">
              <label>Heure</label>
              <input className="cms-input" value={formItem.time} onChange={(e) => setFormItem({ ...formItem, time: e.target.value })} required />
            </div>
          </div>
          <div className="cms-form-row">
            <label>Titre</label>
            <input className="cms-input" value={formItem.title} onChange={(e) => setFormItem({ ...formItem, title: e.target.value })} required />
          </div>
          <div className="cms-form-row">
            <label>Intervenant(s) (HTML simple autorisé)</label>
            <textarea className="cms-textarea" value={formItem.speakerHtml} onChange={(e) => setFormItem({ ...formItem, speakerHtml: e.target.value })} />
          </div>
          <div className="cms-form-row">
            <label>Description (HTML simple autorisé)</label>
            <textarea className="cms-textarea" value={formItem.descriptionHtml} onChange={(e) => setFormItem({ ...formItem, descriptionHtml: e.target.value })} />
          </div>
          <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</button>{' '}
          <button type="button" className="cms-btn" onClick={() => setFormItem(null)}>Annuler</button>
        </form>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Supprimer cet élément ?"
          message={`"${deleteTarget.title}" sera définitivement supprimé du programme public.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AgendaManager;
