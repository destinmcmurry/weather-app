import React from 'react';

const footerStyle = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  marginBottom: '5px'
}

const Footer = props => {
  return (
    <div style={footerStyle}>
      <small>an app by destin mcmurry</small>
    </div>
  );
}

export default Footer;
