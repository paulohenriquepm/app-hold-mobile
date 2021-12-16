import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from 'styled-components';

import { useAuth } from '../../context/auth';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { Title } from '../../components/Title';
import { InputFormField } from '../../components/InputFormField';
import { AppButton } from '../../components/AppButton';

import {
  Container,
  Content,
  Header,
  FormContainer,
  FormProfileInfoContainer,
  FormInputContainer,
  FormPasswordInfoContainer,
  ButtonsContainer,
} from './styles';
import { api } from '../../api/api';

interface IFormData {
  name: string;
  email: string;
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('E-mail obrigatório'),
  old_password: Yup.string(),
  new_password: Yup.string().when('old_password', {
    is: (val: string) => !!val.length,
    then: Yup.string().required('Campo obrigatório'),
    otherwise: Yup.string(),
  }),
  confirm_new_password: Yup.string()
    .when('old_password', {
      is: (val: string) => !!val.length,
      then: Yup.string().required('Campo obrigatório'),
      otherwise: Yup.string(),
    })
    .oneOf([Yup.ref('new_password'), null], 'Confirmação incorreta'),
});

const Profile = () => {
  const [loading, setLoading] = useState(false);

  const { user, signOut, updateUserDataStorage } = useAuth();
  const { colors } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
      email: user.email,
      old_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  });

  const handleUpdateUser = useCallback(
    async (formData: IFormData) => {
      try {
        setLoading(true);

        const response = await api.put(`/users/update/${user.id}`, formData);

        await updateUserDataStorage(response.data);

        Alert.alert('Sucesso!', 'Seus dados foram atualizados com sucesso!');
      } catch (error: unknown) {
        Alert.alert(
          'Erro ao atualizar dados',
          error?.response?.data?.message ||
            'Ocorreu um erro ao atualizar seus dados, por favor, tente novamente.',
        );
      } finally {
        setLoading(false);
      }
    },
    [updateUserDataStorage, user.id],
  );

  return (
    <Container>
      <ThemeSwitcher />

      <Header>
        <Title>Olá,</Title>
        <Title>{user.name}</Title>
      </Header>

      <Content>
        <FormContainer>
          <FormProfileInfoContainer>
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
                placeholder="Email"
                iconName="at-sign"
                autoCapitalize="none"
                error={errors.email && errors.email.message}
              />
            </FormInputContainer>
          </FormProfileInfoContainer>

          <FormPasswordInfoContainer>
            <FormInputContainer>
              <InputFormField
                control={control}
                name="old_password"
                placeholder="Senha atual"
                iconName="lock"
                autoCapitalize="none"
                error={errors.old_password && errors.old_password.message}
                secureTextEntry
              />
            </FormInputContainer>
            <FormInputContainer>
              <InputFormField
                control={control}
                name="new_password"
                placeholder="Nova senha"
                iconName="lock"
                autoCapitalize="none"
                error={errors.new_password && errors.new_password.message}
                secureTextEntry
              />
            </FormInputContainer>
            <FormInputContainer>
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
            </FormInputContainer>
          </FormPasswordInfoContainer>
        </FormContainer>

        <ButtonsContainer>
          <AppButton
            style={{ marginBottom: 8 }}
            title="atualizar"
            onPress={handleSubmit(handleUpdateUser)}
            loading={loading}
          >
            Atualizar minha conta
          </AppButton>
          <AppButton title="sair" background={colors.danger} onPress={signOut}>
            Sair do App&Hold
          </AppButton>
        </ButtonsContainer>
      </Content>
    </Container>
  );
};

export { Profile };
