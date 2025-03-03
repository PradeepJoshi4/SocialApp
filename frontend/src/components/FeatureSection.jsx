import React from 'react';
import styled from 'styled-components';

const FeaturesWrapper = styled.section`
  padding: 60px 20px;
  text-align: center;
  background-color: lavender;

`;

const FeaturesTitle = styled.h2`
  font-size: 36px;
  color: #333;
  margin-bottom: 40px;
`;

const FeatureList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const FeatureCard = styled.div`
  width: 300px;
  padding: 20px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const FeatureCardTitle = styled.h3`
  font-size: 24px;
  color: #333;
`;

const FeatureCardDescription = styled.p`
  font-size: 16px;
  color: #555;
`;

const FeaturesSection = () => (
  <FeaturesWrapper id="features">
    <FeaturesTitle>Key Features</FeaturesTitle>
    <FeatureList>
      <FeatureCard>
        <FeatureCardTitle>Task Management</FeatureCardTitle>
        <FeatureCardDescription>Organize tasks, track progress, and manage deadlines.</FeatureCardDescription>
      </FeatureCard>
      <FeatureCard>
        <FeatureCardTitle>Team Collaboration</FeatureCardTitle>
        <FeatureCardDescription>Collaborate seamlessly with your team on all projects.</FeatureCardDescription>
      </FeatureCard>
      <FeatureCard>
        <FeatureCardTitle>Real-time Updates</FeatureCardTitle>
        <FeatureCardDescription>Get real-time notifications and task updates across teams.</FeatureCardDescription>
      </FeatureCard>
    </FeatureList>
  </FeaturesWrapper>
);

export default FeaturesSection;
