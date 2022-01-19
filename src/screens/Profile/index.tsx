import React, { useState, useCallback } from 'react';
import { Alert, RefreshControl } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from 'styled-components';

import { useAuth } from '../../context/auth';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { Title } from '../../components/Title';
import { InputFormField } from '../../components/InputFormField';
import { AppButton } from '../../components/AppButton';
import { api } from '../../api/api';
import { waitPromise } from '../../utils/waitPromise';

import {
  Container,
  Content,
  Header,
  FormContainer,
  FormProfileInfoContainer,
  FormInputContainer,
  FormPasswordInfoContainer,
  ButtonsContainer,
  DeleteAccountButton,
} from './styles';

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
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    waitPromise(1000).then(() => setRefreshing(false));
  }, []);

  const handleUpdateUser = useCallback(
    async (formData: IFormData) => {
      try {
        setLoading(true);

        const response = await api.put(`/users/${user.id}`, formData);

        await updateUserDataStorage(response.data);
        onRefresh();

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
    [updateUserDataStorage, user.id, onRefresh],
  );

  const handleDeleteAccount = useCallback(async () => {
    try {
      await api.delete(`/users/${user.id}`);

      Alert.alert('Sucesso', 'Seus dados foram excluidos com sucesso.');

      signOut();
    } catch (error: unknown) {
      Alert.alert(
        'Erro ao excluir sua conta',
        error?.response?.data?.message ||
          'Ocorreu um erro ao excluir seus dados, por favor, tente novamente.',
      );
    }
  }, [user.id, signOut]);

  const handleOpenDeleteAccountAlertDialong = useCallback(() => {
    Alert.alert(
      'Atenção!',
      'Deseja realmente excluir sua conta? Todos os dados serão excluídos e não poderão ser recuperados.',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim, excluir minha conta',
          onPress: handleDeleteAccount,
        },
      ],
    );
  }, [handleDeleteAccount]);

  return (
    <Container>
      <ThemeSwitcher />

      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header>
          <Title>Olá,</Title>
          <Title>{user.name}</Title>
        </Header>

        <FormContainer>
          <FormProfileInfoContainer>
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
                placeholder="Email"
                iconName="email"
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
            title="atualizar minha conta"
            onPress={handleSubmit(handleUpdateUser)}
            loading={loading}
          >
            Atualizar minha conta
          </AppButton>
          <AppButton title="sair" background={colors.danger} onPress={signOut}>
            Sair do App&Hold
          </AppButton>

          <DeleteAccountButton
            title="excluir minha conta"
            background={colors.danger}
            onPress={handleOpenDeleteAccountAlertDialong}
          >
            Excluir minha conta
          </DeleteAccountButton>
        </ButtonsContainer>
      </Content>
    </Container>
  );
};

export { Profile };
