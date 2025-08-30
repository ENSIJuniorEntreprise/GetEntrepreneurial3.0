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
        {/* ... (votre code existant, pas de changement ici) ... */}
        <div className="header-content">
          <h1><span className="highlight">Contact</span> Us</h1>
          <div className="subtitle-container">
            <p>Get in touch with us we're here to help and answer your questions</p>
          </div>
        </div>
      </header>

      <main className="contact-main">
        {/* ... (votre code existant, pas de changement ici) ... */}
        <div className="contact-info-container">
          <div className="contact-info-box">
            <div className="icon-container"><i className="fas fa-phone-alt"></i></div>
            <h3>Phone</h3>
            <p>Mobile: +(84) 546-6789</p>
            <p>Hotline: +(84) 456-6789</p>
          </div>
          <div className="contact-info-box">
            <div className="icon-container"><i className="fas fa-envelope"></i></div>
            <h3>Email</h3>
            <p>Mobile: +(84) 546-6789</p>
            <p>Hotline: +(84) 456-6789</p>
          </div>
          <div className="contact-info-box">
            <div className="icon-container"><i className="fas fa-map-marker-alt"></i></div>
            <h3>Address</h3>
            <p>236 5th SE Avenue, New York</p>
            <p>NY90000, United States</p>
          </div>
        </div>

        <div className="contact-form-section">
          <div className="form-text-content">
            <h2>Get In Touch With Us</h2>
            <p>We encourage you to share your requests or concerns by completing the form for further information.</p>
          </div>
          
          {/* --- FORMULAIRE CONNECTÉ --- */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" name="prenom" placeholder="First Name" value={formData.prenom} onChange={handleChange} required disabled={loading} />
              <input type="text" name="nom" placeholder="Last Name" value={formData.nom} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-row">
              <input type="email" name="email" placeholder="Email address" className="full-width" value={formData.email} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-row">
              {/* J'ai supprimé le deuxième champ "Subject" qui semblait être une erreur */}
              <input type="text" name="sujet" placeholder="Subject" className="full-width" value={formData.sujet} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-row">
              <textarea name="message" placeholder="Message..." className="full-width" value={formData.message} onChange={handleChange} required disabled={loading}></textarea>
            </div>
            <div className="form-row">
              <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Submit'}
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