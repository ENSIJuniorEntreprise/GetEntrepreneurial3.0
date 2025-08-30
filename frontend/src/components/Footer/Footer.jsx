import React, { useState } from 'react';
import axios from 'axios';
import './Footer.css';
import logo from '../../assets/images/logogete.png'; 
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    // Empêche le comportement par défaut du formulaire (qui est de recharger la page)
    e.preventDefault(); 
    setLoading(true);
    setMessage('');

    try {
      await axios.post(
        'http://localhost:5000/api/newsletter',
        { email: email }
      );
      setMessage('Merci, votre inscription a bien été prise en compte !');
      setEmail('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footercontainer">
      <div className="footercontent">
        <div className="footertop">
          <div className="footerinfo">
            <img src={logo} alt="Get Entrepreneurial Logo" className="footerlogo" />
            <div className="footerdetails">
              <p>22-25 October 2026</p>
              <p>UTICA, Tunis</p>
              <p>Centre Urbain Nord, 1003 Tunis</p>
            </div>
          </div>
          <div className="footerlinks">
            <div className="footercolumn">
              <h3>Navigation</h3>
              <ul>
                <li><a href="#apropos">A propos</a></li>
                <li><a href="#accueil">Accueil</a></li>
                <li><a href="#programme">Programme</a></li>
              </ul>
            </div>
            <div className="footercolumn">
              <h3>Collaboration</h3>
              <ul>
                <li><a href="#exposants">Exposants</a></li>
                <li><a href="#sponsors">Sponsors</a></li>
                <li><a href="#partners">Partners</a></li>
              </ul>
            </div>
            <div className="footercolumn">
              <h3>Legacy</h3>
              <ul>
                <li><a href="#edition1">1ère édition</a></li>
                <li><a href="#edition2">2ème édition</a></li>
              </ul>
            </div>
            <div className="footercolumn">
              <h3>Contact</h3>
              <ul>
                <li><p>29 903 814</p></li>
                <li><a href="mailto:ensi-juniorEntreprise@gmail.tn">ensi-juniorEntreprise@gmail.tn</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footermiddle">
          <div className="footernewsletter">
            <p>Join our community to receive updates</p>
            
            {/* --- BLOC JSX VÉRIFIÉ --- */}
            {/* L'attribut onSubmit sur la balise <form> appelle notre fonction */}
            <form onSubmit={handleSubscribe} className="newsletterform">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              {/* Le type="submit" est crucial pour que le bouton déclenche le onSubmit du formulaire */}
              <button type="submit" disabled={loading}>
                {loading ? 'Envoi...' : 'Subscribe'}
              </button>
            </form>

            {/* Affiche le message de retour (succès ou erreur) */}
            {message && <p className="footer-message">{message}</p>}
          </div>
          <div className="footersocial">
            <p>Follow us</p>
            <div className="socialicons">
              <a href="https://www.facebook.com/ENSI.Junior.Entreprise" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://www.instagram.com/ensijunior" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.linkedin.com/company/ensi-junior-entreprise/posts/?feedView=all" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://www.youtube.com/@ENSIJuniorEntreprise" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <div className="footerbottom">
          <div className="footerhashtag">#Forge_The_Future</div>
          <div className="footercopyright">© All rights reserved - ENSI JE 2025</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;