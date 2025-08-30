import React, { useState } from 'react';
import axios from 'axios'; // 1. On importe axios
import './exposant.css';
import { FaBuilding, FaBullhorn, FaUser, FaEnvelope, FaPhone, FaLink, FaArrowLeft, FaSitemap } from 'react-icons/fa';

const Exposant = () => {
  // 2. On s'assure que les clés de l'état correspondent aux modèles Mongoose
  const [formData, setFormData] = useState({
    nomEntreprise: '',
    secteurActivite: '', // Doit correspondre à 'secteurActivite' dans le modèle
    typeOrganisation: '',
    nomContact: '',
    emailContact: '',
    telephone: '', // Doit correspondre à 'telephone' dans le modèle
    siteWeb: '',
    description: '',
    accepteTermes: false, // Doit correspondre à 'accepteTermes' dans le modèle
  });

  // 3. États pour le feedback utilisateur
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 4. Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      // 5. On envoie les données à l'API des exposants
      await axios.post(
        'http://localhost:5000/api/inscriptions/exposants',
        formData
      );

      setMessage('Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.');
      // On réinitialise le formulaire
      setFormData({
        nomEntreprise: '', secteurActivite: '', typeOrganisation: '', nomContact: '', 
        emailContact: '', telephone: '', siteWeb: '', description: '', accepteTermes: false
      });

    } catch (error) {
      setIsError(true);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Une erreur s'est produite. Veuillez vérifier vos informations et réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page-container exposant-bg">
      <a href="/inscription" className="back-button"><FaArrowLeft /> Retour</a>
      
      <div className="form-wrapper">
        <h1 className="form-title">Devenir Exposant</h1>
        <p className="form-subtitle">Présentez votre innovation à un public qualifié</p>

        {/* --- FORMULAIRE CONNECTÉ --- */}
        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-grid">
            {/* On lie tous les inputs et on corrige les attributs 'name' pour correspondre au backend */}
            <div className="form-group">
              <label htmlFor="nomEntreprise"><FaBuilding className="form-icon" /> Nom </label>
              <input type="text" id="nomEntreprise" name="nomEntreprise" placeholder="Veuillez entrer le nom de l'entreprise" value={formData.nomEntreprise} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="secteurActivite"><FaBullhorn className="form-icon" /> Secteur d'activité</label>
              <input type="text" id="secteurActivite" name="secteurActivite" placeholder="Ex: Fintech, Healthtech, IA..." value={formData.secteurActivite} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="typeOrganisation"><FaSitemap className="form-icon" /> Type d'organisation</label>
              <select id="typeOrganisation" name="typeOrganisation" value={formData.typeOrganisation} onChange={handleChange} required disabled={loading}>
                <option value="">Sélectionner le type</option>
                <option value="Entreprise">Entreprise</option>
                <option value="Startup / Entrepreneur">Startup / Entrepreneur</option>
                <option value="Association / ONG">Association / ONG</option>
                <option value="Institution publique">Institution publique</option>
                <option value="Université">Université</option>
                <option value="Artiste / Créateur / Artisan">Artiste / Créateur / Artisan</option>
                <option value="Partenaire / Sponsor">Partenaire / Sponsor</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="nomContact"><FaUser className="form-icon" /> Nom du contact</label>
              <input type="text" id="nomContact" name="nomContact" placeholder="Prénom et Nom" value={formData.nomContact} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="emailContact"><FaEnvelope className="form-icon" /> Adresse e-mail</label>
              <input type="email" id="emailContact" name="emailContact" placeholder="Adresse e-mail professionnelle" value={formData.emailContact} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="telephone"><FaPhone className="form-icon" /> Numéro de téléphone</label>
              <input type="tel" id="telephone" name="telephone" placeholder="Numéro de téléphone" value={formData.telephone} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group full-width">
              <label htmlFor="siteWeb"><FaLink className="form-icon" /> Site web (optionnel)</label>
              <input type="url" id="siteWeb" name="siteWeb" placeholder="https://www.monentreprise.com" value={formData.siteWeb} onChange={handleChange} disabled={loading} />
            </div>
            <div className="form-group full-width">
               <label htmlFor="description">Description</label>
               <textarea id="description" name="description" placeholder="Décrivez brièvement votre activité et vos innovations..." rows="4" value={formData.description} onChange={handleChange} required disabled={loading}></textarea>
            </div>
          </div>
          <div className="form-group checkbox-group">
            <input type="checkbox" id="accepteTermes" name="accepteTermes" checked={formData.accepteTermes} onChange={handleChange} required disabled={loading} />
            <label htmlFor="accepteTermes">J'ai lu et j'accepte les termes et conditions pour les exposants.</label>
          </div>

          {/* 6. On affiche le message de retour */}
          {message && (
            <div className={`feedback-message ${isError ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <div className="form-group">
            <button type="submit" className="envoyer-button" disabled={loading}>
              {loading ? 'ENVOI EN COURS...' : 'ENVOYER LA DEMANDE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Exposant;