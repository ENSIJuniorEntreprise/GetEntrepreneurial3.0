import React, { useState } from 'react';
import axios from 'axios'; // 1. On importe axios
import './Contact.css';

const Contact = () => {
  // 2. On utilise 'useState' pour gérer l'état de TOUS les champs du formulaire
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  // États pour la gestion des retours utilisateur (feedback)
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false); // Pour styliser le message (rouge si erreur)

  // 3. Une fonction générique pour mettre à jour l'état du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 4. La fonction qui sera appelée à la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage('');
    setIsError(false);

    try {
      // 5. On envoie les données du formulaire à notre API de contact
      const response = await axios.post(
        'http://localhost:5000/api/contact',
        formData // L'objet formData contient déjà toutes nos données
      );

      // 6. En cas de succès
      setFeedbackMessage(response.data.message || 'Message envoyé avec succès !');
      // On réinitialise le formulaire
      setFormData({
        prenom: '',
        nom: '',
        email: '',
        sujet: '',
        message: ''
      });

    } catch (error) {
      // 7. En cas d'erreur
      setIsError(true);
      if (error.response && error.response.data && error.response.data.message) {
        setFeedbackMessage(error.response.data.message);
      } else {
        setFeedbackMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="background-overlay"></div>
      <header className="contact-header">
        <div className="header-content">
          <h1><span className="highlight">Contactez</span> Nous</h1>
          <div className="subtitle-container">
            <p>Contactez-nous, nous sommes là pour vous aider et répondre à vos questions.</p>
          </div>
        </div>
      </header>

      <main className="contact-main">
        <div className="contact-info-container">
          <div className="contact-info-box">
            <div className="icon-container"><i className="fas fa-phone-alt"></i></div>
            <h3>Phone</h3>
            <p>Mobile: +(216) 25 540 762 </p>
            <p>Mobile: +(216) 94 305 094</p>
            <p>Mobile: +(216) 93 071 049 </p>
          </div>
          <div className="contact-info-box">
            <div className="icon-container"><i className="fas fa-envelope"></i></div>
            <h3>Email</h3>
            <p>contact.junior.ensi@gmail.com</p>
            <p>commercial.ensi.junior@gmail.com</p>
          </div>
          <div className="contact-info-box">
            <div className="icon-container"><i className="fas fa-map-marker-alt"></i></div>
            <h3>Address</h3>
            <p>Campus Universitaire، ENSI, Manouba 2010</p>
          </div>
        </div>

        <div className="contact-form-section">
          <div className="form-text-content">
            <h2>Prenez contact avec nous</h2>
            <p>Nous vous encourageons à partager vos demandes ou préoccupations en remplissant le formulaire afin d’obtenir de plus amples informations.</p>
          </div>
          
          {/* --- FORMULAIRE CONNECTÉ --- */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required disabled={loading} />
              <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-row">
              <input type="email" name="email" placeholder="Adresse e-mail" className="full-width" value={formData.email} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-row">
              {/* J'ai supprimé le deuxième champ "Subject" qui semblait être une erreur */}
              <input type="text" name="sujet" placeholder="Sujet" className="full-width" value={formData.sujet} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-row">
              <textarea name="message" placeholder="Message..." className="full-width" value={formData.message} onChange={handleChange} required disabled={loading}></textarea>
            </div>
            <div className="form-row">
              <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Envoyer'}
              </button>
            </div>
          </form>

          {/* 8. On affiche le message de retour */}
          {feedbackMessage && (
            <p className={`feedback-message ${isError ? 'error' : 'success'}`}>
              {feedbackMessage}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Contact;