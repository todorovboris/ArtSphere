import { User } from './user';

export interface Post {
  _id: string;
  userId: User;
  imageUrl: string;
  title: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  text: string;
}
