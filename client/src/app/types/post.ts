import { User } from './user';

export interface Post {
  _id: string;
  userId: User;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  text: string;
}
