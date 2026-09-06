import React, { useState, useEffect, useCallback } from 'react';
import axiosClient from '../../../api/axiosClient';
import { clearCached } from '../../../api/contentCache';
import ConfirmDialog from './ConfirmDialog';
import ImageUploader from './ImageUploader';
import './cms.css';

const EMPTY_SPEAKER = { order: 0, name: '', title: '', image: '', imagePublicId: '', description: '' };

const SpeakersManager = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [formItem, setFormItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchSpeakers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get('/content/speakers');
      setSpeakers(data.data);
    } catch (err) {
      setStatus({ type: 'error', message: 'Impossible de charger les conférenciers.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSpeakers(); }, [fetchSpeakers]);

  const openNewForm = () => setFormItem({ ...EMPTY_SPEAKER, order: speakers.length });
  const openEditForm = (item) => setFormItem({ ...item });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      if (formItem._id) {
        await axiosClient.put(`/content/speakers/${formItem._id}`, formItem);
      } else {
        await axiosClient.post('/content/speakers', formItem);
      }
      clearCached('/content/speakers');
      setFormItem(null);
      await fetchSpeakers();
      setStatus({ type: 'success', message: 'Conférencier enregistré.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || "Échec de l'enregistrement." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/content/speakers/${deleteTarget._id}`);
      clearCached('/content/speakers');
      setDeleteTarget(null);
      await fetchSpeakers();
    } catch (err) {
      setStatus({ type: 'error', message: 'Échec de la suppression.' });
      setDeleteTarget(null);
    }
  };

  return (
    <div className="cms-section">
      {status && <p className={status.type === 'success' ? 'cms-alert-success' : 'cms-alert-error'}>{status.message}</p>}
      <p style={{ color: 'var(--text-secondary)', marginTop: 0 }}>
        Les 8 premiers (par ordre) apparaissent dans l'aperçu de la page d'accueil ; la liste complète s'affiche dans la fenêtre "Voir tous les conférenciers".
      </p>

      <div className="cms-toolbar">
        <h3 style={{ margin: 0 }}>Conférenciers (Accueil)</h3>
        <button type="button" className="cms-btn cms-btn-primary" onClick={openNewForm}>+ Ajouter un conférencier</button>
      </div>

      {loading ? (
        <p className="loading">Chargement...</p>
      ) : (
        <div className="cms-list">
          {speakers.length === 0 && <p>Aucun conférencier.</p>}
          {speakers.map((item) => (
            <div className="cms-list-item" key={item._id}>
              <div className="cms-list-item-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {item.image && <img src={item.image} alt={item.name} className="cms-uploader-preview" />}
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.title}</p>
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
          <h4>{formItem._id ? 'Modifier le conférencier' : 'Nouveau conférencier'}</h4>
          <div className="cms-form-grid">
            <div className="cms-form-row">
              <label>Nom</label>
              <input className="cms-input" value={formItem.name} onChange={(e) => setFormItem({ ...formItem, name: e.target.value })} required />
            </div>
            <div className="cms-form-row">
              <label>Titre / Rôle</label>
              <input className="cms-input" value={formItem.title} onChange={(e) => setFormItem({ ...formItem, title: e.target.value })} />
            </div>
            <div className="cms-form-row">
              <label>Ordre</label>
              <input type="number" className="cms-input" value={formItem.order} onChange={(e) => setFormItem({ ...formItem, order: Number(e.target.value) })} />
            </div>
          </div>
          <div className="cms-form-row">
            <label>Photo</label>
            <ImageUploader folder="speakers" value={{ url: formItem.image }} onChange={({ url, publicId }) => setFormItem({ ...formItem, image: url, imagePublicId: publicId })} />
          </div>
          <div className="cms-form-row">
            <label>Description</label>
            <textarea className="cms-textarea" value={formItem.description} onChange={(e) => setFormItem({ ...formItem, description: e.target.value })} />
          </div>
          <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</button>{' '}
          <button type="button" className="cms-btn" onClick={() => setFormItem(null)}>Annuler</button>
        </form>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Supprimer ce conférencier ?"
          message={`"${deleteTarget.name}" sera définitivement supprimé.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default SpeakersManager;
