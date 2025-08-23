import React, { Suspense, useState, useEffect } from 'react';
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
const Collaboration = React.lazy(() => import('./pages/collab/collab')); // En supposant un fichier collab.jsx
const Contact = React.lazy(() => import('./pages/Contact/Contact'));
const Inscription = React.lazy(() => import('./pages/Inscription/Inscription'));

// Pages Legacy
const Edition1 = React.lazy(() => import('./pages/edition1/edition1')); // En supposant un fichier edition1.jsx
const Edition2 = React.lazy(() => import('./pages/edition2/edition2')); // En supposant un fichier edition2.jsx

// Pages d'inscription spécifiques
const Participant = React.lazy(() => import('./pages/participant/participant'));
const Exposant = React.lazy(() => import('./pages/exposant/exposant'));


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Suspense fallback={<Loader />}>
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

          {/* --- Routes pour les pages principales --- */}
          <Route
            path="/a-propos"
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
            path="/legacy/edition-1"
            element={
              <>
                <Navbar />
                <Edition1 />
                <Footer />
              </>
            }
          />
          <Route
            path="/legacy/edition-2"
            element={
              <>
                <Navbar />
                <Edition2 />
                <Footer />
              </>
            }
          />

          {/* --- Routes pour les formulaires d'inscription spécifiques --- */}
          {/* Celles-ci pourraient ne pas avoir de Navbar ou de Footer si ce sont des pages focus */}
          <Route path="/inscription/participant" element={<Participant />} />
          <Route path="/inscription/exposant" element={<Exposant />} />
          

          {/* --- Route pour les pages non trouvées (404) --- */}
          <Route path="*" element={<h1>404 - Page Introuvable</h1>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;