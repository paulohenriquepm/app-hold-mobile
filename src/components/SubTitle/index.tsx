import React from 'react';
import { TextProps } from 'react-native';

import { Container } from './style';

interface TitleProps extends TextProps {
  children: React.ReactNode;
}

const SubTitle = ({ children, ...rest }: TitleProps) => {
  return <Container {...rest}>{children}</Container>;
};

export { SubTitle };
