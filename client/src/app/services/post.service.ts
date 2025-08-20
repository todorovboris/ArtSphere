import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../types';
import {
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
  Firestore,
  query,
  where,
  orderBy,
  limit,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  getAllPosts(): Observable<Post[]> {
    const postsRef = collection(this.firestore, 'posts');
    return collectionData(postsRef, { idField: 'id' }) as Observable<Post[]>;
  }

  getOnePost(postId: string) {
    const postRef = doc(this.firestore, `posts/${postId}`);
    return docData(postRef, { idField: 'id' });
  }

  createPost(postData: Partial<Post>): Promise<any> {
    const postsRef = collection(this.firestore, 'posts');
    const userId = this.authService.currentUser()?.uid;

    if (!userId) {
      return Promise.reject('User is not logged in!');
    }

    const newPost = {
      ...postData,
      ownerId: userId,
      createdOn: new Date().toISOString(),
      likes: [],
      likesCount: 0,
    };

    return addDoc(postsRef, newPost);
  }

  editPost(postId: string, postData: Partial<Post>): Promise<void> {
    const postDocRef = doc(this.firestore, `posts/${postId}`);
    return updateDoc(postDocRef, postData);
  }

  deletePost(postId: string): Promise<void> {
    const postRef = doc(this.firestore, `posts/${postId}`);
    return deleteDoc(postRef);
  }

  getUserPosts(userId: string): Observable<Post[]> {
    const postsRef = collection(this.firestore, 'posts');
    const userPosts = query(postsRef, where('ownerId', '==', userId));
    return collectionData(userPosts, { idField: 'id' }) as Observable<Post[]>;
  }

  getMostRatedPosts(): Observable<Post[]> {
    const postsRef = collection(this.firestore, 'posts');
    const topPosts = query(postsRef, orderBy('likesCount', 'desc'), limit(3));
    return collectionData(topPosts, { idField: 'id' }) as Observable<Post[]>;
  }
}
