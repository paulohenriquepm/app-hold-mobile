import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  min-height: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  position: relative;
`;

export const InputContainer = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;

  flex-direction: row;
  position: relative;
`;

export const InputText = styled(TextInput)`
  flex: 1;
  margin-left: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
`;

export const InputTextBottomLine = styled.View`
  height: 1px;
  width: 100%;
  position: absolute;
  bottom: ${RFValue(10)}px;
  background-color: ${({ theme }) => theme.colors.buttonGreyBorderColor};
`;

export const ErrorText = styled.Text`
  font-size: ${RFValue(10)}px;
  position: absolute;
  bottom: -${RFValue(5)}px;
  color: ${({ theme }) => theme.colors.danger};
`;
