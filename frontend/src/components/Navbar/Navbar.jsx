import logo from '../../assets/images/logogete.png';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Accueil');
  const [lineStyle, setLineStyle] = useState({});
  const navLinksRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (navLinksRef.current && !isMobile) {
      const activeElement = navLinksRef.current.querySelector(`[data-link-name="${activeLink}"]`);
      if (activeElement) {
        setLineStyle({
          width: activeElement.offsetWidth,
          left: activeElement.offsetLeft,
        });
      }
    }
  }, [activeLink, isMobile]);

  useEffect(() => {
    const pathToLinkName = {
      '/': 'Accueil',
      '/apropos': 'A propos',
      '/collaboration': 'Collaboration',
      '/programme': 'Programme',
      '/legacy': 'Legacy',
      '/contact': 'Contact',
      '/inscription': 'Inscription',
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 780) {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Get Entrepreneurial Logo" />
          </a>
        </div>
        
        <ul className={isMobile ? "navbar-links-mobile" : "navbar-links"} ref={navLinksRef}>
          {/* Bouton de fermeture mobile */}
          {isMobile && (
            <li className="mobile-close-btn">
              <button onClick={() => setIsMobile(false)}>
                <FaTimes />
              </button>
            </li>
          )}
          
          <li data-link-name="Accueil">
            <a href="/" onClick={() => {setActiveLink('Accueil'); setIsMobile(false);}} className={activeLink === 'Accueil' ? 'active' : ''}>Accueil</a>
          </li>
          
          <li data-link-name="A propos">
            <a href="/apropos" onClick={() => {setActiveLink('A propos'); setIsMobile(false);}} className={activeLink === 'A propos' ? 'active' : ''}>À propos</a>
          </li>

          <li data-link-name="Collaboration">
            <a href="/collaboration" onClick={() => {setActiveLink('Collaboration'); setIsMobile(false);}} className={activeLink === 'Collaboration' ? 'active' : ''}>Collaboration</a>
          </li>
          
          <li data-link-name="Programme">
            <a href="/programme" onClick={() => {setActiveLink('Programme'); setIsMobile(false);}} className={activeLink === 'Programme' ? 'active' : ''}>Programme</a>
          </li>

          {/* Version desktop avec dropdown */}
          {!isMobile && (
            <li className="dropdown" data-link-name="Legacy">
              <a href="/legacy" onClick={() => {setActiveLink('Legacy'); setIsMobile(false);}} className={activeLink === 'Legacy' ? 'active' : ''}>Legacy</a>
              <ul className="dropdown-menu">
                <li><a href="/edition1" onClick={() => setActiveLink('Legacy')}>1ère édition</a></li>
                <li><a href="/edition2" onClick={() => setActiveLink('Legacy')}>2ème édition</a></li>
              </ul>
            </li>
          )}

          {/* Version mobile avec pages séparées */}
          {isMobile && (
            <>
              <li data-link-name="Legacy">
                <a href="/legacy" onClick={() => {setActiveLink('Legacy'); setIsMobile(false);}} className={activeLink === 'Legacy' ? 'active' : ''}>Legacy</a>
              </li>
              
              <li data-link-name="Edition1">
                <a href="/edition1" onClick={() => {setActiveLink('Legacy'); setIsMobile(false);}} className={location.pathname === '/edition1' ? 'active' : ''}>1ère édition</a>
              </li>
              
              <li data-link-name="Edition2">
                <a href="/edition2" onClick={() => {setActiveLink('Legacy'); setIsMobile(false);}} className={location.pathname === '/edition2' ? 'active' : ''}>2ème édition</a>
              </li>
            </>
          )}

          <li data-link-name="Contact">
            <a href="/contact" onClick={() => {setActiveLink('Contact'); setIsMobile(false);}} className={activeLink === 'Contact' ? 'active' : ''}>Contact</a>
          </li>
          
          {/* Magic line - ne s'affiche que sur desktop et pas sur la page inscription */}
          {!isMobile && activeLink !== 'Inscription' && <div className="magic-line" style={lineStyle}></div>}
        </ul>
        
        <div className="navbar-action">
          <a href="/inscription" className={`inscription-button ${activeLink === 'Inscription' ? 'active' : ''}`} onClick={() => setActiveLink('Inscription')}>
            Inscription
          </a>
        </div>

        <button className="Nav-btn" onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <FaTimes /> : <FaBars />}
          <span style={{ fontSize: "1.5rem" }}></span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;