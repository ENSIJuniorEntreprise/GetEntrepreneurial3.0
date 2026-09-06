import logo from '../../assets/images/logogete.png';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { getCached, setCached } from '../../api/contentCache';
import './Navbar.css';
import { FaBars, FaTimes } from "react-icons/fa";

const FALLBACK_EDITIONS = [
  { slug: 'edition1', editionLabel: '1ère édition' },
  { slug: 'edition2', editionLabel: '2ème édition' },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Accueil');
  const [lineStyle, setLineStyle] = useState({});
  const navLinksRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cachedEditions = getCached('/content/editions');
  const cachedSite = getCached('/content/site');
  const [editions, setEditions] = useState(
    cachedEditions ? (cachedEditions.length > 0 ? cachedEditions : FALLBACK_EDITIONS) : FALLBACK_EDITIONS
  );
  const [extraLinks, setExtraLinks] = useState(cachedSite ? (cachedSite.navLinks || []) : []);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    if (!getCached('/content/editions')) {
      axiosClient.get('/content/editions')
        .then(({ data }) => {
          setCached('/content/editions', data.data);
          if (isMounted && data.data.length > 0) setEditions(data.data);
        })
        .catch(() => {});
    }
    if (!getCached('/content/site')) {
      axiosClient.get('/content/site')
        .then(({ data }) => {
          setCached('/content/site', data.data);
          if (isMounted && data.data.navLinks?.length > 0) setExtraLinks(data.data.navLinks);
        })
        .catch(() => {});
    }
    return () => { isMounted = false; };
  }, []);

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
    if (location.pathname === '/legacy' || location.pathname.startsWith('/editions/') || location.pathname.startsWith('/edition')) {
      setActiveLink('Legacy');
      return;
    }
    const pathToLinkName = {
      '/': 'Accueil',
      '/apropos': 'A propos',
      '/collaboration': 'Collaboration',
      '/programme': 'Programme',
      '/contact': 'Contact',
      '/inscription': 'Inscription',
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
                {editions.map((ed) => (
                  <li key={ed.slug}><a href={`/editions/${ed.slug}`} onClick={() => setActiveLink('Legacy')}>{ed.editionLabel}</a></li>
                ))}
              </ul>
            </li>
          )}

          {/* Version mobile avec pages séparées */}
          {isMobile && (
            <>
              <li data-link-name="Legacy">
                <a href="/legacy" onClick={() => {setActiveLink('Legacy'); setIsMobile(false);}} className={activeLink === 'Legacy' ? 'active' : ''}>Legacy</a>
              </li>

              {editions.map((ed) => (
                <li key={ed.slug} data-link-name={ed.slug}>
                  <a href={`/editions/${ed.slug}`} onClick={() => {setActiveLink('Legacy'); setIsMobile(false);}} className={location.pathname === `/editions/${ed.slug}` ? 'active' : ''}>{ed.editionLabel}</a>
                </li>
              ))}
            </>
          )}

          {extraLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setIsMobile(false)}>{link.label}</a>
            </li>
          ))}

          <li data-link-name="Contact">
            <a href="/contact" onClick={() => {setActiveLink('Contact'); setIsMobile(false);}} className={activeLink === 'Contact' ? 'active' : ''}>Contact</a>
          </li>

          {/* Lien Inscription pour la version mobile */}
          {isMobile && (
            <li data-link-name="Inscription">
              <a href="/inscription" onClick={() => {setActiveLink('Inscription'); setIsMobile(false);}} className={activeLink === 'Inscription' ? 'active' : ''}>Inscription</a>
            </li>
          )}
          
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