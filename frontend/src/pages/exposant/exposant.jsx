import React, { useState } from 'react';
import './exposant.css';
// --- AJOUT : Nouvelle icône pour le type d'organisation ---
import { FaBuilding, FaBullhorn, FaUser, FaEnvelope, FaPhone, FaLink, FaArrowLeft, FaSitemap } from 'react-icons/fa';

const Exposant = () => {
  const [formData, setFormData] = useState({
    nomEntreprise: '',
    secteur: '',
    typeOrganisation: '', // <-- AJOUT : Nouvel état pour le type d'organisation
    nomContact: '',
    emailContact: '',
    telephoneContact: '',
    siteWeb: '',
    description: '',
    accepteConditions: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données de l\'exposant:', formData);
  };

  return (
    <div className="form-page-container exposant-bg">
      <a href="/inscription" className="back-button"><FaArrowLeft /> Retour</a>
      
      <div className="form-wrapper">
        <h1 className="form-title">Devenir Exposant</h1>
        <p className="form-subtitle">Présentez votre innovation à un public qualifié</p>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-grid">
            {/* Nom de l'entreprise */}
            <div className="form-group">
              <label htmlFor="nomEntreprise"><FaBuilding className="form-icon" /> Nom </label>
              <input type="text" id="nomEntreprise" name="nomEntreprise" placeholder="Veuillez entrer le nom de l'entreprise" onChange={handleChange} required />
            </div>

            {/* Secteur d'activité */}
            <div className="form-group">
              <label htmlFor="secteur"><FaBullhorn className="form-icon" /> Secteur d'activité</label>
              <input type="text" id="secteur" name="secteur" placeholder="Ex: Fintech, Healthtech, IA..." onChange={handleChange} required />
            </div>

            {/* ====> NOUVEAU CHAMP AJOUTÉ ICI <==== */}
            <div className="form-group">
              <label htmlFor="typeOrganisation"><FaSitemap className="form-icon" /> Type d'organisation</label>
              <select id="typeOrganisation" name="typeOrganisation" onChange={handleChange} required>
                <option value="">Sélectionner le type</option>
                <option value="entreprise">Entreprises</option>
                <option value="startup">Startups / Entrepreneurs</option>
                <option value="association">Associations / ONG</option>
                <option value="institution">Institutions publiques</option>
                <option value="universite">Universités</option>
                <option value="artiste">Artistes / Créateurs / Artisans</option>
                <option value="partenaire">Partenaires / Sponsors</option>
              </select>
            </div>

            {/* Nom du contact */}
            <div className="form-group">
              <label htmlFor="nomContact"><FaUser className="form-icon" /> Nom du contact</label>
              <input type="text" id="nomContact" name="nomContact" placeholder="Prénom et Nom" onChange={handleChange} required />
            </div>

            {/* Email de contact */}
            <div className="form-group">
              <label htmlFor="emailContact"><FaEnvelope className="form-icon" /> Adresse e-mail</label>
              <input type="email" id="emailContact" name="emailContact" placeholder="Adresse e-mail professionnelle" onChange={handleChange} required />
            </div>
            
            {/* Téléphone de contact */}
            <div className="form-group">
              <label htmlFor="telephoneContact"><FaPhone className="form-icon" /> Numéro de téléphone</label>
              <input type="tel" id="telephoneContact" name="telephoneContact" placeholder="Numéro de téléphone" onChange={handleChange} required />
            </div>
            
            {/* Site web */}
            <div className="form-group full-width">
              <label htmlFor="siteWeb"><FaLink className="form-icon" /> Site web (optionnel)</label>
              <input type="url" id="siteWeb" name="siteWeb" placeholder="https://www.monentreprise.com" onChange={handleChange} />
            </div>
            
            <div className="form-group full-width">
               <label htmlFor="description">Description</label>
               <textarea id="description" name="description" placeholder="Décrivez brièvement votre activité et vos innovations..." rows="4" onChange={handleChange} required></textarea>
            </div>
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="accepteConditions" name="accepteConditions" checked={formData.accepteConditions} onChange={handleChange} required />
            <label htmlFor="accepteConditions">J'ai lu et j'accepte les termes et conditions pour les exposants.</label>
          </div>

          <div className="form-group">
            <button type="submit" className="envoyer-button">ENVOYER LA DEMANDE</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Exposant;