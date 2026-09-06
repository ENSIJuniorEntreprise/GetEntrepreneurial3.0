import React, { useState, useEffect, useCallback } from 'react';
import axiosClient from '../../api/axiosClient';
import EventSettingsForm from './cms/EventSettingsForm';
import AgendaManager from './cms/AgendaManager';
import PanelsManager from './cms/PanelsManager';
import SponsorsManager from './cms/SponsorsManager';
import SiteContentManager from './cms/SiteContentManager';
import ArticlesManager from './cms/ArticlesManager';
import AxesManager from './cms/AxesManager';
import SpeakersManager from './cms/SpeakersManager';
import EditionsManager from './cms/EditionsManager';
import FormOptionsManager from './cms/FormOptionsManager';
import './dashboard.css';

// --- ICÔNES (INCHANGÉ) ---
const StatsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>);
const UsersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 12a3 3 0 100-6 3 3 0 000 6z" /></svg>);
const ExposantIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H4.5A2.25 2.25 0 002.25 13.5V21M3 3h18M5.25 3v18m13.5-18v18M9 6.75h6.375a.625.625 0 01.625.625v3.75a.625.625 0 01-.625.625H9v-5z" /></svg>);
const MessageIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>);
const NewsletterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V7.125C4.5 6.504 5.004 6 5.625 6H9" /></svg>);
const CmsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>);

