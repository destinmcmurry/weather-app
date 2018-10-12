import React from 'react';

const footerStyle = {
  textAlign: 'center',
  zIndex: '5',
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundColor: 'white',
  padding: '7px 0',
  boxShadow: '0px -2px 10px -5px rgba(0,0,0,1)',
  borderRadius: '5px 5px 0 0'
}

const logoStyle = {
  height: '20px',
  width: '20px',
  opacity: '.7'
}

const Footer = props => {
  return (
    <div style={footerStyle}>
      <a href='https://github.com/destinmcmurry' target='blank'><img style={logoStyle} src='https://image.flaticon.com/icons/svg/25/25231.svg' alt='github'/></a>
    </div>
  );
}

export default Footer;
