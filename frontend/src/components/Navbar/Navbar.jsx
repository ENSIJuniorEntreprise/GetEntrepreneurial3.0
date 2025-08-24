import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/images/logogete.png'; // <-- AJOUT : Importez votre logo

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Accueil');
  const [lineStyle, setLineStyle] = useState({});
  const navLinksRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

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
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        {/* ====> CORRECTION : Remplacement du "G" par une image <==== */}
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Get Entrepreneurial Logo" />
          </a>
        </div>
        
        <ul className="navbar-links" ref={navLinksRef}>
          <li data-link-name="Accueil">
            <a href="/" onClick={() => setActiveLink('Accueil')} className={activeLink === 'Accueil' ? 'active' : ''}>Accueil</a>
          </li>
          
          <li className="dropdown" data-link-name="A propos">
            <a href="/apropos" onClick={() => setActiveLink('A propos')} className={activeLink === 'A propos' ? 'active' : ''}>A propos</a>
            <ul className="dropdown-menu">
              <li><a href="/apropos">Journée 1</a></li>
              <li><a href="/apropos">Journée 2</a></li>
              <li><a href="/apropos">Journée 3</a></li>
            </ul>
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
              <li><a href="/edition1">1ère édition</a></li>
              <li><a href="/edition2">2ème édition</a></li>
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