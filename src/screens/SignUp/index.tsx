import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SignUpLogo from '../../../assets/sign-up.svg';
import { useAuth } from '../../context/auth';
import AppButton from '../../components/atoms/AppButton';
import GoogleButton from '../../components/atoms/GoogleButton';
import { Title } from '../../components/atoms/Title';
import { InputFormField } from '../../components/molecules/InputFormField';
import { ThemeSwitcher } from '../../components/molecules/ThemeSwitcher';

import {
  Container,
  Content,
  LogoContainer,
  FormContainer,
  TitleFormContainer,
  FormInputContainer,
  OrText,
  SignInContainer,
  AlreadyOnAppHoldText,
  SignInText,
} from './styles';

interface FormData {
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
    async (formData: FormData) => {
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
          'Erro no cadastro',
          error?.response?.data?.message ||
            'Falha ao cadastrar, teste novamente.',
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
        <LogoContainer>
          <SignUpLogo width={270} height={270} />
        </LogoContainer>

        <FormContainer>
          <TitleFormContainer>
            <Title>Cadastrar</Title>
          </TitleFormContainer>

          <GoogleButton />

          <OrText>Ou</OrText>

          <FormInputContainer>
            <InputFormField
              control={control}
              name="name"
              placeholder="Nome"
              iconName="user"
              error={errors.name && errors.name.message}
            />
          </FormInputContainer>
          <FormInputContainer>
            <InputFormField
              control={control}
              name="email"
              placeholder="E-mail"
              iconName="at-sign"
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

          <FormInputContainer>
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
            title="entrar"
            onPress={handleSubmit(handleSignIn)}
            loading={loading}
          >
            Cadastrar
          </AppButton>
        </FormContainer>

        <SignInContainer>
          <AlreadyOnAppHoldText>Novo no App&Hold?</AlreadyOnAppHoldText>

          <SignInText onPress={() => navigation.navigate('SignIn')}>
            Entrar
          </SignInText>
        </SignInContainer>
      </Content>
    </Container>
  );
};

export { SignUp };
