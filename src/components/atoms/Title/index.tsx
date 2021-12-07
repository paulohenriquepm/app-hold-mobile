import React from 'react';
import { TextProps } from 'react-native';

import { Container } from './style';

interface TitleProps extends TextProps {
  children: string;
}

const Title = ({ children, ...rest }: TitleProps) => {
  return <Container {...rest}>{children}</Container>;
};

export { Title };
