import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import GoogleLogo from '../../../../assets/google.svg';

import { Container, Button } from './styles';

const GoogleButton = ({ ...rest }: RectButtonProperties) => {
  return (
    <Container>
      <Button {...rest}>
        <GoogleLogo />
      </Button>
    </Container>
  );
};

export default GoogleButton;
