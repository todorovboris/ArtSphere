import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(limit?: number): Observable<Post[]> {
    if (limit) {
      this.apiUrl += `?limit=${limit}`;
    }

    return this.http.get<Post[]>(this.apiUrl);
  }

  getOnePost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${postId}`);
  }

  createPost(themeName: string, postText: string): Observable<Post> {
    const body = JSON.stringify({ themeName, postText });

    return this.http.post<Post>(this.apiUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
