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
  id: number;
  name: string;
  email: string;
  wallet: {
    id: number;
  };
}

interface ISignInCredencials {
  email: string;
  password: string;
}
interface ISignUpCredencials {
  name: string;
  email: string;
  password: string;
}

interface IUpdateUserData {
  name: string;
  email: string;
  old_password?: string;
  new_password?: string;
}

interface IAuthContextData {
  user: IUser;
  loading: boolean;
  signIn(credencials: ISignInCredencials): Promise<void>;
  signUp(credencials: ISignUpCredencials): Promise<void>;
  updateUserDataStorage(dataToUpdate: IUpdateUserData): Promise<void>;
  signOut(): Promise<void>;
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
        '@apphold:token',
        '@apphold:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@apphold:token', '@apphold:user']);

    setData({} as IAuthState);
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

  api.interceptors.response.use(
    response => response,
    async err => {
      if (err.response.status === 401 || err.response.status === 403) {
        signOut();
      }

      throw err;
    },
  );

  const signUp = useCallback(
    async ({ name, email, password }: ISignUpCredencials) => {
      await api.post('/sessions/signup', {
        name,
        email,
        password,
      });
    },
    [],
  );

  const updateUserDataStorage = useCallback(
    async (dataToUpdate: IUpdateUserData) => {
      await AsyncStorage.setItem('@apphold:user', JSON.stringify(dataToUpdate));
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        signIn,
        signUp,
        updateUserDataStorage,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
