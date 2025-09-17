import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './dashboard.css'; 

// --- DÉFINITIONS DES CONSTANTES ET ICÔNES (INCHANGÉ) ---
const API_URL = 'http://localhost:5000/api';
const StatsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>);
const UsersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 12a3 3 0 100-6 3 3 0 000 6z" /></svg>);
const ExposantIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H4.5A2.25 2.25 0 002.25 13.5V21M3 3h18M5.25 3v18m13.5-18v18M9 6.75h6.375a.625.625 0 01.625.625v3.75a.625.625 0 01-.625.625H9v-5z" /></svg>);
const MessageIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>);
const NewsletterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V7.125C4.5 6.504 5.004 6 5.625 6H9" /></svg>);


const Dashboard = () => {
  const [currentView, setCurrentView] = useState('stats');
  const [stats, setStats] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // MODIFIÉ : La fonction fetchData est maintenant plus intelligente
  const fetchData = useCallback(async (view) => {
    setLoading(true);
    setError('');
    
    // On définit le bon chemin d'API pour chaque vue
    let endpoint = '';
    switch (view) {
      case 'stats':
        endpoint = '/stats';
        break;
      case 'participants':
        endpoint = '/inscriptions/participants';
        break;
      case 'exposants':
        endpoint = '/inscriptions/exposants';
        break;
      case 'contacts':
        endpoint = '/contact'; // La route pour les messages est /api/contact
        break;
      case 'newsletters':
        endpoint = '/newsletter'; // La route pour la newsletter est /api/newsletter
        break;
      default:
        setError('Vue non valide');
        setLoading(false);
        return;
    }
    
    try {
      const response = await axios.get(`${API_URL}${endpoint}`);
      if (view === 'stats') {
        setStats(response.data);
      } else {
        // Vos routes renvoient un objet { success, count, data }, on prend juste data
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
    fetchData(currentView);
  }, [currentView, fetchData]);

  // --- LE RESTE DU FICHIER EST INCHANGÉ ---

  const renderStats = () => (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-card-icon icon-participants"><UsersIcon /></div>
        <div className="stat-card-info">
          <h3>Participants</h3>
          <p>{stats?.participants ?? '...'}</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-card-icon icon-exposants"><ExposantIcon /></div>
        <div className="stat-card-info">
          <h3>Exposants</h3>
          <p>{stats?.exposants ?? '...'}</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-card-icon icon-messages"><MessageIcon /></div>
        <div className="stat-card-info">
          <h3>Messages</h3>
          <p>{stats?.contacts ?? '...'}</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-card-icon icon-newsletter"><NewsletterIcon /></div>
        <div className="stat-card-info">
          <h3>Abonnés Newsletter</h3>
          <p>{stats?.newsletters ?? '...'}</p>
        </div>
      </div>
    </div>
  );

  const renderTable = () => {
    const config = {
      participants: { title: 'Liste des Participants', cols: ['Prénom', 'Nom', 'Email', 'Téléphone'], rows: data.map(i => [i.prenom, i.nom, i.email, i.telephone]) },
      exposants: { title: 'Liste des Exposants', cols: ['Entreprise', 'Contact', 'Email', 'Téléphone'], rows: data.map(i => [i.nomEntreprise, i.nomContact, i.emailContact, i.telephone]) },
      contacts: { title: 'Messages de Contact', cols: ['Nom Complet', 'Email', 'Sujet', 'Reçu le'], rows: data.map(i => [`${i.prenom} ${i.nom}`, i.email, i.sujet, new Date(i.createdAt).toLocaleDateString()]) },
      newsletters: { title: 'Inscrits à la Newsletter', cols: ["Email de l'abonné", "Date d'inscription"], rows: data.map(i => [i.email, new Date(i.createdAt).toLocaleDateString()]) },
    };
    if (!config[currentView]) return <p>Vue non reconnue.</p>;
    const { title, cols, rows } = config[currentView];

    return (
      <div className="table-container">
        <div className="table-header"><h2>{title} ({rows.length})</h2></div>
        <table className="data-table">
          <thead><tr>{cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  const renderContent = () => {
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
        <h1 className="sidebar-header">GET 3.0</h1>
        <ul className="sidebar-nav">
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('stats'); }} className={currentView === 'stats' ? 'active' : ''}><StatsIcon /> <span>Statistiques</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('participants'); }} className={currentView === 'participants' ? 'active' : ''}><UsersIcon /> <span>Participants</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('exposants'); }} className={currentView === 'exposants' ? 'active' : ''}><ExposantIcon /> <span>Exposants</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('contacts'); }} className={currentView === 'contacts' ? 'active' : ''}><MessageIcon /> <span>Messages</span></a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('newsletters'); }} className={currentView === 'newsletters' ? 'active' : ''}><NewsletterIcon /> <span>Newsletter</span></a></li>
        </ul>
      </nav>
      
      <main className="dashboard-main-content">
        <header className="content-header">
          <h1>Tableau de Bord Administrateur</h1>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;