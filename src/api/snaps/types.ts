export type Snap = {
  id: string;
  parent_id: string;
  username: string;
  fullname: string;
  author: string;
  content: string;
  created_at: string;
  likes: number;
  has_liked: boolean;
  shares: number;
  has_shared: boolean;
  favs: number;
  num_replies: number;
  profile_photo_url: string;
  visibility: number;
  privacy: number;
  is_shared_by: string[];
};
