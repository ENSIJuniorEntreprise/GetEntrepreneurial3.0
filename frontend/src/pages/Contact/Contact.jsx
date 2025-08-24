import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <div className="header-content">
          <h1>
            <span className="highlight">Contact</span> Us
          </h1>
          {/* Wrapper ajouté pour faciliter le style des lignes */}
          <div className="subtitle-container">
            <p>Get in touch with us we're here to help and answer your questions</p>
          </div>
        </div>
      </header>

      <main className="contact-main">
        <div className="contact-info-container">
          <div className="contact-info-box">
            <div className="icon-container">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3>Phone</h3>
            <p>Mobile: +(84) 546-6789</p>
            <p>Hotline: +(84) 456-6789</p>
          </div>
          <div className="contact-info-box">
            <div className="icon-container">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email</h3>
            <p>Mobile: +(84) 546-6789</p>
            <p>Hotline: +(84) 456-6789</p>
          </div>
          <div className="contact-info-box">
            <div className="icon-container">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Address</h3>
            <p>236 5th SE Avenue, New York</p>
            <p>NY90000, United States</p>
          </div>
        </div>

        <div className="contact-form-section">
          <div className="form-text-content">
            <h2>Get In Touch With Us</h2>
            <p>
              We encourage you to share your requests or concerns by completing the form for further information.
            </p>
          </div>
          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="form-row">
              <input type="email" placeholder="Email address" className="full-width" />
            </div>
            <div className="form-row">
              <input type="text" placeholder="Subject" />
              <input type="text" placeholder="Subject" />
            </div>
            <div className="form-row">
              <textarea placeholder="Message..." className="full-width"></textarea>
            </div>
            <div className="form-row">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Contact;