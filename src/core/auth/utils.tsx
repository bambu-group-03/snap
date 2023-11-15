import { getItem, removeItem, setItem } from '@/core/storage';

const TOKEN = 'token';
const USER = 'user';

export type TokenType = {
  access: string;
  refresh: string;
};

export type UserType = {
  bio_msg: null | string;
  blocked: boolean;
  created_at: string;
  email: string;
  first_name: null | string;
  id: string;
  last_name: null | string;
  phone_number: null | string;
  profile_photo_id: null | string;
  username: null | string;
  ubication: null | string;
};

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);

export const getUser = () => getItem<UserType>(USER);
export const removeUser = () => removeItem(USER);
export const setUser = (value: UserType) => setItem<UserType>(USER, value);
