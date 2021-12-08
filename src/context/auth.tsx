import React, {
  createContext,
  ReactNode,
  useEffect,
  useCallback,
  useContext,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../api/api';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface ISignInCredencials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  loading: boolean;
  signIn(credencials: ISignInCredencials): Promise<void>;
}

interface IAuthState {
  user: IUser;
  token: string;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@BirdsApp:token',
        '@BirdsApp:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(
    async ({ email, password }: ISignInCredencials) => {
      const response = await api.post('/sessions/signin', {
        email,
        password,
      });

      const { user, token } = response.data;

      await AsyncStorage.multiSet([
        ['@apphold:token', token],
        ['@apphold:user', JSON.stringify(user)],
      ]);

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({
        user,
        token,
      });
    },
    [],
  );

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
