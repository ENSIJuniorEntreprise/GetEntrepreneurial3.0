import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// --- Importation des Composants Statiques ---
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';

// --- Importation "Paresseuse" (Lazy Loading) de TOUTES vos Pages ---
const Home = React.lazy(() => import('./pages/Home/Home'));
const Apropos = React.lazy(() => import('./pages/Apropos/Apropos'));
const Agenda = React.lazy(() => import('./pages/agenda/agenda'));
const Collaboration = React.lazy(() => import('./pages/Collaboration/Collaboration'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));
const Inscription = React.lazy(() => import('./pages/Inscription/Inscription'));

// Pages Legacy
const Edition12 = React.lazy(() => import('./pages/edition12/edition12'));
const Edition1 = React.lazy(() => import('./pages/edition1/edition1'));
const Edition2 = React.lazy(() => import('./pages/edition2/edition2'));

// Pages d'inscription spécifiques
const Participant = React.lazy(() => import('./pages/participant/participant'));
const Exposant = React.lazy(() => import('./pages/exposant/exposant'));


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ce timer s'exécute UNE SEULE FOIS pour le loader d'introduction
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Durée du loader d'introduction
    return () => clearTimeout(timer);
  }, []);

  // Si le chargement d'introduction est en cours, on affiche UNIQUEMENT le loader principal
  if (isLoading) {
    return <Loader />;
  }

  // Une fois le chargement d'introduction terminé, on affiche le site
  return (
    <Router>
      {/* 
        Le composant <Suspense> a été retiré. 
        Le lazy loading fonctionne toujours, mais sans indicateur de chargement.
      */}
      <Routes>
        {/* --- Route pour la page d'accueil --- */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        {/* --- Routes pour les pages principales ---- */}
        <Route
          path="/apropos"
          element={
            <>
              <Navbar />
              <Apropos />
              <Footer />
            </>
          }
        />
        <Route
          path="/collaboration"
          element={
            <>
              <Navbar />
              <Collaboration />
              <Footer />
            </>
          }
        />
        <Route
          path="/programme"
          element={
            <>
              <Navbar />
              <Agenda />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/inscription"
          element={
            <>
              <Navbar />
              <Inscription />
              <Footer />
            </>
          }
        />

        {/* --- Routes pour les pages "Legacy" --- */}
        <Route
          path="/edition1"
          element={
            <>
              <Navbar />
              <Edition1 />
              <Footer />
            </>
          }
        />
        <Route
          path="/edition2"
          element={
            <>
              <Navbar />
              <Edition2 />
              <Footer />
            </>
          }
        />
        <Route
          path="/legacy"
          element={
            <>
              <Navbar />
              <Edition12 />
              <Footer />
            </>
          }
        />

        {/* --- Routes pour les formulaires d'inscription spécifiques --- */}
        <Route path="/participant" element={<Participant />} />
        <Route path="/exposant" element={<Exposant />} />
        
        {/* --- Route pour les pages non trouvées (404) --- */}
        <Route path="*" element={<h1>404 - Page Introuvable</h1>} />
      </Routes>
    </Router>
  );
}

export default App;