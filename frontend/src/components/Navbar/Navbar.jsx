import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/logogete.png';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Accueil');
  const [lineStyle, setLineStyle] = useState({});
  const navLinksRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (navLinksRef.current) {
      const activeElement = navLinksRef.current.querySelector(`[data-link-name="${activeLink}"]`);
      if (activeElement) {
        setLineStyle({
          width: activeElement.offsetWidth,
          left: activeElement.offsetLeft,
        });
      }
    }
  }, [activeLink]);

  useEffect(() => {
    const pathToLinkName = {
      '/': 'Accueil',
      '/apropos': 'A propos',
      '/collaboration': 'Collaboration',
      '/programme': 'Programme',
      '/legacy': 'Legacy',
      '/contact': 'Contact',
      // AJOUT : Assurer que les sous-pages de legacy activent le bon lien
      '/edition1': 'Legacy',
      '/edition2': 'Legacy',
    };
    const currentLinkName = pathToLinkName[location.pathname] || '';
    setActiveLink(currentLinkName);
  }, [location]); 


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Get Entrepreneurial Logo" />
          </a>
        </div>
        
        <ul className="navbar-links" ref={navLinksRef}>
          <li data-link-name="Accueil">
            <a href="/" onClick={() => setActiveLink('Accueil')} className={activeLink === 'Accueil' ? 'active' : ''}>Accueil</a>
          </li>
          
          {/* MODIFICATION 1 : Suppression de la classe 'dropdown' et du sous-menu pour 'A propos' */}
          <li data-link-name="A propos">
            <a href="/apropos" onClick={() => setActiveLink('A propos')} className={activeLink === 'A propos' ? 'active' : ''}>A propos</a>
          </li>

          <li data-link-name="Collaboration">
            <a href="/collaboration" onClick={() => setActiveLink('Collaboration')} className={activeLink === 'Collaboration' ? 'active' : ''}>Collaboration</a>
          </li>
          
          <li data-link-name="Programme">
            <a href="/programme" onClick={() => setActiveLink('Programme')} className={activeLink === 'Programme' ? 'active' : ''}>Programme</a>
          </li>

          <li className="dropdown" data-link-name="Legacy">
            <a href="/legacy" onClick={() => setActiveLink('Legacy')} className={activeLink === 'Legacy' ? 'active' : ''}>Legacy</a>
            <ul className="dropdown-menu">
              {/* MODIFICATION 2 : Ajout du onClick pour mettre à jour l'état */}
              <li><a href="/edition1" onClick={() => setActiveLink('Legacy')}>1ère édition</a></li>
              <li><a href="/edition2" onClick={() => setActiveLink('Legacy')}>2ème édition</a></li>
            </ul>
          </li>

          <li data-link-name="Contact">
            <a href="/contact" onClick={() => setActiveLink('Contact')} className={activeLink === 'Contact' ? 'active' : ''}>Contact</a>
          </li>
          
          <div className="magic-line" style={lineStyle}></div>
        </ul>
        
        <div className="navbar-action">
          <a href="/inscription" className="inscription-button">
            Inscription
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;