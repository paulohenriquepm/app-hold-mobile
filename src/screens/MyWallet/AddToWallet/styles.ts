import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  height: 50%;
  width: 100%;
  padding: ${RFValue(24)}px;

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
  top: ${RFValue(16)}px;
  right: ${RFValue(16)}px;
`;

export const Header = styled.View``;
