import React from 'react';
import { useForm } from 'react-hook-form';

import { Title } from '../../components/atoms/Title';
import { InputFormField } from '../../components/molecules/InputFormField';
import SignInLogo from '../../../assets/sign-in.svg';
import AppButton from '../../components/atoms/AppButton';
import GoogleButton from '../../components/atoms/GoogleButton';

import {
  Container,
  Content,
  FormContainer,
  TitleFormContainer,
  TitleFormEmailContainer,
  TitleFormPasswordContainer,
  ForgotPasswordText,
  ButtonsContainer,
  OrText,
  SignUpContainer,
  NewToAppHoldText,
  SignUpText,
} from './styles';

const SignIn = () => {
  const { control } = useForm();

  return (
    <Container>
      <Content>
        <FormContainer>
          <SignInLogo width={280} height={280} />

          <TitleFormContainer>
            <Title>Entrar</Title>
          </TitleFormContainer>

          <TitleFormEmailContainer>
            <InputFormField
              control={control}
              name="email"
              placeholder="E-mail"
              iconName="at-sign"
            />
          </TitleFormEmailContainer>
          <TitleFormPasswordContainer>
            <InputFormField
              control={control}
              name="password"
              placeholder="Senha"
              iconName="lock"
              secureTextEntry
            />
          </TitleFormPasswordContainer>

          <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>

          <ButtonsContainer>
            <AppButton title="entrar" loading={false}>
              Entrar
            </AppButton>

            <OrText>Ou</OrText>

            <GoogleButton />
          </ButtonsContainer>
        </FormContainer>

        <SignUpContainer>
          <NewToAppHoldText>Novo no App&Hold?</NewToAppHoldText>

          <SignUpText>Cadastrar</SignUpText>
        </SignUpContainer>
      </Content>
    </Container>
  );
};

export { SignIn };
