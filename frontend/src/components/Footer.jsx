import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 0 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => (
  <FooterWrapper>
    <div>
      <FooterLink href="#privacy">Privacy Policy</FooterLink>
      <FooterLink href="#terms">Terms of Service</FooterLink>
    </div>
    <p>&copy; 2025 ProjectTool. All Rights Reserved.</p>
  </FooterWrapper>
);

export default Footer;
