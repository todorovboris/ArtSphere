import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../types';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';

  private firestore = inject(Firestore);

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    const itemsRef = collection(this.firestore, 'posts');
    return collectionData(itemsRef, { idField: 'id' }) as Observable<Post[]>;
  }

  getPost(postId: string) {
    const postRef = doc(this.firestore, `posts/${postId}`);
    return docData(postRef, { idField: 'id' });
  }

  // getAllPosts(limit?: number): Observable<Post[]> {
  //   if (limit) {
  //     this.apiUrl += `?limit=${limit}`;
  //   }

  //   return this.http.get<Post[]>(this.apiUrl);
  // }

  // getOnePost(postId: string): Observable<Post> {
  //   return this.http.get<Post>(`${this.apiUrl}/${postId}`);
  // }

  createPost(themeName: string, postText: string): Observable<Post> {
    const body = JSON.stringify({ themeName, postText });

    return this.http.post<Post>(this.apiUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
