import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, PostService } from '../../services';
import { Post } from '../../types';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  topPosts: Post[] = [];

  protected authService = inject(AuthService);
  private postService = inject(PostService);

  readonly isLoggedIn = this.authService.isLoggedIn;

  ngOnInit(): void {
    this.postService.getMostRatedPosts().subscribe({
      next: (posts) => {
        this.topPosts = posts;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      },
    });
  }
}
