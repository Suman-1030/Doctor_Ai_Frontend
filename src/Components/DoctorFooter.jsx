import React from 'react';
import { Link } from 'react-router-dom';

const DoctorFooter = () => {
  return (
    <footer className="doctor-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Doctor.AI</h2>
          <p>Your trusted AI health assistant</p>
        </div>

        <div className="footer-links">
           <Link to={'/About'}><span>About</span></Link>
           <Link to={'/PrivacyPolicy'}><span>Privacy Policy</span></Link>
           <Link to={'/TermsOfUse'}><span>Terms of Use</span></Link>
           <Link to={'/Contact'}><span>Contact</span></Link>
          
        </div>
      </div>

      <div className="footer-disclaimer">
        &copy; {new Date().getFullYear()} Doctor.AI. This service does not provide medical advice, diagnosis, or treatment.
      </div>
    </footer>
  );
};

export default DoctorFooter;
