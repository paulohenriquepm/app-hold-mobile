import React from 'react';
import * as Linking from 'expo-linking';

import { Container, LinkingText, LinkingIcon } from './styles';

interface LinkingProps {
  linking_text: string;
  linking_url: string;
}

const LinkingComponent = ({ linking_text, linking_url }: LinkingProps) => {
  return (
    <Container onPress={() => Linking.openURL(linking_url)}>
      <LinkingText>{linking_text}</LinkingText>
      <LinkingIcon name="external-link" />
    </Container>
  );
};

export { LinkingComponent };
