import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { getCached, setCached } from '../../api/contentCache';
import './Footer.css';
import logo from '../../assets/images/log.png';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaGlobe } from 'react-icons/fa';

const SOCIAL_ICONS = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
};

const FALLBACK_FOOTER = {
  columns: [
    { title: 'Navigation', links: [
      { label: 'A propos', href: '/apropos' },
      { label: 'Accueil', href: '/' },
      { label: 'Programme', href: '/programme' },
      { label: 'Collaboration', href: '/collaboration' },
    ] },
    { title: 'Legacy', links: [
      { label: '1ère édition', href: '/editions/edition1' },
      { label: '2ème édition', href: '/editions/edition2' },
    ] },
  ],
  socialLinks: [
    { platform: 'facebook', url: 'https://www.facebook.com/ENSI.Junior.Entreprise' },
    { platform: 'instagram', url: 'https://www.instagram.com/ensijunior' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/company/ensi-junior-entreprise/posts/?feedView=all' },
    { platform: 'youtube', url: 'https://www.youtube.com/@ENSIJuniorEntreprise' },
  ],
  contactPhone: '+216 94 30 50 94',
  contactEmail: 'commercial.ensi.junior@gmail.com',
  tagline: '#Forge_The_Future',
  copyrightText: '© All rights reserved - ENSI JE 2025',
};

const FALLBACK_ADDRESS_LINES = ['22 October 2025', 'UTICA, Tunis', 'Cité Elkhadhra'];

const deriveFooter = (siteContent) =>
  siteContent.footer && siteContent.footer.columns?.length > 0
    ? { ...FALLBACK_FOOTER, ...siteContent.footer }
    : FALLBACK_FOOTER;

const Footer = () => {
  const cachedSite = getCached('/content/site');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [footer, setFooter] = useState(cachedSite ? deriveFooter(cachedSite) : null);

  useEffect(() => {
    if (getCached('/content/site')) return;
    let isMounted = true;
    axiosClient.get('/content/site')
      .then(({ data }) => {
        setCached('/content/site', data.data);
        if (isMounted) setFooter(deriveFooter(data.data));
      })
      .catch(() => {
        if (isMounted) setFooter(FALLBACK_FOOTER);
      });
    return () => { isMounted = false; };
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axiosClient.post('/newsletter', { email });
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
              {FALLBACK_ADDRESS_LINES.map((line) => <p key={line}>{line}</p>)}
            </div>
          </div>
          <div className="footerlinks">
            {footer && footer.columns.map((column) => (
              <div className="footercolumn" key={column.title}>
                <h3>{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.href}><a href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            {footer && (
              <div className="footercolumn">
                <h3>Contact</h3>
                <ul>
                  <li><p>{footer.contactPhone}</p></li>
                  <li><a href={`mailto:${footer.contactEmail}`}>{footer.contactEmail}</a></li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="footermiddle">
          <div className="footernewsletter">
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
              <button type="submit" disabled={loading}>
                {loading ? 'Envoi...' : "S'abonner"}
              </button>
            </form>

            {message && <p className="footer-message">{message}</p>}
          </div>
          <div className="footersocial">
            <p>Suivez-nous</p>
            <div className="socialicons">
              {footer && footer.socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform?.toLowerCase()] || FaGlobe;
                return (
                  <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="footerbottom">
          <div className="footerhashtag">{footer?.tagline}</div>
          <div className="footercopyright">{footer?.copyrightText}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
