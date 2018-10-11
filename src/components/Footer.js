import React from 'react';

const footerStyle = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  marginBottom: '5px'
}

const logoStyle = {
  height: '20px',
  width: '20px',
  padding: '0 5px 15px 5px'
}

const Footer = props => {
  return (
    <div style={footerStyle}>
    <a href='https://github.com/destinmcmurry' target='blank'><img style={logoStyle} src='https://image.flaticon.com/icons/svg/25/25231.svg' alt='github'/></a>
    </div>
  );
}

export default Footer;
