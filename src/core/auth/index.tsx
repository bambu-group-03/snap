import type { UserCredential } from 'firebase/auth';
import { create } from 'zustand';

import { createSelectors } from '../utils';
import type { TokenType, UserType } from './utils';
import { getToken, getUser, removeToken, setToken, setUser } from './utils';

interface AuthState {
  token: TokenType | null;
  user: UserType | undefined;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (
    data: TokenType,
    userId: UserCredential['user']['uid'] | undefined
  ) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  user: undefined,
  signIn: async (token, userId) => {
    if (userId !== undefined) {
      const response = await fetch(
        `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/auth/users/${userId}`
      );
      const user: UserType = await response.json();
      await setUser(user); // store user and user in phone storage
      set({ user });
    }

    await setToken(token); // store token in phone storage
    set({ status: 'signIn', token }); // store token in phone memory ram
  },
  signOut: async () => {
    await removeToken();
    set({ status: 'signOut', token: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      const oldLoggedUser = getUser();
      if (userToken !== null) {
        get().signIn(userToken, oldLoggedUser?.id);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

/**
 * Signs the user out, removing the authentication token.
 */
export const signOut = () => _useAuth.getState().signOut();
/**
 * Signs the user in with the provided authentication token.
 * @param token - The authentication token to sign in with.
 */
export const signIn = (
  token: TokenType,
  userId: UserCredential['user']['uid']
) => _useAuth.getState().signIn(token, userId);
/**
 * Hydrates the authentication state by checking for a stored authentication token.
 */
export const hydrateAuth = () => _useAuth.getState().hydrate();

export const getUserState = () => _useAuth.getState().user;

export const updateUserState = (user: UserType) => _useAuth.setState({ user });
