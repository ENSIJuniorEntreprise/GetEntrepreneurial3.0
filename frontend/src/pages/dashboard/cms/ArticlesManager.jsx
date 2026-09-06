import React, { useState, useEffect, useCallback } from 'react';
import axiosClient from '../../../api/axiosClient';
import { clearCached } from '../../../api/contentCache';
import ConfirmDialog from './ConfirmDialog';
import ImageUploader from './ImageUploader';
import './cms.css';

const EMPTY_ARTICLE = { order: 0, image: '', imagePublicId: '', category: '', date: '', title: '', content: '' };

const ArticlesManager = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [formItem, setFormItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get('/content/articles');
      setArticles(data.data);
    } catch (err) {
      setStatus({ type: 'error', message: 'Impossible de charger les articles.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  const openNewForm = () => setFormItem({ ...EMPTY_ARTICLE, order: articles.length });
  const openEditForm = (item) => setFormItem({ ...item });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      if (formItem._id) {
        await axiosClient.put(`/content/articles/${formItem._id}`, formItem);
      } else {
        await axiosClient.post('/content/articles', formItem);
      }
      clearCached('/content/articles');
      setFormItem(null);
      await fetchArticles();
      setStatus({ type: 'success', message: 'Article enregistré.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || "Échec de l'enregistrement." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/content/articles/${deleteTarget._id}`);
      clearCached('/content/articles');
      setDeleteTarget(null);
      await fetchArticles();
    } catch (err) {
      setStatus({ type: 'error', message: 'Échec de la suppression.' });
      setDeleteTarget(null);
    }
  };

  return (
    <div className="cms-section">
      {status && <p className={status.type === 'success' ? 'cms-alert-success' : 'cms-alert-error'}>{status.message}</p>}

      <div className="cms-toolbar">
        <h3 style={{ margin: 0 }}>Articles (Accueil)</h3>
        <button type="button" className="cms-btn cms-btn-primary" onClick={openNewForm}>+ Ajouter un article</button>
      </div>

      {loading ? (
        <p className="loading">Chargement...</p>
      ) : (
        <div className="cms-list">
          {articles.length === 0 && <p>Aucun article.</p>}
          {articles.map((item) => (
            <div className="cms-list-item" key={item._id}>
              <div className="cms-list-item-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {item.image && <img src={item.image} alt={item.title} className="cms-uploader-preview" />}
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.category} — {item.date}</p>
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
          <h4>{formItem._id ? "Modifier l'article" : 'Nouvel article'}</h4>
          <div className="cms-form-grid">
            <div className="cms-form-row">
              <label>Catégorie</label>
              <input className="cms-input" value={formItem.category} onChange={(e) => setFormItem({ ...formItem, category: e.target.value })} required />
            </div>
            <div className="cms-form-row">
              <label>Date</label>
              <input className="cms-input" value={formItem.date} onChange={(e) => setFormItem({ ...formItem, date: e.target.value })} required />
            </div>
            <div className="cms-form-row">
              <label>Ordre</label>
              <input type="number" className="cms-input" value={formItem.order} onChange={(e) => setFormItem({ ...formItem, order: Number(e.target.value) })} />
            </div>
          </div>
          <div className="cms-form-row">
            <label>Titre</label>
            <input className="cms-input" value={formItem.title} onChange={(e) => setFormItem({ ...formItem, title: e.target.value })} required />
          </div>
          <div className="cms-form-row">
            <label>Image</label>
            <ImageUploader folder="hero" value={{ url: formItem.image }} onChange={({ url, publicId }) => setFormItem({ ...formItem, image: url, imagePublicId: publicId })} />
          </div>
          <div className="cms-form-row">
            <label>Contenu</label>
            <textarea className="cms-textarea" style={{ minHeight: 180 }} value={formItem.content} onChange={(e) => setFormItem({ ...formItem, content: e.target.value })} />
          </div>
          <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</button>{' '}
          <button type="button" className="cms-btn" onClick={() => setFormItem(null)}>Annuler</button>
        </form>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Supprimer cet article ?"
          message={`"${deleteTarget.title}" sera définitivement supprimé.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default ArticlesManager;
