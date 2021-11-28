import 'styled-components';
import { ThemeType } from './themes/themeType';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
