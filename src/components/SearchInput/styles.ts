import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import DelayInput from 'react-native-debounce-input';

export const TextInputField = styled(DelayInput)`
  flex: 1;
  margin-right: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
`;

export const SearchInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${RFValue(48)}px;

  padding: 0 ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.colors.box};
  border-radius: ${RFValue(8)}px;
`;
