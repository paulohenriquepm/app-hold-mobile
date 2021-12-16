import React, {
  createContext,
  ReactNode,
  useEffect,
  useCallback,
  useContext,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as AuthSession from 'expo-auth-session';

import { api } from '../api/api';

// const { CLIENT_ID } = process.env;
// const { REDIRECT_URI } = process.env;
interface IUser {
  id: number;
  name: string;
  email: string;
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

// interface AuthorizationResponse {
//   params: {
//     access_token: string;
//   };
//   type: string;
// }

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

  // const signInWithGoogle = useCallback(async () => {
  //   const RESPONSE_TYPE = 'token';
  //   const SCOPE = encodeURI('profile email');

  //   const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  //   const { type, params } = (await AuthSession.startAsync({
  //     authUrl,
  //   })) as AuthorizationResponse;

  //   if (type === 'success') {
  //     const response = await fetch(
  //       `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
  //     );
  //     const userInfo = await response.json();

  //     const userLogged = {
  //       id: userInfo.id,
  //       email: userInfo.email,
  //       name: userInfo.given_name,
  //       photo: userInfo.picture,
  //     };

  //     // setUser(userLogged);
  //     // await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
  //   }
  // }, []);

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
