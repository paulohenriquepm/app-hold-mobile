import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SignUpLogo from '../../../assets/sign-up.svg';
import { useAuth } from '../../context/auth';
import { AppButton } from '../../components/AppButton';
import { Title } from '../../components/Title';
import { InputFormField } from '../../components/InputFormField';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';

import {
  Container,
  Content,
  LogoAndFormContainer,
  LogoContainer,
  FormContainer,
  TitleFormContainer,
  FormInputContainer,
  SignInContainer,
  AlreadyOnAppHoldText,
  SignInText,
} from './styles';

interface IFormData {
  name: string;
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('E-mail obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
  password_confirmation: Yup.string()
    .nullable()
    .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignIn = useCallback(
    async (formData: IFormData) => {
      try {
        setLoading(true);

        await signUp({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        navigation.navigate('SignIn');

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação.',
        );
      } catch (error: unknown) {
        Alert.alert(
          'Erro ao cadastrar',
          error?.response?.data?.message ||
            'Ocorreu um durante o cadastro, por favor, tente novamente.',
        );
      } finally {
        setLoading(false);
      }
    },
    [signUp, navigation],
  );

  return (
    <Container>
      <ThemeSwitcher />

      <Content>
        <LogoAndFormContainer>
          <LogoContainer>
            <SignUpLogo width={270} height={270} />
          </LogoContainer>
          <FormContainer>
            <TitleFormContainer>
              <Title>Cadastrar</Title>
            </TitleFormContainer>

            <FormInputContainer>
              <InputFormField
                control={control}
                name="name"
                placeholder="Nome"
                iconName="badge"
                error={errors.name && errors.name.message}
              />
            </FormInputContainer>
            <FormInputContainer>
              <InputFormField
                control={control}
                name="email"
                placeholder="E-mail"
                iconName="email"
                autoCapitalize="none"
                error={errors.email && errors.email.message}
              />
            </FormInputContainer>
            <FormInputContainer>
              <InputFormField
                control={control}
                name="password"
                placeholder="Senha"
                iconName="lock"
                autoCapitalize="none"
                error={errors.password && errors.password.message}
                secureTextEntry
              />
            </FormInputContainer>

            <FormInputContainer style={{ marginBottom: 24 }}>
              <InputFormField
                control={control}
                name="password_confirmation"
                placeholder="Confirmar senha"
                iconName="lock"
                autoCapitalize="none"
                error={
                  errors.password_confirmation &&
                  errors.password_confirmation.message
                }
                secureTextEntry
              />
            </FormInputContainer>

            <AppButton
              title="botão de cadastrar"
              onPress={handleSubmit(handleSignIn)}
              loading={loading}
              accessibilityLabel="botão de cadastrar"
            >
              Cadastrar
            </AppButton>
          </FormContainer>
        </LogoAndFormContainer>

        <SignInContainer>
          <AlreadyOnAppHoldText>Ja possui conta?</AlreadyOnAppHoldText>

          <SignInText onPress={() => navigation.navigate('SignIn')}>
            Entrar
          </SignInText>
        </SignInContainer>
      </Content>
    </Container>
  );
};

export { SignUp };
