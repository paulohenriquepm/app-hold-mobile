import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
`;

export const InputContainer = styled.View`
  width: 100%;
  align-items: center;

  flex-direction: row;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${({ theme }) => theme.colors.secondary};
`;

export const InputText = styled(TextInput)`
  flex: 1;
  margin-left: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ErrorText = styled.Text`
  margin-top: ${RFValue(4)}px;
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.danger};
`;
