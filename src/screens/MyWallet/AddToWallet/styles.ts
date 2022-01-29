import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.KeyboardAvoidingView`
  width: 100%;
  padding: ${RFValue(24)}px;
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${RFValue(8)}px;
`;

export const Content = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})``;

export const CloseModalButton = styled.TouchableOpacity`
  position: absolute;
  top: ${RFValue(8)}px;
  right: ${RFValue(8)}px;
  height: ${RFValue(48)}px;
  width: ${RFValue(48)}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View``;
