import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
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
  FormTokenContainer,
  InfoText,
  SignInContainer,
  RememberedPasswordText,
  SignInText,
} from './styles';

interface IRouteParams {
  email: string;
}

interface IFormData {
  token: string;
}

const schema = Yup.object().shape({
  token: Yup.string().required('O código é obrigatório'),
});

const InformResetPasswordToken = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as IRouteParams;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleResetPasswordToken = useCallback(
    async (formData: IFormData) => {
      try {
        setLoading(true);

        await api.post('/password/check-token', {
          token: formData.token,
          email: routeParams.email,
        });

        navigation.navigate('ResetPassword', {
          email: formData.email,
        });
      } catch (error: unknown) {
        Alert.alert(
          'Erro ao verificar o código',
          error?.response?.data?.message ||
            'Ocorreu um erro durante a verificação do seu código, por favor, tente novamente.',
        );
      } finally {
        setLoading(false);
      }
    },
    [routeParams, navigation],
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
              Um código de 6 dígitos foi enviado para o e-mail. Informe o código
              abaixo para continuar com a recuperação de senha.
            </InfoText>

            <FormTokenContainer>
              <InputFormField
                control={control}
                name="token"
                placeholder="Código"
                iconName="vpn-key"
                autoCapitalize="none"
                error={errors.token && errors.token.message}
              />
            </FormTokenContainer>
            <AppButton
              title="entrar"
              onPress={handleSubmit(handleResetPasswordToken)}
              loading={loading}
            >
              Enviar código
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

export { InformResetPasswordToken };
