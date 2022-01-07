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
  FormNewPasswordContainer,
  FormConfirmNewPasswordContainer,
  InfoText,
} from './styles';

interface IRouteParams {
  email: string;
}

interface IFormData {
  new_password: string;
  confirm_new_password: string;
}

const schema = Yup.object().shape({
  new_password: Yup.string().required('Senha obrigatória'),
  confirm_new_password: Yup.string()
    .required('Confirmação de senha obrigatória')
    .oneOf([Yup.ref('new_password'), null], 'Confirmação incorreta'),
});

const ResetPassword = () => {
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

        await api.post('/password/reset', {
          email: routeParams.email,
          password: formData.new_password,
        });

        Alert.alert(
          'Senha redefinida com sucesso!',
          'Você já pode entrar com sua nova senha :)',
        );

        navigation.navigate('SignIn');
      } catch (error: unknown) {
        Alert.alert(
          'Erro ao redefinir sua senha',
          error?.response?.data?.message ||
            'Ocorreu um erro durante a redefinição da sua senha, por favor, tente novamente.',
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

            <InfoText>Informe sua nova senha abaixo</InfoText>

            <FormNewPasswordContainer>
              <InputFormField
                control={control}
                name="new_password"
                placeholder="Nova senha"
                iconName="lock"
                autoCapitalize="none"
                error={errors.new_password && errors.new_password.message}
                secureTextEntry
              />
            </FormNewPasswordContainer>
            <FormConfirmNewPasswordContainer>
              <InputFormField
                control={control}
                name="confirm_new_password"
                placeholder="Confirmar nova senha"
                iconName="lock"
                autoCapitalize="none"
                error={
                  errors.confirm_new_password &&
                  errors.confirm_new_password.message
                }
                secureTextEntry
              />
            </FormConfirmNewPasswordContainer>

            <AppButton
              title="entrar"
              onPress={handleSubmit(handleResetPasswordToken)}
              loading={loading}
            >
              Redefinir senha
            </AppButton>
          </FormContainer>
        </LogoAndFormContainer>
      </Content>
    </Container>
  );
};

export { ResetPassword };
