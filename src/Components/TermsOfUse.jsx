import React from 'react';

const TermsOfUse = () => {
  const containerStyle = {
    backgroundColor: '#f9f9f9',
    color: '#333',
    padding: '20px',
    fontSize: '14px',
    borderRadius: '8px',
    marginTop: '20px',
  };

  const headingStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const paragraphStyle = {
    marginBottom: '10px',
  };

  const copyrightStyle = {
    fontSize: '12px',
    color: '#777',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Terms of Use</h2>
      <p style={paragraphStyle}>
        This AI Medical Bot is for informational purposes only and does not provide medical advice, diagnosis, or treatment. Always consult with a qualified healthcare professional before making any medical decisions.
      </p>
      <p style={paragraphStyle}>
        By using this service, you agree not to rely solely on the information provided. We are not liable for any actions taken based on this content.
      </p>
      <p style={paragraphStyle}>
        Uploaded documents (PDF, DOCX, TXT) are processed temporarily and are not stored unless explicitly permitted by the user. Please do not upload sensitive or personally identifiable health information.
      </p>
      <p style={copyrightStyle}>
        © {new Date().getFullYear()} AI Medical Bot. All rights reserved.
      </p>
    </div>
  );
};

export default TermsOfUse;
