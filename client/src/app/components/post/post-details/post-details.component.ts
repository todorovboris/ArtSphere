import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../../../types';
import { PostService } from '../../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-details',
  imports: [],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  post: Post | null = null;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');

      if (postId) {
        this.postService.getOnePost(postId).subscribe({
          next: (post) => {
            this.post = post;
          },
          error: (error) => {
            console.error('Error fetching post details:', error);
          },
        });
      }
    });
  }
}
