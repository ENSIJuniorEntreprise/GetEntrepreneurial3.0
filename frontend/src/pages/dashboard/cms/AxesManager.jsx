import React, { useState, useEffect, useCallback } from 'react';
import axiosClient from '../../../api/axiosClient';
import { clearCached } from '../../../api/contentCache';
import ConfirmDialog from './ConfirmDialog';
import ImageUploader from './ImageUploader';
import './cms.css';

const EMPTY_AXIS = { order: 0, image: '', imagePublicId: '', titleLine1: '', titleLine2: '', backText: '', ctaLabel: '', ctaHref: '' };

const AxesManager = () => {
  const [axes, setAxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [formItem, setFormItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchAxes = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get('/content/axes');
      setAxes(data.data);
    } catch (err) {
      setStatus({ type: 'error', message: 'Impossible de charger les axes.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAxes(); }, [fetchAxes]);

  const openNewForm = () => setFormItem({ ...EMPTY_AXIS, order: axes.length });
  const openEditForm = (item) => setFormItem({ ...item });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      if (formItem._id) {
        await axiosClient.put(`/content/axes/${formItem._id}`, formItem);
      } else {
        await axiosClient.post('/content/axes', formItem);
      }
      clearCached('/content/axes');
      setFormItem(null);
      await fetchAxes();
      setStatus({ type: 'success', message: 'Axe enregistré.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || "Échec de l'enregistrement." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/content/axes/${deleteTarget._id}`);
      clearCached('/content/axes');
      setDeleteTarget(null);
      await fetchAxes();
    } catch (err) {
      setStatus({ type: 'error', message: 'Échec de la suppression.' });
      setDeleteTarget(null);
    }
  };

  return (
    <div className="cms-section">
      {status && <p className={status.type === 'success' ? 'cms-alert-success' : 'cms-alert-error'}>{status.message}</p>}

      <div className="cms-toolbar">
        <h3 style={{ margin: 0 }}>Nos Axes (Accueil)</h3>
        <button type="button" className="cms-btn cms-btn-primary" onClick={openNewForm}>+ Ajouter un axe</button>
      </div>

      {loading ? (
        <p className="loading">Chargement...</p>
      ) : (
        <div className="cms-list">
          {axes.length === 0 && <p>Aucun axe.</p>}
          {axes.map((item) => (
            <div className="cms-list-item" key={item._id}>
              <div className="cms-list-item-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {item.image && <img src={item.image} alt={item.titleLine1} className="cms-uploader-preview" />}
                <h4>{item.titleLine1} {item.titleLine2}</h4>
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
          <h4>{formItem._id ? "Modifier l'axe" : 'Nouvel axe'}</h4>
          <div className="cms-form-grid">
            <div className="cms-form-row">
              <label>Titre (ligne 1)</label>
              <input className="cms-input" value={formItem.titleLine1} onChange={(e) => setFormItem({ ...formItem, titleLine1: e.target.value })} required />
            </div>
            <div className="cms-form-row">
              <label>Titre (ligne 2)</label>
              <input className="cms-input" value={formItem.titleLine2} onChange={(e) => setFormItem({ ...formItem, titleLine2: e.target.value })} />
            </div>
            <div className="cms-form-row">
              <label>Ordre</label>
              <input type="number" className="cms-input" value={formItem.order} onChange={(e) => setFormItem({ ...formItem, order: Number(e.target.value) })} />
            </div>
          </div>
          <div className="cms-form-row">
            <label>Image (face avant)</label>
            <ImageUploader folder="hero" value={{ url: formItem.image }} onChange={({ url, publicId }) => setFormItem({ ...formItem, image: url, imagePublicId: publicId })} />
          </div>
          <div className="cms-form-row">
            <label>Texte (face arrière)</label>
            <textarea className="cms-textarea" value={formItem.backText} onChange={(e) => setFormItem({ ...formItem, backText: e.target.value })} />
          </div>
          <div className="cms-form-grid">
            <div className="cms-form-row">
              <label>Libellé du bouton</label>
              <input className="cms-input" value={formItem.ctaLabel} onChange={(e) => setFormItem({ ...formItem, ctaLabel: e.target.value })} />
            </div>
            <div className="cms-form-row">
              <label>Lien du bouton</label>
              <input className="cms-input" value={formItem.ctaHref} onChange={(e) => setFormItem({ ...formItem, ctaHref: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</button>{' '}
          <button type="button" className="cms-btn" onClick={() => setFormItem(null)}>Annuler</button>
        </form>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Supprimer cet axe ?"
          message={`"${deleteTarget.titleLine1}" sera définitivement supprimé.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AxesManager;
