import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import DelayInput from 'react-native-debounce-input';
interface ContainerProps {
  top: number;
}

export const Container = styled.View<ContainerProps>`
  position: absolute;
  width: 100%;
  top: ${({ top }) => RFValue(top)}px;
  z-index: 1;
`;

export const TextInputField = styled(DelayInput)`
  flex: 1;
  margin-right: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SearchInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${RFValue(8)}px ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.colors.buttonGreyBorderColor};
  border-radius: ${RFValue(8)}px;
`;

export const ResultsContainer = styled.View`
  max-height: ${RFValue(120)}px;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(8)}px;
  border-color: ${({ theme }) => theme.colors.buttonGreyBorderColor};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ResultsList = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {},
})``;
