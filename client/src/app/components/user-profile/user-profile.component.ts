import { Component, effect, inject, OnInit } from '@angular/core';
import { AuthService, PostService } from '../../services';
import { Post, User } from '../../types';
import { RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { catchError, finalize, of, take } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  imports: [RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  currentUser: User | null = null;
  userPosts: Post[] = [];

  private authService = inject(AuthService);
  private postService = inject(PostService);
  private auth = inject(Auth);

  constructor() {
    effect(() => {
      this.currentUser = this.authService.currentUser();
    });
  }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser = user;

      if (this.currentUser) {
        this.loadUserPosts(this.currentUser.uid);
      }
    });
  }

  loadUserPosts(userId: string): void {
    this.postService
      .getUserPosts(userId)
      .pipe(
        take(1),
        catchError((error) => {
          console.error('Error fetching user posts:', error);
          this.userPosts = [];
          return of([]);
        })
      )
      .subscribe({
        next: (posts) => {
          this.userPosts = posts;
        },
      });
  }
}
