import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../../types';
import { PostService } from '../../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts-catalog',
  imports: [RouterLink, CommonModule],
  templateUrl: './posts-catalog.component.html',
  styleUrl: './posts-catalog.component.css',
})
export class PostsCatalogComponent implements OnInit {
  posts: Post[] = [];
  // isLoading: boolean = true;

  private postService = inject(PostService);

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        // this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
        // this.isLoading = false;
      },
    });
  }
}
