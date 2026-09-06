import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { getCached, setCached } from '../../api/contentCache';
import './participant.css';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaMapMarkerAlt, FaUserTie, FaToolbox, FaStar, FaArrowLeft } from 'react-icons/fa';

const FALLBACK_OPTIONS = {
  regions: ["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kébili", "Le Kef", "Mahdia", "La Manouba", "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"],
  statuts: ["Étudiant", "Professionnel", "Entrepreneur", "Investisseur"],
  expertises: ["Développement Web/Mobile", "IA & Data Science", "Systèmes Embarqués & IoT", "Cybersécurité", "Business & Marketing", "Design & UX/UI", "Finance & Fintech", "Agritech", "Healthtech", "EdTech", "GreenTech", "Autre"],
  experiences: ["0 - 2 ans", "3 - 5 ans", "5+ ans"],
};

const Participant = () => {
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
    partageInfos: false
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const cachedOptions = getCached('/content/form-options');
  const [options, setOptions] = useState(
    cachedOptions ? (cachedOptions.regions?.length > 0 ? { ...FALLBACK_OPTIONS, ...cachedOptions } : FALLBACK_OPTIONS) : FALLBACK_OPTIONS
  );

  useEffect(() => {
    if (getCached('/content/form-options')) return;
    let isMounted = true;
    axiosClient.get('/content/form-options')
      .then(({ data }) => {
        setCached('/content/form-options', data.data);
        if (isMounted && data.data.regions?.length > 0) {
          setOptions({ ...FALLBACK_OPTIONS, ...data.data });
        }
      })
      .catch(() => {
        // Les options restent sur le contenu de secours en cas d'échec réseau.
      });
    return () => { isMounted = false; };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData(prevState => ({
      ...prevState,
      [name]: val
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      await axiosClient.post('/inscriptions/participants', formData);

      setMessage('Votre inscription a été enregistrée avec succès ! Merci de nous rejoindre.');
      setFormData({
        prenom: '', nom: '', email: '', telephone: '', dateDeNaissance: '',
        sexe: '', region: '', statut: '', expertise: '', experience: '', partageInfos: false
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
    <div className="form-page-container participant-bg">
      <a href="/inscription" className="back-button"><FaArrowLeft /> Retour</a>

      <div className="form-wrapper">
        <h1 className="form-title">Inscription Participant</h1>
        <p className="form-subtitle">Rejoignez l'aventure Get Entrepreneurial</p>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-grid">
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
                {options.regions.map(region => <option key={region} value={region}>{region}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="statut"><FaUserTie className="form-icon" /> Statut</label>
              <select id="statut" name="statut" value={formData.statut} onChange={handleChange} required disabled={loading}>
                <option value="">Sélectionner le Statut</option>
                {options.statuts.map(statut => <option key={statut} value={statut}>{statut}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="expertise"><FaToolbox className="form-icon" /> Expertise</label>
              <select id="expertise" name="expertise" value={formData.expertise} onChange={handleChange} required disabled={loading}>
                <option value="">Sélectionner le champ d'expertise</option>
                {options.expertises.map(expertise => <option key={expertise} value={expertise}>{expertise}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="experience"><FaStar className="form-icon" /> Expérience</label>
              <select id="experience" name="experience" value={formData.experience} onChange={handleChange} required disabled={loading}>
                <option value="">Sélectionner le niveau d'expérience</option>
                {options.experiences.map(experience => <option key={experience} value={experience}>{experience}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group checkbox-group">
            <input type="checkbox" id="partageInfos" name="partageInfos" checked={formData.partageInfos} onChange={handleChange} disabled={loading} />
            <label htmlFor="partageInfos">J'accepte de partager mes informations avec les entreprises participantes.</label>
          </div>

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
