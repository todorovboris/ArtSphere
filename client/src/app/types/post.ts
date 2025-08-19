import { User } from './user';

export interface Post {
  id: string;
  title: string;
  author: string;
  info: string;
  imageUrl: string;
  ownerId: User;
  likes: string[];
  likesCount: number;
}
