import React, { useState, useEffect, useCallback } from 'react';
import axiosClient from '../../../api/axiosClient';
import { clearCachedPrefix } from '../../../api/contentCache';
import ConfirmDialog from './ConfirmDialog';
import ImageUploader from './ImageUploader';
import './cms.css';

const ICON_OPTIONS = ['handshake', 'zap', 'info', 'star', 'award'];

const EMPTY_EDITION = {
  order: 0, slug: '', editionLabel: '', year: '', dateVenueText: '', tagline: '',
  heroImage: '', heroImagePublicId: '',
  stats: [], gallery: [], testimonials: [], partnerLogos: [], introCards: [],
};

const EditionsManager = () => {
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [formItem, setFormItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchEditions = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get('/content/editions');
      setEditions(data.data);
    } catch (err) {
      setStatus({ type: 'error', message: 'Impossible de charger les éditions.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEditions(); }, [fetchEditions]);

  const openNewForm = () => setFormItem({ ...EMPTY_EDITION, order: editions.length });
  const openEditForm = (item) => setFormItem({ ...item });

  // --- helpers pour les sous-listes ---
  const updateArrayItem = (field, index, patch) => {
    setFormItem((f) => {
      const arr = [...f[field]];
      arr[index] = { ...arr[index], ...patch };
      return { ...f, [field]: arr };
    });
  };
  const addArrayItem = (field, emptyItem) => setFormItem((f) => ({ ...f, [field]: [...f[field], emptyItem] }));
  const removeArrayItem = (field, index) => setFormItem((f) => ({ ...f, [field]: f[field].filter((_, i) => i !== index) }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      if (formItem._id) {
        await axiosClient.put(`/content/editions/${formItem._id}`, formItem);
      } else {
        await axiosClient.post('/content/editions', formItem);
      }
      clearCachedPrefix('/content/editions');
      setFormItem(null);
      await fetchEditions();
      setStatus({ type: 'success', message: 'Édition enregistrée.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || "Échec de l'enregistrement." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/content/editions/${deleteTarget._id}`);
      clearCachedPrefix('/content/editions');
      setDeleteTarget(null);
      await fetchEditions();
    } catch (err) {
      setStatus({ type: 'error', message: 'Échec de la suppression.' });
      setDeleteTarget(null);
    }
  };

  return (
    <div className="cms-section">
      {status && <p className={status.type === 'success' ? 'cms-alert-success' : 'cms-alert-error'}>{status.message}</p>}

      <div className="cms-toolbar">
        <h3 style={{ margin: 0 }}>Éditions</h3>
        <button type="button" className="cms-btn cms-btn-primary" onClick={openNewForm}>+ Ajouter une édition</button>
      </div>

      {loading ? (
        <p className="loading">Chargement...</p>
      ) : (
        <div className="cms-list">
          {editions.length === 0 && <p>Aucune édition.</p>}
          {editions.map((item) => (
            <div className="cms-list-item" key={item._id}>
              <div className="cms-list-item-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {item.heroImage && <img src={item.heroImage} alt={item.editionLabel} className="cms-uploader-preview" />}
                <div>
                  <h4>{item.editionLabel}</h4>
                  <p>/editions/{item.slug}</p>
                </div>
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
          <h4>{formItem._id ? "Modifier l'édition" : 'Nouvelle édition'}</h4>

          <div className="cms-form-grid">
            <div className="cms-form-row">
              <label>Libellé (ex. "3ème édition")</label>
              <input className="cms-input" value={formItem.editionLabel} onChange={(e) => setFormItem({ ...formItem, editionLabel: e.target.value })} required />
            </div>
            <div className="cms-form-row">
              <label>Slug (URL : /editions/...)</label>
              <input className="cms-input" value={formItem.slug} onChange={(e) => setFormItem({ ...formItem, slug: e.target.value })} required />
            </div>
            <div className="cms-form-row">
              <label>Année</label>
              <input type="number" className="cms-input" value={formItem.year} onChange={(e) => setFormItem({ ...formItem, year: Number(e.target.value) })} />
            </div>
          </div>
          <div className="cms-form-grid">
            <div className="cms-form-row">
              <label>Date / lieu</label>
              <input className="cms-input" value={formItem.dateVenueText} onChange={(e) => setFormItem({ ...formItem, dateVenueText: e.target.value })} />
            </div>
            <div className="cms-form-row">
              <label>Slogan</label>
              <input className="cms-input" value={formItem.tagline} onChange={(e) => setFormItem({ ...formItem, tagline: e.target.value })} />
            </div>
            <div className="cms-form-row">
              <label>Ordre</label>
              <input type="number" className="cms-input" value={formItem.order} onChange={(e) => setFormItem({ ...formItem, order: Number(e.target.value) })} />
            </div>
          </div>
          <div className="cms-form-row">
            <label>Image de couverture</label>
            <ImageUploader folder="hero" value={{ url: formItem.heroImage }} onChange={({ url, publicId }) => setFormItem({ ...formItem, heroImage: url, heroImagePublicId: publicId })} />
          </div>

          {/* --- Stats --- */}
          <div className="cms-form-row">
            <label>Statistiques clés</label>
            {formItem.stats.map((stat, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input className="cms-input" placeholder="Valeur (ex. +500)" value={stat.value} onChange={(e) => updateArrayItem('stats', index, { value: e.target.value })} />
                <input className="cms-input" placeholder="Libellé (ex. Participants)" value={stat.label} onChange={(e) => updateArrayItem('stats', index, { label: e.target.value })} />
                <button type="button" className="cms-btn cms-btn-danger" onClick={() => removeArrayItem('stats', index)}>×</button>
              </div>
            ))}
            <button type="button" className="cms-btn" onClick={() => addArrayItem('stats', { value: '', label: '' })}>+ Ajouter une statistique</button>
          </div>

          {/* --- Gallery --- */}
          <div className="cms-form-row">
            <label>Galerie photos</label>
            {formItem.gallery.map((img, index) => (
              <div key={index} className="cms-speaker-row">
                <ImageUploader folder="hero" value={{ url: img.image }} onChange={({ url, publicId }) => updateArrayItem('gallery', index, { image: url, imagePublicId: publicId })} />
                <input className="cms-input" placeholder="Texte alternatif" value={img.alt} onChange={(e) => updateArrayItem('gallery', index, { alt: e.target.value })} />
                <button type="button" className="cms-btn cms-btn-danger" onClick={() => removeArrayItem('gallery', index)}>Retirer</button>
              </div>
            ))}
            <button type="button" className="cms-btn" onClick={() => addArrayItem('gallery', { image: '', imagePublicId: '', alt: '' })}>+ Ajouter une photo</button>
          </div>

          {/* --- Testimonials --- */}
          <div className="cms-form-row">
            <label>Témoignages</label>
            {formItem.testimonials.map((t, index) => (
              <div key={index} className="cms-speaker-row">
                <div className="cms-form-row">
                  <label>Nom</label>
                  <input className="cms-input" value={t.name} onChange={(e) => updateArrayItem('testimonials', index, { name: e.target.value })} />
                </div>
                <div className="cms-form-row">
                  <label>Citation</label>
                  <textarea className="cms-textarea" value={t.quote} onChange={(e) => updateArrayItem('testimonials', index, { quote: e.target.value })} />
                </div>
                <ImageUploader folder="speakers" value={{ url: t.image }} onChange={({ url, publicId }) => updateArrayItem('testimonials', index, { image: url, imagePublicId: publicId })} />
                <button type="button" className="cms-btn cms-btn-danger" onClick={() => removeArrayItem('testimonials', index)}>Retirer</button>
              </div>
            ))}
            <button type="button" className="cms-btn" onClick={() => addArrayItem('testimonials', { name: '', quote: '', image: '', imagePublicId: '' })}>+ Ajouter un témoignage</button>
          </div>

          {/* --- Partner logos --- */}
          <div className="cms-form-row">
            <label>Logos partenaires (optionnel)</label>
            {formItem.partnerLogos.map((img, index) => (
              <div key={index} className="cms-speaker-row">
                <ImageUploader folder="sponsors" value={{ url: img.image }} onChange={({ url, publicId }) => updateArrayItem('partnerLogos', index, { image: url, imagePublicId: publicId })} />
                <input className="cms-input" placeholder="Texte alternatif" value={img.alt} onChange={(e) => updateArrayItem('partnerLogos', index, { alt: e.target.value })} />
                <button type="button" className="cms-btn cms-btn-danger" onClick={() => removeArrayItem('partnerLogos', index)}>Retirer</button>
              </div>
            ))}
            <button type="button" className="cms-btn" onClick={() => addArrayItem('partnerLogos', { image: '', imagePublicId: '', alt: '' })}>+ Ajouter un logo</button>
          </div>

          {/* --- Intro cards --- */}
          <div className="cms-form-row">
            <label>Cartes d'introduction (optionnel)</label>
            {formItem.introCards.map((card, index) => (
              <div key={index} className="cms-speaker-row">
                <div className="cms-form-row">
                  <label>Icône</label>
                  <select className="cms-select" value={card.icon} onChange={(e) => updateArrayItem('introCards', index, { icon: e.target.value })}>
                    {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                  </select>
                </div>
                <div className="cms-form-row">
                  <label>Titre</label>
                  <input className="cms-input" value={card.title} onChange={(e) => updateArrayItem('introCards', index, { title: e.target.value })} />
                </div>
                <div className="cms-form-row">
                  <label>Texte</label>
                  <input className="cms-input" value={card.text} onChange={(e) => updateArrayItem('introCards', index, { text: e.target.value })} />
                </div>
                <button type="button" className="cms-btn cms-btn-danger" onClick={() => removeArrayItem('introCards', index)}>Retirer</button>
              </div>
            ))}
            <button type="button" className="cms-btn" onClick={() => addArrayItem('introCards', { icon: 'info', title: '', text: '' })}>+ Ajouter une carte</button>
          </div>

          <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</button>{' '}
          <button type="button" className="cms-btn" onClick={() => setFormItem(null)}>Annuler</button>
        </form>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Supprimer cette édition ?"
          message={`"${deleteTarget.editionLabel}" sera définitivement supprimée.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default EditionsManager;
