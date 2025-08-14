import { User } from './user';

export interface Post {
  id: string;
  title: string;
  author: string;
  info: string;
  imageUrl: string;
  userId: User;
  likes: string[];
}
