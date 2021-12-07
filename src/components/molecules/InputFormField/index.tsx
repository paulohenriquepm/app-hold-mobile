import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Icon } from '../../atoms/Icon';

import { Container, InputText, InputContainer, ErrorText } from './styles';

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
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <InputContainer>
            {iconName && <Icon color="#565656" name={iconName} />}
            <InputText onChangeText={onChange} value={value} {...rest} />
          </InputContainer>
        )}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export { InputFormField };