// NOUVEAU : Le composant pour la fenêtre modale de détails
const DetailsModal = ({ item, onClose }) => {
  if (!item) return null;

  // Filtre les clés non pertinentes et formate les valeurs
  const renderItemDetails = () => {
    return Object.entries(item)
      .filter(([key]) => key !== '_id' && key !== '__v') // Exclut les clés techniques
      .map(([key, value]) => {
        let displayValue = value;
        // Formate les dates
        if (['createdAt', 'updatedAt', 'dateDeNaissance'].includes(key)) {
          displayValue = new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
        }
        // Formate les booléens
        else if (typeof value === 'boolean') {
          displayValue = value ? 'Oui' : 'Non';
        }

        return (
          <div className="detail-row" key={key}>
            <strong className="detail-key">{key}</strong>
            <span className="detail-value">{String(displayValue)}</span>
          </div>
        );
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Détails de l'enregistrement</h2>
        <div className="details-container">
          {renderItemDetails()}
        </div>
      </div>
    </div>
  );
};


const CMS_VIEWS = [
  'cms-settings', 'cms-agenda', 'cms-panels', 'cms-sponsors',
  'cms-site', 'cms-articles', 'cms-axes', 'cms-speakers', 'cms-editions', 'cms-form-options',
];

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('stats');
  const [stats, setStats] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // NOUVEAU : États pour gérer la modale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const fetchData = useCallback(async (view) => {
    // ... (votre fonction fetchData reste inchangée)
    setLoading(true);
    setError('');
    let endpoint = '';
    switch (view) {
      case 'stats': endpoint = '/stats'; break;
      case 'participants': endpoint = '/inscriptions/participants'; break;
      case 'exposants': endpoint = '/inscriptions/exposants'; break;
      case 'contacts': endpoint = '/contact'; break;
      case 'newsletters': endpoint = '/newsletter'; break;
      default: setError('Vue non valide'); setLoading(false); return;
    }
    try {
      const response = await axiosClient.get(endpoint);
      if (view === 'stats') {
        setStats(response.data);
      } else {
        setData(response.data.data); 
      }
    } catch (err) {
      setError(`Erreur lors de la récupération des données : ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (CMS_VIEWS.includes(currentView)) return;
    fetchData(currentView);
  }, [currentView, fetchData]);

  // NOUVEAU : Fonctions pour ouvrir/fermer la modale
  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
  
  const renderStats = () => (
    // ... (votre fonction renderStats reste inchangée)
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-card-icon icon-participants"><UsersIcon /></div>
        <div className="stat-card-info"><h3>Participants</h3><p>{stats?.participants ?? '...'}</p></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-icon icon-exposants"><ExposantIcon /></div>
        <div className="stat-card-info"><h3>Exposants</h3><p>{stats?.exposants ?? '...'}</p></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-icon icon-messages"><MessageIcon /></div>
        <div className="stat-card-info"><h3>Messages</h3><p>{stats?.contacts ?? '...'}</p></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-icon icon-newsletter"><NewsletterIcon /></div>
        <div className="stat-card-info"><h3>Abonnés Newsletter</h3><p>{stats?.newsletters ?? '...'}</p></div>
      </div>
    </div>
  );

  // MODIFIÉ : renderTable inclut maintenant un bouton "Détails"
  const renderTable = () => {
    const config = {
      participants: { title: 'Liste des Participants', cols: ['Prénom', 'Nom', 'Email', 'Téléphone', 'Actions'] },
      exposants: { title: 'Liste des Exposants', cols: ['Entreprise', 'Contact', 'Email', 'Actions'] },
      contacts: { title: 'Messages de Contact', cols: ['Nom Complet', 'Email', 'Sujet', 'Actions'] },
      newsletters: { title: 'Inscrits à la Newsletter', cols: ["Email", "Date d'inscription", 'Actions'] },
    };
    if (!config[currentView] || !data) return <p>Aucune donnée à afficher.</p>;
    
    const { title, cols } = config[currentView];

    return (
      <div className="table-container">
        <div className="table-header"><h2>{title} ({data.length})</h2></div>
        <table className="data-table">
          <thead><tr>{cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {data.map((item, index) => {
              // On génère la ligne de manière dynamique pour chaque vue
              let row;
              switch (currentView) {
                case 'participants':
                  row = [item.prenom, item.nom, item.email, item.telephone];
                  break;
                case 'exposants':
                  row = [item.nomEntreprise, item.nomContact, item.emailContact];
                  break;
                case 'contacts':
                  row = [`${item.prenom} ${item.nom}`, item.email, item.sujet];
                  break;
                case 'newsletters':
                  row = [item.email, new Date(item.createdAt).toLocaleDateString()];
                  break;
                default:
                  row = [];
              }
              return (
                <tr key={item._id || index}>
                  {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                  <td>
                    <button className="details-button" onClick={() => handleViewDetails(item)}>
                      Voir Détails
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  
  const renderContent = () => {
    if (currentView === 'cms-settings') return <EventSettingsForm />;
    if (currentView === 'cms-agenda') return <AgendaManager />;
    if (currentView === 'cms-panels') return <PanelsManager />;
    if (currentView === 'cms-sponsors') return <SponsorsManager />;
    if (currentView === 'cms-site') return <SiteContentManager />;
    if (currentView === 'cms-articles') return <ArticlesManager />;
    if (currentView === 'cms-axes') return <AxesManager />;
    if (currentView === 'cms-speakers') return <SpeakersManager />;
    if (currentView === 'cms-editions') return <EditionsManager />;
    if (currentView === 'cms-form-options') return <FormOptionsManager />;

    if (loading) return <p className="loading">Chargement...</p>;
    if (error) return <p className="error">{error}</p>;
    if (currentView === 'stats') {
      return stats ? renderStats() : <p className="loading">Chargement des statistiques...</p>;
    }
    return data ? renderTable() : null;
  };
  
  return (
    <div className="dashboard-layout">
      <nav className="dashboard-sidebar">
        {/* ... (votre barre de navigation reste inchangée) ... */}
        <h1 className="sidebar-header">GET 3.0</h1>
        <ul className="sidebar-nav">
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('stats'); }} className={currentView === 'stats' ? 'active' : ''}><StatsIcon /> <span>Statistiques</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('participants'); }} className={currentView === 'participants' ? 'active' : ''}><UsersIcon /> <span>Participants</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('exposants'); }} className={currentView === 'exposants' ? 'active' : ''}><ExposantIcon /> <span>Exposants</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('contacts'); }} className={currentView === 'contacts' ? 'active' : ''}><MessageIcon /> <span>Messages</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('newsletters'); }} className={currentView === 'newsletters' ? 'active' : ''}><NewsletterIcon /> <span>Newsletter</span></a></li>
        </ul>
        <p style={{ padding: '0 1.5rem', margin: '0.5rem 0', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--sidebar-text)', opacity: 0.6 }}>Contenu du site</p>
        <ul className="sidebar-nav">
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('cms-settings'); }} className={currentView === 'cms-settings' ? 'active' : ''}><CmsIcon /> <span>Réglages événement</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('cms-agenda'); }} className={currentView === 'cms-agenda' ? 'active' : ''}><CmsIcon /> <span>Programme</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('cms-panels'); }} className={currentView === 'cms-panels' ? 'active' : ''}><CmsIcon /> <span>Panels & Intervenants</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('cms-sponsors'); }} className={currentView === 'cms-sponsors' ? 'active' : ''}><CmsIcon /> <span>Partenaires</span></a></li>
        </ul>
        <p style={{ padding: '0 1.5rem', margin: '0.5rem 0', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--sidebar-text)', opacity: 0.6 }}>Accueil</p>
        <ul className="sidebar-nav">
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('cms-articles'); }} className={currentView === 'cms-articles' ? 'active' : ''}><CmsIcon /> <span>Articles</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('cms-axes'); }} className={currentView === 'cms-axes' ? 'active' : ''}><CmsIcon /> <span>Nos 3 Axes</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('cms-speakers'); }} className={currentView === 'cms-speakers' ? 'active' : ''}><CmsIcon /> <span>Conférenciers</span></a></li>
        </ul>
        <p style={{ padding: '0 1.5rem', margin: '0.5rem 0', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--sidebar-text)', opacity: 0.6 }}>Pages & Navigation</p>
        <ul className="sidebar-nav">
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('cms-site'); }} className={currentView === 'cms-site' ? 'active' : ''}><CmsIcon /> <span>Nav, Footer & Pages</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('cms-editions'); }} className={currentView === 'cms-editions' ? 'active' : ''}><CmsIcon /> <span>Éditions</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('cms-form-options'); }} className={currentView === 'cms-form-options' ? 'active' : ''}><CmsIcon /> <span>Options des formulaires</span></a></li>
        </ul>
      </nav>
      
      <main className="dashboard-main-content">
        <header className="content-header">
          <h1>Tableau de Bord Administrateur</h1>
        </header>
        {renderContent()}
      </main>

      {/* NOUVEAU : On affiche la modale si elle est ouverte */}
      {isModalOpen && <DetailsModal item={selectedItem} onClose={handleCloseModal} />}
    </div>
  );
};

export default Dashboard;