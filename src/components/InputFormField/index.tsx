import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import { Icon } from '../Icon';

import {
  Container,
  InputText,
  InputContainer,
  ErrorText,
  InputTextBottomLine,
} from './styles';

interface InputFormFieldProps extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
  iconName?: string;
}

const InputFormField = ({
  control,
  name,
  error,
  iconName,
  ...rest
}: InputFormFieldProps) => {
  const { colors } = useTheme();

  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <InputContainer>
            {iconName && <Icon color={colors.text} name={iconName} />}
            <InputText
              onChangeText={onChange}
              value={value}
              placeholderTextColor={colors.text}
              {...rest}
            />
            <InputTextBottomLine />
          </InputContainer>
        )}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export { InputFormField };
