import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Picker } from '@react-native-picker/picker';

export const Container = styled.View`
  height: 95%;
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

export const Header = styled.View`
  margin-bottom: ${RFValue(24)}px;
`;

export const SortOptionsContainer = styled.View``;

export const SortTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  margin-bottom: ${RFValue(8)}px;
`;

export const SortItem = styled.View``;

export const PickerWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${RFValue(4)}px;
  border-radius: ${RFValue(10)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const PickerContainer = styled(Picker)`
  background-color: ${({ theme }) => theme.colors.secondary};
  height: ${RFValue(40)}px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.title};
`;

export const OrderDirectionsContainer = styled.View`
  flex-direction: row;
`;

export const OrderDirectionItem = styled.TouchableOpacity`
  flex-direction: row;
  margin-right: ${RFValue(32)}px;
`;

export const OrderDirectionItemTextContainer = styled.View`
  flex-direction: row;
`;

export const OrderDirectionItemText = styled.Text`
  margin: 0 ${RFValue(4)}px;
`;
