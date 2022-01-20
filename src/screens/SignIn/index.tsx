import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SignInLogo from '../../../assets/sign-in.svg';
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
  TitleFormEmailContainer,
  TitleFormPasswordContainer,
  ForgotPasswordText,
  SignUpContainer,
  NewToAppHoldText,
  SignUpText,
} from './styles';

interface IFormData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('O e-mail é inválido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
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

        await signIn({
          email: formData.email,
          password: formData.password,
        });
      } catch (error: unknown) {
        Alert.alert(
          'Erro ao autenticar',
          error?.response?.data?.message ||
            'Ocorreu um erro durante a autenticação, por favor, cheque as credenciais e tente novamente.',
        );
      } finally {
        setLoading(false);
      }
    },
    [signIn],
  );

  return (
    <Container>
      <ThemeSwitcher />

      <Content>
        <LogoAndFormContainer>
          <LogoContainer>
            <SignInLogo width={270} height={270} />
          </LogoContainer>
          <FormContainer>
            <TitleFormContainer>
              <Title>Entrar</Title>
            </TitleFormContainer>

            <TitleFormEmailContainer>
              <InputFormField
                control={control}
                name="email"
                placeholder="E-mail"
                iconName="email"
                autoCapitalize="none"
                error={errors.email && errors.email.message}
              />
            </TitleFormEmailContainer>
            <TitleFormPasswordContainer>
              <InputFormField
                control={control}
                name="password"
                placeholder="Senha"
                iconName="lock"
                autoCapitalize="none"
                error={errors.password && errors.password.message}
                secureTextEntry
              />
            </TitleFormPasswordContainer>

            <ForgotPasswordText
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              Esqueci minha senha
            </ForgotPasswordText>

            <AppButton
              title="botão de entrar"
              onPress={handleSubmit(handleSignIn)}
              accessibilityLabel="botão de entrar"
              loading={loading}
            >
              Entrar
            </AppButton>
          </FormContainer>
        </LogoAndFormContainer>

        <SignUpContainer>
          <NewToAppHoldText>Novo no App&Hold?</NewToAppHoldText>

          <SignUpText onPress={() => navigation.navigate('SignUp')}>
            Cadastrar
          </SignUpText>
        </SignUpContainer>
      </Content>
    </Container>
  );
};

export { SignIn };
