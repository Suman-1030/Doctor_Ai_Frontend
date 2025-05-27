import React from 'react';

const Contact = () => {
  const containerStyle = {
    backgroundColor: '#f1f1f1',
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

  const infoStyle = {
    marginBottom: '8px',
  };

  const linkStyle = {
    color: '#007BFF',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Contact Us</h2>
      <p style={infoStyle}>Have questions or feedback? We'd love to hear from you.</p>
      <p style={infoStyle}>
        📧 Email: <a href="mailto:support@doctorai.com" style={linkStyle}>support@aimedbot.com</a>
      </p>
      <p style={infoStyle}>
        🌐 Website: <a href="https://www.doctorai.com" style={linkStyle} target="_blank" rel="noopener noreferrer">www.aimedbot.com</a>
      </p>
      <p style={infoStyle}>
        🕑 Support Hours: Monday – Friday, 9:00 AM – 5:00 PM
      </p>
    </div>
  );
};

export default Contact;
