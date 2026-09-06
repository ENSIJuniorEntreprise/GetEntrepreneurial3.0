import React, { useState, useEffect, useCallback } from 'react';
import axiosClient from '../../../api/axiosClient';
import { clearCached } from '../../../api/contentCache';
import ImageUploader from './ImageUploader';
import StringListEditor from './StringListEditor';
import LinkListEditor from './LinkListEditor';
import './cms.css';

const EMPTY_SITE_CONTENT = {
  navLinks: [],
  footer: { columns: [], socialLinks: [], contactPhone: '', contactEmail: '', tagline: '', copyrightText: '' },
  contactPage: { introTitle: '', introText: '', phones: [], emails: [], address: '' },
  collaborationPage: { ctaImage: '', ctaTitle: '', ctaText: '', ctaLinks: [] },
  inscriptionPage: {
    participantCard: { title: '', text: '', benefits: [], ctaLabel: '', ctaHref: '' },
    exposantCard: { title: '', text: '', benefits: [], ctaLabel: '', ctaHref: '' },
  },
};

const TABS = [
  { key: 'navigation', label: 'Navigation & Footer' },
  { key: 'contact', label: 'Page Contact' },
  { key: 'collaboration', label: 'Page Collaboration' },
  { key: 'inscription', label: 'Page Inscription' },
];

