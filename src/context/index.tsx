import React, { PropsWithChildren } from 'react';

import { AuthProvider } from './auth';
import { ThemeProvider } from './theme';

const AppProvider = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
};

export default AppProvider;
