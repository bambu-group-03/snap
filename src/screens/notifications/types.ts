import type { UserType } from '@/core/auth/utils';

export type Notification = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  notification_type: string;
  redirect_id: string;
  created_at: string;
  updated_at: string;
  user: UserType;
};
