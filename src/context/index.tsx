import React, { PropsWithChildren } from 'react';

import { ThemeProvider } from './theme';

const AppProvider = ({ children }: PropsWithChildren<unknown>) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default AppProvider;