const SiteContentManager = () => {
  const [activeTab, setActiveTab] = useState('navigation');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get('/content/site');
      setContent({ ...EMPTY_SITE_CONTENT, ...data.data });
    } catch (err) {
      setStatus({ type: 'error', message: 'Impossible de charger le contenu du site.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await axiosClient.put('/content/site', content);
      clearCached('/content/site');
      setStatus({ type: 'success', message: 'Contenu enregistré.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || "Échec de l'enregistrement." });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) return <p className="loading">Chargement...</p>;

  const updateFooterColumn = (index, field, value) => {
    const columns = [...content.footer.columns];
    columns[index] = { ...columns[index], [field]: value };
    setContent({ ...content, footer: { ...content.footer, columns } });
  };
  const addFooterColumn = () => {
    setContent({ ...content, footer: { ...content.footer, columns: [...content.footer.columns, { title: '', links: [] }] } });
  };
  const removeFooterColumn = (index) => {
    setContent({ ...content, footer: { ...content.footer, columns: content.footer.columns.filter((_, i) => i !== index) } });
  };

  const updateCard = (page, cardKey, field, value) => {
    setContent({
      ...content,
      [page]: { ...content[page], [cardKey]: { ...content[page][cardKey], [field]: value } },
    });
  };

  return (
    <div className="cms-section">
      {status && <p className={status.type === 'success' ? 'cms-alert-success' : 'cms-alert-error'}>{status.message}</p>}

      <div className="cms-tabs">
        {TABS.map((t) => (
          <button key={t.key} type="button" className={`cms-tab ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave}>
        {activeTab === 'navigation' && (
          <div className="cms-card">
            <h4>Liens de navigation (menu)</h4>
            <LinkListEditor
              values={content.navLinks}
              onChange={(navLinks) => setContent({ ...content, navLinks })}
            />

            <h4>Colonnes du footer</h4>
            {content.footer.columns.map((col, index) => (
              <div key={index} className="cms-speaker-row" style={{ display: 'block' }}>
                <div className="cms-form-row">
                  <label>Titre de la colonne</label>
                  <input className="cms-input" value={col.title} onChange={(e) => updateFooterColumn(index, 'title', e.target.value)} />
                </div>
                <LinkListEditor
                  label="Liens de cette colonne"
                  values={col.links}
                  onChange={(links) => updateFooterColumn(index, 'links', links)}
                />
                <button type="button" className="cms-btn cms-btn-danger" onClick={() => removeFooterColumn(index)}>Retirer la colonne</button>
              </div>
            ))}
            <button type="button" className="cms-btn" onClick={addFooterColumn}>+ Ajouter une colonne</button>

            <h4>Réseaux sociaux</h4>
            <LinkListEditor
              values={content.footer.socialLinks.map((s) => ({ label: s.platform, href: s.url }))}
              onChange={(vals) => setContent({ ...content, footer: { ...content.footer, socialLinks: vals.map((v) => ({ platform: v.label, url: v.href })) } })}
            />

            <div className="cms-form-grid">
              <div className="cms-form-row">
                <label>Téléphone (footer)</label>
                <input className="cms-input" value={content.footer.contactPhone} onChange={(e) => setContent({ ...content, footer: { ...content.footer, contactPhone: e.target.value } })} />
              </div>
              <div className="cms-form-row">
                <label>Email (footer)</label>
                <input className="cms-input" value={content.footer.contactEmail} onChange={(e) => setContent({ ...content, footer: { ...content.footer, contactEmail: e.target.value } })} />
              </div>
            </div>
            <div className="cms-form-grid">
              <div className="cms-form-row">
                <label>Slogan / hashtag</label>
                <input className="cms-input" value={content.footer.tagline} onChange={(e) => setContent({ ...content, footer: { ...content.footer, tagline: e.target.value } })} />
              </div>
              <div className="cms-form-row">
                <label>Texte de copyright</label>
                <input className="cms-input" value={content.footer.copyrightText} onChange={(e) => setContent({ ...content, footer: { ...content.footer, copyrightText: e.target.value } })} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="cms-card">
            <div className="cms-form-row">
              <label>Titre d'introduction</label>
              <input className="cms-input" value={content.contactPage.introTitle} onChange={(e) => setContent({ ...content, contactPage: { ...content.contactPage, introTitle: e.target.value } })} />
            </div>
            <div className="cms-form-row">
              <label>Texte d'introduction</label>
              <textarea className="cms-textarea" value={content.contactPage.introText} onChange={(e) => setContent({ ...content, contactPage: { ...content.contactPage, introText: e.target.value } })} />
            </div>
            <StringListEditor label="Téléphones" values={content.contactPage.phones} onChange={(phones) => setContent({ ...content, contactPage: { ...content.contactPage, phones } })} />
            <StringListEditor label="Emails" values={content.contactPage.emails} onChange={(emails) => setContent({ ...content, contactPage: { ...content.contactPage, emails } })} />
            <div className="cms-form-row">
              <label>Adresse</label>
              <input className="cms-input" value={content.contactPage.address} onChange={(e) => setContent({ ...content, contactPage: { ...content.contactPage, address: e.target.value } })} />
            </div>
          </div>
        )}

        {activeTab === 'collaboration' && (
          <div className="cms-card">
            <div className="cms-form-row">
              <label>Image (bloc CTA)</label>
              <ImageUploader folder="hero" value={{ url: content.collaborationPage.ctaImage }} onChange={({ url }) => setContent({ ...content, collaborationPage: { ...content.collaborationPage, ctaImage: url } })} />
            </div>
            <div className="cms-form-row">
              <label>Titre</label>
              <input className="cms-input" value={content.collaborationPage.ctaTitle} onChange={(e) => setContent({ ...content, collaborationPage: { ...content.collaborationPage, ctaTitle: e.target.value } })} />
            </div>
            <div className="cms-form-row">
              <label>Texte</label>
              <textarea className="cms-textarea" value={content.collaborationPage.ctaText} onChange={(e) => setContent({ ...content, collaborationPage: { ...content.collaborationPage, ctaText: e.target.value } })} />
            </div>
            <LinkListEditor
              label="Boutons / liens"
              values={content.collaborationPage.ctaLinks}
              onChange={(ctaLinks) => setContent({ ...content, collaborationPage: { ...content.collaborationPage, ctaLinks } })}
              showDownloadToggle
            />
            <p style={{ color: 'var(--text-secondary)' }}>Les grilles de partenaires (Gold/Silver/Alliés/Institutions) se gèrent dans l'écran "Partenaires".</p>
          </div>
        )}

        {activeTab === 'inscription' && (
          <div className="cms-card">
            {['participantCard', 'exposantCard'].map((cardKey) => (
              <div key={cardKey} style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <h4>{cardKey === 'participantCard' ? 'Carte "Participants"' : 'Carte "Exposants"'}</h4>
                <div className="cms-form-row">
                  <label>Titre</label>
                  <input className="cms-input" value={content.inscriptionPage[cardKey].title} onChange={(e) => updateCard('inscriptionPage', cardKey, 'title', e.target.value)} />
                </div>
                <div className="cms-form-row">
                  <label>Texte</label>
                  <textarea className="cms-textarea" value={content.inscriptionPage[cardKey].text} onChange={(e) => updateCard('inscriptionPage', cardKey, 'text', e.target.value)} />
                </div>
                <StringListEditor label="Avantages" values={content.inscriptionPage[cardKey].benefits} onChange={(benefits) => updateCard('inscriptionPage', cardKey, 'benefits', benefits)} />
                <div className="cms-form-grid">
                  <div className="cms-form-row">
                    <label>Libellé du bouton</label>
                    <input className="cms-input" value={content.inscriptionPage[cardKey].ctaLabel} onChange={(e) => updateCard('inscriptionPage', cardKey, 'ctaLabel', e.target.value)} />
                  </div>
                  <div className="cms-form-row">
                    <label>Lien du bouton</label>
                    <input className="cms-input" value={content.inscriptionPage[cardKey].ctaHref} onChange={(e) => updateCard('inscriptionPage', cardKey, 'ctaHref', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="cms-btn cms-btn-primary" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</button>
      </form>
    </div>
  );
};

export default SiteContentManager;
