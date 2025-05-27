import React from 'react';

const About = () => {
  const containerStyle = {
    backgroundColor: '#f9f9f9',
    color: '#333',
    padding: '20px',
    fontSize: '14px',
    borderRadius: '8px',
    marginTop: '20px',
    lineHeight: '1.6',
  };

  const headingStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>About AI Medical Bot</h2>
      <p>
        AI Medical Bot is an intelligent chatbot designed to provide accurate and easy-to-understand medical information sourced from trusted resources like MedlinePlus.
      </p>
      <p>
        It uses advanced AI technology to help users learn about diseases, symptoms, and treatments, making health information more accessible to everyone.
      </p>
      <p>
        Our mission is to empower users with reliable health knowledge while ensuring privacy and safety at all times.
      </p>
    </div>
  );
};

export default About;
