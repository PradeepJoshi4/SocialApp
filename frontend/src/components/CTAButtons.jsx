import React from 'react';
import styled from 'styled-components';

const CTAButtonsWrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
`;

const CTAButton = styled.a`
  padding: 15px 30px;
  font-size: 18px;
  background-color: #007BFF;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CTAButtons = () => (
  <CTAButtonsWrapper>
    <CTAButton href="#signup">Sign Up</CTAButton>
    <CTAButton href="#login">Log In</CTAButton>
  </CTAButtonsWrapper>
);

export default CTAButtons;
