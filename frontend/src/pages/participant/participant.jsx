import React, { useState } from 'react';
import './participant.css';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaMapMarkerAlt, FaUserTie, FaToolbox, FaStar, FaArrowLeft } from 'react-icons/fa';

const Participant = () => {
  const [formData, setFormData] = useState({ /* ... */ });
  const handleChange = (e) => { /* ... */ };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données du participant:', formData);
  };

  const regions = ["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kébili", "Le Kef", "Mahdia", "La Manouba", "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"];

  return (
    <div className="form-page-container participant-bg">
      <a href="/inscription" className="back-button"><FaArrowLeft /> Retour</a>
      
      <div className="form-wrapper">
        <h1 className="form-title">Inscription Participant</h1>
        <p className="form-subtitle">Rejoignez l'aventure Get Entrepreneurial</p>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="prenom"><FaUser className="form-icon" /> Prénom</label>
              <input type="text" id="prenom" name="prenom" placeholder="Veuillez entrer votre prénom" required />
            </div>
            <div className="form-group">
              <label htmlFor="nom"><FaUser className="form-icon" /> Nom</label>
              <input type="text" id="nom" name="nom" placeholder="Veuillez entrer votre nom" required />
            </div>
            <div className="form-group full-width">
              <label htmlFor="email"><FaEnvelope className="form-icon" /> Adresse e-mail</label>
              <input type="email" id="email" name="email" placeholder="Veuillez entrer votre adresse e-mail" required />
            </div>
            <div className="form-group full-width">
              <label htmlFor="telephone"><FaPhone className="form-icon" /> Numéro de téléphone</label>
              <input type="tel" id="telephone" name="telephone" placeholder="Veuillez entrer votre numéro de téléphone" required />
            </div>
            <div className="form-group">
              <label htmlFor="dateNaissance"><FaBirthdayCake className="form-icon" /> Date de naissance</label>
              <input type="date" id="dateNaissance" name="dateNaissance" required />
            </div>
            <div className="form-group">
              <label htmlFor="sexe"><FaVenusMars className="form-icon" /> Sexe</label>
              <select id="sexe" name="sexe" required>
                <option value="">Sélectionner le Sexe</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="region"><FaMapMarkerAlt className="form-icon" /> Région</label>
              <select id="region" name="region" required>
                <option value="">Sélectionner la Région</option>
                {regions.map(region => <option key={region} value={region}>{region}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="statut"><FaUserTie className="form-icon" /> Statut</label>
              <select id="statut" name="statut" required>
                <option value="">Sélectionner le Statut</option>
                <option value="etudiant">Étudiant</option>
                <option value="professionnel">Professionnel</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="investisseur">Investisseur</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="expertise"><FaToolbox className="form-icon" /> Expertise</label>
              {/* ====> CORRECTION : Liste d'expertise enrichie <==== */}
              <select id="expertise" name="expertise" required>
                <option value="">Sélectionner le champ d'expertise</option>
                <option value="developpement-web">Développement Web/Mobile</option>
                <option value="ia-datascience">IA & Data Science</option>
                <option value="systemes-embarques">Systèmes Embarqués & IoT</option>
                <option value="cybersecurite">Cybersécurité</option>
                <option value="business-marketing">Business & Marketing</option>
                <option value="design-uxui">Design & UX/UI</option>
                <option value="finance-fintech">Finance & Fintech</option>
                <option value="agritech">Agritech</option>
                <option value="healthtech">Healthtech</option>
                <option value="edtech">EdTech</option>
                <option value="greentech">GreenTech</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="experience"><FaStar className="form-icon" /> Expérience</label>
              <select id="experience" name="experience" required>
                <option value="">Sélectionner le niveau d'expérience</option>
                <option value="0-2">0 - 2 ans</option>
                <option value="3-5">3 - 5 ans</option>
                <option value="5+">5+ ans</option>
              </select>
            </div>
          </div>
          <div className="form-group checkbox-group">
            <input type="checkbox" id="acceptePartage" name="acceptePartage" />
            <label htmlFor="acceptePartage">J'accepte de partager mes informations avec les entreprises participantes.</label>
          </div>
          <div className="form-group">
            <button type="submit" className="envoyer-button">ENVOYER</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Participant;