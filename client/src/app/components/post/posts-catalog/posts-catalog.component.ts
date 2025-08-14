import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../../types';
import { PostService } from '../../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts-catalog',
  imports: [RouterLink],
  templateUrl: './posts-catalog.component.html',
  styleUrl: './posts-catalog.component.css',
})
export class PostsCatalogComponent implements OnInit {
  posts: Post[] = [];

  private postService = inject(PostService);

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      },
    });
  }
}
