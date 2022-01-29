import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import ForgotPasswordLogo from '../../../assets/forgot-password.svg';
import { AppButton } from '../../components/AppButton';
import { Title } from '../../components/Title';
import { InputFormField } from '../../components/InputFormField';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { api } from '../../api/api';

import {
  Container,
  Content,
  LogoAndFormContainer,
  LogoContainer,
  FormContainer,
  TitleFormContainer,
  FormEmailContainer,
  InfoText,
  SignInContainer,
  RememberedPasswordText,
  SignInText,
} from './styles';

interface IFormData {
  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('O e-mail é inválido')
    .required('O e-mail é obrigatório'),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForgotPassword = useCallback(
    async (formData: IFormData) => {
      try {
        setLoading(true);

        await api.post('/password/forgot', {
          email: formData.email,
        });

        navigation.navigate('InformResetPasswordToken', {
          email: formData.email,
        });
      } catch (error: unknown) {
        Alert.alert(
          'Erro ao enviar e-mail',
          error?.response?.data?.message ||
            'Ocorreu um erro durante o envio do e-mail, por favor, tente novamente.',
        );
      } finally {
        setLoading(false);
      }
    },
    [navigation],
  );

  return (
    <Container>
      <ThemeSwitcher />

      <Content>
        <LogoAndFormContainer>
          <LogoContainer>
            <ForgotPasswordLogo width={270} height={270} />
          </LogoContainer>
          <FormContainer>
            <TitleFormContainer>
              <Title>Recuperar senha</Title>
            </TitleFormContainer>

            <InfoText>
              Informe o seu e-mail abaixo para recuperar a sua senha.
            </InfoText>

            <FormEmailContainer>
              <InputFormField
                control={control}
                name="email"
                placeholder="E-mail"
                iconName="email"
                autoCapitalize="none"
                error={errors.email && errors.email.message}
              />
            </FormEmailContainer>
            <AppButton
              title="entrar"
              onPress={handleSubmit(handleForgotPassword)}
              loading={loading}
            >
              Enviar e-mail
            </AppButton>
          </FormContainer>
        </LogoAndFormContainer>

        <SignInContainer>
          <RememberedPasswordText>Lembrei minha senha!</RememberedPasswordText>

          <SignInText onPress={() => navigation.navigate('SignIn')}>
            Entrar
          </SignInText>
        </SignInContainer>
      </Content>
    </Container>
  );
};

export { ForgotPassword };
