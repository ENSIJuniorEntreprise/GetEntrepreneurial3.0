import React, { useState, useEffect, useCallback } from 'react';
import axiosClient from '../../../api/axiosClient';
import { clearCached } from '../../../api/contentCache';
import ConfirmDialog from './ConfirmDialog';
import ImageUploader from './ImageUploader';
import './cms.css';

const EMPTY_SPONSOR = { name: '', logoUrl: '', logoPublicId: '', category: '', link: '', order: 0 };

const SponsorsManager = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [formSponsor, setFormSponsor] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchSponsors = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get('/content/sponsors');
      setSponsors(data.data);
    } catch (err) {
      setStatus({ type: 'error', message: 'Impossible de charger les sponsors.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSponsors(); }, [fetchSponsors]);

  const openNewForm = () => setFormSponsor({ ...EMPTY_SPONSOR, order: sponsors.length });
  const openEditForm = (sponsor) => setFormSponsor({ ...sponsor });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      if (formSponsor._id) {
        await axiosClient.put(`/content/sponsors/${formSponsor._id}`, formSponsor);
      } else {
        await axiosClient.post('/content/sponsors', formSponsor);
      }
      clearCached('/content/sponsors');
      setFormSponsor(null);
      await fetchSponsors();
      setStatus({ type: 'success', message: 'Sponsor enregistré.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || "Échec de l'enregistrement." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/content/sponsors/${deleteTarget._id}`);
      clearCached('/content/sponsors');
      setDeleteTarget(null);
      await fetchSponsors();
    } catch (err) {
      setStatus({ type: 'error', message: 'Échec de la suppression.' });
      setDeleteTarget(null);
    }
  };

  return (
    <div className="cms-section">
      {status && <p className={status.type === 'success' ? 'cms-alert-success' : 'cms-alert-error'}>{status.message}</p>}

      <p style={{ color: 'var(--text-secondary)', marginTop: 0 }}>
        Cette liste alimente à la fois le bandeau de sponsors de l'accueil et les catégories de la page Collaboration (regroupées automatiquement par "Catégorie" — ex. "Gold", "Silver", "Nos Alliés", "Institutions").
      </p>
      <div className="cms-toolbar">
        <h3 style={{ margin: 0 }}>Partenaires & Sponsors</h3>
        <button type="button" className="cms-btn cms-btn-primary" onClick={openNewForm}>+ Ajouter</button>
      </div>

      {loading ? (
        <p className="loading">Chargement...</p>
      ) : (
        <div className="cms-list">
          {sponsors.length === 0 && <p>Aucun sponsor enregistré.</p>}
          {sponsors.map((sponsor) => (
            <div className="cms-list-item" key={sponsor._id}>
              <div className="cms-list-item-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {sponsor.logoUrl && <img src={sponsor.logoUrl} alt={sponsor.name} className="cms-uploader-preview" />}
                <div>
                  <h4>{sponsor.name}</h4>
                  <p>{sponsor.category}</p>
                </div>
              </div>
              <div className="cms-list-item-actions">
                <button type="button" className="cms-btn" onClick={() => openEditForm(sponsor)}>Modifier</button>
                <button type="button" className="cms-btn cms-btn-danger" onClick={() => setDeleteTarget(sponsor)}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formSponsor && (
        <form className="cms-card" onSubmit={handleSave}>
          <h4>{formSponsor._id ? 'Modifier le sponsor' : 'Nouveau sponsor'}</h4>
          <div className="cms-form-grid">
            <div className="cms-form-row">
              <label>Nom</label>
              <input className="cms-input" value={formSponsor.name} onChange={(e) => setFormSponsor({ ...formSponsor, name: e.target.value })} required />
            </div>
            <div className="cms-form-row">
              <label>Catégorie</label>
              <input className="cms-input" value={formSponsor.category} onChange={(e) => setFormSponsor({ ...formSponsor, category: e.target.value })} />
            </div>
            <div className="cms-form-row">
              <label>Lien (site web, optionnel)</label>
              <input className="cms-input" value={formSponsor.link} onChange={(e) => setFormSponsor({ ...formSponsor, link: e.target.value })} />
            </div>
            <div className="cms-form-row">
              <label>Ordre</label>
              <input type="number" className="cms-input" value={formSponsor.order} onChange={(e) => setFormSponsor({ ...formSponsor, order: Number(e.target.value) })} />
            </div>
          </div>
          <div className="cms-form-row">
            <label>Logo</label>
            <ImageUploader
              folder="sponsors"
              value={{ url: formSponsor.logoUrl }}
              onChange={({ url, publicId }) => setFormSponsor({ ...formSponsor, logoUrl: url, logoPublicId: publicId })}
            />
          </div>
          <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</button>{' '}
          <button type="button" className="cms-btn" onClick={() => setFormSponsor(null)}>Annuler</button>
        </form>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Supprimer ce sponsor ?"
          message={`"${deleteTarget.name}" sera définitivement retiré du site.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default SponsorsManager;
