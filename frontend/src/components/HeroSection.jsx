import React from 'react';
import styled from 'styled-components';
import projectimage from "../images/projectimage.jpg";

const HeroSectionWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px 20px;
  background-color: lavender;

  text-align: left;

  /* Responsive Design */
  @media (max-width: 768px) {
    flex-direction: column; /* Stack content vertically on smaller screens */
    text-align: center;     /* Center the text for smaller screens */
  }
`;

const HeroText = styled.div`
  max-width: 600px;
  margin-bottom: 20px; /* Add margin bottom for spacing when image is below text */
`;

const HeroTitle = styled.h1`
  font-size: 38px;
  color: #333;
  margin-bottom: 20px;

  /* Responsive font size */
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeroDescription = styled.p`
  font-size: 20px;
  color: #555;
  margin-bottom: 30px;

  /* Responsive font size */
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const HeroButton = styled.a`
  padding: 12px 20px;
  font-size: 18px;
  background-color: #007BFF;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  /* Responsive button size */
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 15px;
  }
`;

const HeroImageWrapper = styled.div`
  max-width: 400px;

  /* Make image responsive */
  img {
    width: 100%;
    height: auto;
    border-radius: 10px; /* Optional, for rounded corners */
  }

  /* Responsive image container */
  @media (max-width: 768px) {
    max-width: 100%; /* Allow image to take full width on smaller screens */
    margin-top: 20px; /* Add margin when image is below text */
  }
`;

const HeroSection = () => (
  <HeroSectionWrapper>
    <HeroText>
      <HeroTitle>Manage Your Projects Efficiently</HeroTitle>
      <HeroDescription>
        Organize, track, and collaborate on your team projects with ease. Start today for free.
      </HeroDescription>
      <HeroButton href="#signup">Get Started</HeroButton>
    </HeroText>
    <HeroImageWrapper>
      <img src={projectimage} alt="Project Management" />
    </HeroImageWrapper>
  </HeroSectionWrapper>
);

export default HeroSection;
