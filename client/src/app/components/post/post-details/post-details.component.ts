import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post, User } from '../../../types';
import { AuthService, PostService } from '../../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-details',
  imports: [],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  currentUser: User | null = null;
  isOwner: boolean = false;
  isLiked: boolean = false;
  post: Post | null = null;

  protected authService = inject(AuthService);

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.currentUser = this.authService.currentUser();

    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');

      if (postId) {
        this.postService.getOnePost(postId).subscribe({
          next: (post) => {
            this.post = post;
            this.checkIfOwner();
            this.checkIsLiked();
          },
          error: (error) => {
            console.error('Error fetching post details:', error);
          },
        });
      }
    });
  }

  checkIsLiked(): void {
    if (this.post && this.currentUser) {
      const isLiked = this.post.likes.includes(this.currentUser.uid);
      this.isLiked = isLiked;
    } else {
      this.isLiked = false;
    }
  }

  checkIfOwner(): void {
    this.isOwner = this.post?.userId === this.currentUser?.uid;
  }

  onLike(): void {
    console.log('its liked!');
  }
}
