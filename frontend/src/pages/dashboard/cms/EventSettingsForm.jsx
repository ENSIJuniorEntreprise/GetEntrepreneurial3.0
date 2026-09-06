import React, { useState, useEffect, useCallback } from 'react';
import axiosClient from '../../../api/axiosClient';
import { clearCached } from '../../../api/contentCache';
import ImageUploader from './ImageUploader';
import './cms.css';

const toDateInputValue = (date) => (date ? new Date(date).toISOString().slice(0, 10) : '');

const buildDaysState = (days = []) =>
  days.map((d) => ({ key: d.key || '', label: d.label || '', date: toDateInputValue(d.date) }));

const slugify = (label) =>
  label
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const EventSettingsForm = () => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get('/content/settings');
      setForm({
        eventName: data.data.eventName || '',
        tagline: data.data.tagline || '',
        aboutText: data.data.aboutText || '',
        heroImageUrl: data.data.heroImageUrl || '',
        heroVideoUrl: data.data.heroVideoUrl || '',
        registrationDeadline: toDateInputValue(data.data.registrationDeadline),
        days: buildDaysState(data.data.days),
      });
    } catch (err) {
      setStatus({ type: 'error', message: 'Impossible de charger les réglages.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const updateField = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const updateDay = (index, field, value) => {
    setForm((f) => {
      const days = [...f.days];
      days[index] = { ...days[index], [field]: value };
      if (field === 'label' && !days[index].keyEdited) {
        days[index].key = slugify(value);
      }
      return { ...f, days };
    });
  };

  const setDayKeyEdited = (index) => {
    setForm((f) => {
      const days = [...f.days];
      days[index] = { ...days[index], keyEdited: true };
      return { ...f, days };
    });
  };

  const addDay = () => setForm((f) => ({ ...f, days: [...f.days, { key: '', label: '', date: '' }] }));
  const removeDay = (index) => setForm((f) => ({ ...f, days: f.days.filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const keys = form.days.map((d) => d.key.trim());
    if (keys.some((k) => !k)) {
      setStatus({ type: 'error', message: "Chaque journée doit avoir un identifiant (clé) non vide." });
      return;
    }
    if (new Set(keys).size !== keys.length) {
      setStatus({ type: 'error', message: 'Deux journées ne peuvent pas avoir le même identifiant.' });
      return;
    }

    setSaving(true);
    try {
      const payload = { ...form, days: form.days.map(({ keyEdited, ...d }) => d) };
      await axiosClient.put('/content/settings', payload);
      clearCached('/content/settings');
      setStatus({ type: 'success', message: 'Réglages enregistrés.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || "Échec de l'enregistrement." });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <p className="loading">Chargement...</p>;

  return (
    <div className="cms-section">
      {status && <p className={status.type === 'success' ? 'cms-alert-success' : 'cms-alert-error'}>{status.message}</p>}
      <form className="cms-card" onSubmit={handleSubmit}>
        <div className="cms-form-row">
          <label>Nom de l'événement</label>
          <input className="cms-input" value={form.eventName} onChange={(e) => updateField('eventName', e.target.value)} required />
        </div>
        <div className="cms-form-row">
          <label>Accroche</label>
          <input className="cms-input" value={form.tagline} onChange={(e) => updateField('tagline', e.target.value)} />
        </div>
        <div className="cms-form-row">
          <label>Texte "Qui sommes-nous"</label>
          <textarea className="cms-textarea" value={form.aboutText} onChange={(e) => updateField('aboutText', e.target.value)} />
        </div>
        <div className="cms-form-row">
          <label>Image de couverture</label>
          <ImageUploader
            folder="hero"
            value={{ url: form.heroImageUrl }}
            onChange={({ url }) => updateField('heroImageUrl', url)}
          />
        </div>
        <div className="cms-form-row">
          <label>URL vidéo de couverture</label>
          <input className="cms-input" value={form.heroVideoUrl} onChange={(e) => updateField('heroVideoUrl', e.target.value)} />
        </div>
        <div className="cms-form-row">
          <label>Date limite d'inscription</label>
          <input type="date" className="cms-input" value={form.registrationDeadline} onChange={(e) => updateField('registrationDeadline', e.target.value)} />
        </div>

        <h4>Journées de l'événement</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 0 }}>
          Ajoutez, renommez ou supprimez les journées de l'édition (Big Day, Green &amp; Tech Day, etc.).
          Le Programme et les Panels s'appuient sur l'identifiant de chaque journée : si vous en supprimez une,
          pensez à réaffecter ou supprimer les éléments de programme/panels qui lui étaient rattachés.
        </p>
        {form.days.map((day, index) => (
          <div className="cms-speaker-row" key={index}>
            <div className="cms-form-row">
              <label>Libellé</label>
              <input className="cms-input" value={day.label} onChange={(e) => updateDay(index, 'label', e.target.value)} placeholder="ex. Big Day" />
            </div>
            <div className="cms-form-row">
              <label>Identifiant (clé technique)</label>
              <input
                className="cms-input"
                value={day.key}
                onChange={(e) => { setDayKeyEdited(index); updateDay(index, 'key', e.target.value); }}
                placeholder="ex. big-day"
              />
            </div>
            <div className="cms-form-row">
              <label>Date</label>
              <input type="date" className="cms-input" value={day.date} onChange={(e) => updateDay(index, 'date', e.target.value)} />
            </div>
            <button type="button" className="cms-btn cms-btn-danger" onClick={() => removeDay(index)}>Retirer</button>
          </div>
        ))}
        <button type="button" className="cms-btn" onClick={addDay}>+ Ajouter une journée</button>

        <div style={{ marginTop: '1.5rem' }}>
          <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventSettingsForm;
