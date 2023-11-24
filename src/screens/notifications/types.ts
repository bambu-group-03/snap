import type { UserType } from '@/core/auth/utils';

export type Notification = {
  id: number;
  user_id: number;
  type: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: UserType;
};