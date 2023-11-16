import type { UserCredential } from 'firebase/auth';
import { create } from 'zustand';

import { createSelectors } from '../utils';
import type { TokenType, UserType } from './utils';
import { getToken, getUser, removeToken, setToken, setUser } from './utils';

interface AuthState {
  token: TokenType | null;
  user: UserType | undefined;
  status: 'idle' | 'signOut' | 'signIn' | 'signInComplete';
  signIn: (
    data: TokenType,
    userId: UserCredential['user']['uid'] | undefined
  ) => void;
  signOut: () => void;
  signInComplete: (user: UserType) => void;
  hydrate: () => void;
}

const isUserComplete = (user: UserType): boolean => {
  for (const key in user) {
    if (user.hasOwnProperty(key)) {
      const value = user[key as keyof UserType]; // Use type assertion here
      if (value === null || value === '') {
        return false;
      }
    }
  }
  return true;
};

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  user: undefined,
  signIn: async (token, userId) => {
    const response = await fetch(
      `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/auth/${userId}/users/${userId}`
    );
    const user: UserType = await response.json();
    await setUser(user); // store user and user in phone storage
    await setToken(token); // store token in phone storage
    const status = isUserComplete(user) ? 'signInComplete' : 'signIn';
    set({ status, user, token }); // store token in phone memory ram
  },
  signOut: async () => {
    await removeToken();
    set({ status: 'signOut', token: null });
  },
  hydrate: () => {
    console.log('HIDRATANDOO');
    try {
      const userToken = getToken();
      const oldLoggedUser = getUser();
      console.log('oldLoggedUser', oldLoggedUser);
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
  signInComplete: async (user) => {
    const response = await fetch(
      `https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/auth/update_user`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );

    if (response.status !== 200) {
      console.log('error updating user, status code:', response.status);
      console.log(user);
      return;
    }
    await setUser(user); // store user and user in phone storage
    set({ user, status: 'signInComplete' });
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

export const signInComplete = (user: UserType) => {
  _useAuth.getState().signInComplete(user);
};
