import React, { useState } from 'react';
import axios from 'axios';
import './Footer.css';
import logo from '../../assets/images/log.png';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
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
              <p>22 October 2025</p>
              <p>UTICA, Tunis</p>
              <p>Cité Elkhadhra</p>
            </div>
          </div>
          <div className="footerlinks">
            <div className="footercolumn">
              <h3>Navigation</h3>
              <ul>
                <li><a href="/apropos">A propos</a></li>
                <li><a href="/">Accueil</a></li>
                <li><a href="/programme">Programme</a></li>
                <li><a href="/collaboration">Collaboration</a></li>
              </ul>
            </div>
            <div className="footercolumn">
              <h3>Legacy</h3>
              <ul>
                <li><a href="/edition1">1ère édition</a></li>
                <li><a href="/edition2">2ème édition</a></li>
              </ul>
            </div>
            <div className="footercolumn">
              <h3>Contact</h3>
              <ul>
                <li><p>+216 94 30 50 94</p></li>
                <li><a href="mailto:ensi-juniorEntreprise@gmail.tn">commercial.ensi.junior@gmail.com</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footermiddle">
          <div className="footernewsletter">
            {/* --- MODIFICATION ICI --- */}
            <p>Rejoignez notre communauté pour ne rien manquer de nos actualités</p>
            <form onSubmit={handleSubscribe} className="newsletterform">
              <input
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              {/* --- MODIFICATION ICI --- */}
              <button type="submit" disabled={loading}>
                {loading ? 'Envoi...' : "S'abonner"}
              </button>
            </form>

            {message && <p className="footer-message">{message}</p>}
          </div>
          <div className="footersocial">
            <p>Suivez-nous</p>
            <div className="socialicons">
              <a href="https://www.facebook.com/ENSI.Junior.Entreprise" target="_blank" rel="noopener noreferrer" aria-label="Facebook" ><FaFacebookF /></a>
              <a href="https://www.instagram.com/ensijunior" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.linkedin.com/company/ensi-junior-entreprise/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://www.youtube.com/@ENSIJuniorEntreprise" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
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