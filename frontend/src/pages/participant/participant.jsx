import React, { useState } from 'react';
import axios from 'axios'; // 1. On importe axios
import './participant.css';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaMapMarkerAlt, FaUserTie, FaToolbox, FaStar, FaArrowLeft } from 'react-icons/fa';

const Participant = () => {
  // 2. On initialise l'état du formulaire avec tous les champs
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    dateDeNaissance: '',
    sexe: '',
    region: '',
    statut: '',
    expertise: '',
    experience: '',
    partageInfos: false // Pour la checkbox, la valeur initiale est 'false'
  });

  // 3. États pour le feedback utilisateur
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // 4. Fonction générique pour mettre à jour l'état du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // On gère la checkbox différemment des autres inputs
    const val = type === 'checkbox' ? checked : value;

    setFormData(prevState => ({
      ...prevState,
      [name]: val
    }));
  };

  // 5. Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      // 6. On envoie les données à l'API des participants
      await axios.post(
        'http://localhost:5000/api/inscriptions/participants',
        formData
      );

      setMessage('Votre inscription a été enregistrée avec succès ! Merci de nous rejoindre.');
      // On réinitialise le formulaire
      setFormData({
        prenom: '', nom: '', email: '', telephone: '', dateDeNaissance: '',
        sexe: '', region: '', statut: '', expertise: '', experience: '', partageInfos: false
      });

    } catch (error) {
      setIsError(true);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message); // Ex: "Un participant avec cet email est déjà inscrit."
      } else {
        setMessage("Une erreur s'est produite. Veuillez vérifier vos informations et réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  const regions = ["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kébili", "Le Kef", "Mahdia", "La Manouba", "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"];

  return (
    <div className="form-page-container participant-bg">
      <a href="/inscription" className="back-button"><FaArrowLeft /> Retour</a>
      
      <div className="form-wrapper">
        <h1 className="form-title">Inscription Participant</h1>
        <p className="form-subtitle">Rejoignez l'aventure Get Entrepreneurial</p>

        {/* --- FORMULAIRE CONNECTÉ --- */}
        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-grid">
            {/* On lie chaque input à notre état avec 'value' et 'onChange' */}
            <div className="form-group">
              <label htmlFor="prenom"><FaUser className="form-icon" /> Prénom</label>
              <input type="text" id="prenom" name="prenom" placeholder="Veuillez entrer votre prénom" value={formData.prenom} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="nom"><FaUser className="form-icon" /> Nom</label>
              <input type="text" id="nom" name="nom" placeholder="Veuillez entrer votre nom" value={formData.nom} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group full-width">
              <label htmlFor="email"><FaEnvelope className="form-icon" /> Adresse e-mail</label>
              <input type="email" id="email" name="email" placeholder="Veuillez entrer votre adresse e-mail" value={formData.email} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group full-width">
              <label htmlFor="telephone"><FaPhone className="form-icon" /> Numéro de téléphone</label>
              <input type="tel" id="telephone" name="telephone" placeholder="Veuillez entrer votre numéro de téléphone" value={formData.telephone} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="dateDeNaissance"><FaBirthdayCake className="form-icon" /> Date de naissance</label>
              <input type="date" id="dateDeNaissance" name="dateDeNaissance" value={formData.dateDeNaissance} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="sexe"><FaVenusMars className="form-icon" /> Sexe</label>
              <select id="sexe" name="sexe" value={formData.sexe} onChange={handleChange} required disabled={loading}>
                <option value="">Sélectionner le Sexe</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="region"><FaMapMarkerAlt className="form-icon" /> Région</label>
              <select id="region" name="region" value={formData.region} onChange={handleChange} required disabled={loading}>
                <option value="">Sélectionner la Région</option>
                {regions.map(region => <option key={region} value={region}>{region}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="statut"><FaUserTie className="form-icon" /> Statut</label>
              <select id="statut" name="statut" value={formData.statut} onChange={handleChange} required disabled={loading}>
                <option value="">Sélectionner le Statut</option>
                <option value="Étudiant">Étudiant</option>
                <option value="Professionnel">Professionnel</option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="Investisseur">Investisseur</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="expertise"><FaToolbox className="form-icon" /> Expertise</label>
              <select id="expertise" name="expertise" value={formData.expertise} onChange={handleChange} required disabled={loading}>
                <option value="">Sélectionner le champ d'expertise</option>
                <option value="Développement Web/Mobile">Développement Web/Mobile</option>
                <option value="IA & Data Science">IA & Data Science</option>
                <option value="Systèmes Embarqués & IoT">Systèmes Embarqués & IoT</option>
                <option value="Cybersécurité">Cybersécurité</option>
                <option value="Business & Marketing">Business & Marketing</option>
                <option value="Design & UX/UI">Design & UX/UI</option>
                <option value="Finance & Fintech">Finance & Fintech</option>
                <option value="Agritech">Agritech</option>
                <option value="Healthtech">Healthtech</option>
                <option value="EdTech">EdTech</option>
                <option value="GreenTech">GreenTech</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="experience"><FaStar className="form-icon" /> Expérience</label>
              <select id="experience" name="experience" value={formData.experience} onChange={handleChange} required disabled={loading}>
                <option value="">Sélectionner le niveau d'expérience</option>
                <option value="0 - 2 ans">0 - 2 ans</option>
                <option value="3 - 5 ans">3 - 5 ans</option>
                <option value="5+ ans">5+ ans</option>
              </select>
            </div>
          </div>
          <div className="form-group checkbox-group">
            {/* Notez le `checked` au lieu de `value` pour une checkbox */}
            <input type="checkbox" id="partageInfos" name="partageInfos" checked={formData.partageInfos} onChange={handleChange} disabled={loading} />
            <label htmlFor="partageInfos">J'accepte de partager mes informations avec les entreprises participantes.</label>
          </div>

          {/* 7. On affiche le message de retour */}
          {message && (
            <div className={`feedback-message ${isError ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <div className="form-group">
            <button type="submit" className="envoyer-button" disabled={loading}>
              {loading ? 'INSCRIPTION EN COURS...' : 'ENVOYER'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Participant;