import React from 'react';

export default function Footer() {
    return (
      <footer style={footerStyle}>
        <p>© 2025 Sofa za sirotinju</p>
      </footer>
    );
  }
  
  const footerStyle: React.CSSProperties = {
    padding: "10px 20px",
    textAlign: "center",
    marginTop: "20px"
  };
  