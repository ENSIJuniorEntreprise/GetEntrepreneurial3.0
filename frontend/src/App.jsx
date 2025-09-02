import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader'; // Votre loader principal

const Home = React.lazy(() => import('./pages/Home/Home'));
const Apropos = React.lazy(() => import('./pages/Apropos/Apropos'));
const Agenda = React.lazy(() => import('./pages/agenda/agenda'));
const Collaboration = React.lazy(() => import('./pages/Collaboration/Collaboration'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));
const Inscription = React.lazy(() => import('./pages/Inscription/Inscription'));
const Edition12 = React.lazy(() => import('./pages/edition12/edition12'));
const Edition1 = React.lazy(() => import('./pages/edition1/edition1'));
const Edition2 = React.lazy(() => import('./pages/edition2/edition2'));
const Participant = React.lazy(() => import('./pages/participant/participant'));
const Exposant = React.lazy(() => import('./pages/exposant/exposant'));


function App() {
  const [isLoadedOnce, setIsLoadedOnce] = useState(!!sessionStorage.getItem('isLoadedOnce'));

  useEffect(() => {
    if (!isLoadedOnce) {
      const timer = setTimeout(() => {
        setIsLoadedOnce(true);
        sessionStorage.setItem('isLoadedOnce', 'true');
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isLoadedOnce]);

  if (!isLoadedOnce) {
    return <Loader />;
  }
  
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Routes>
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
          <Route 
          path="/apropos" 
          element={
          <>
          <Navbar />
          <Apropos />
          <Footer />
          </>}
           />
          <Route
           path="/collaboration"
            element={
            <>
            <Navbar />
            <Collaboration />
            <Footer />
            </>}
             />
          <Route
           path="/programme"
            element={
            <><Navbar />
            <Agenda />
            <Footer />
            </>}
             />
          <Route
           path="/contact"
            element={
            <>
            <Navbar />
            <Contact />
            <Footer />
            </>} 
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
          <Route
           path="/participant" 
           element={
           <Participant />
           } 
           />
          <Route
           path="/exposant" 
           element={
           <Exposant />
           } 
           />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;