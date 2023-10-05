import { create } from 'zustand';

import { createSelectors } from '../utils';
import type { TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (data: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  signIn: async (token) => {
    await setToken(token);
    set({ status: 'signIn', token });
  },
  signOut: async () => {
    await removeToken();
    set({ status: 'signOut', token: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken);
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
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
/**
 * Hydrates the authentication state by checking for a stored authentication token.
 */
export const hydrateAuth = () => _useAuth.getState().hydrate();
