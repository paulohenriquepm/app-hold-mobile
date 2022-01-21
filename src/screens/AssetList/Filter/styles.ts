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
  top: ${RFValue(8)}px;
  right: ${RFValue(8)}px;
  height: ${RFValue(48)}px;
  width: ${RFValue(48)}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  margin-bottom: ${RFValue(24)}px;
`;

export const FiltersContainer = styled.View``;

export const FilterTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  margin-bottom: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const FilterItem = styled.View`
  height: ${RFValue(48)}px;
  margin-bottom: ${RFValue(48)}px;
`;

export const PickerWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.box};
  padding: ${RFValue(4)}px;
  border-radius: ${RFValue(10)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const PickerContainer = styled(Picker)`
  background-color: ${({ theme }) => theme.colors.box};
  height: ${RFValue(40)}px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.title};
`;
