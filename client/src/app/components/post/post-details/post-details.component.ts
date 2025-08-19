import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post, User } from '../../../types';
import { AuthService, PostService } from '../../../services';
import { doc, updateDoc, arrayUnion } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-post-details',
  imports: [RouterLink],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  currentUser: User | null = null;
  isOwner: boolean = false;
  isLiked: boolean = false;
  post: Post | null = null;

  protected authService = inject(AuthService);
  private postService = inject(PostService);
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private router = inject(Router);

  constructor() {
    effect(() => {
      this.currentUser = this.authService.currentUser();
      this.checkIfOwner();
      this.checkIsLiked();
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');

      if (postId) {
        this.postService.getOnePost(postId).subscribe({
          next: (post) => {
            this.post = post as Post;
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
    this.isOwner = this.post?.ownerId === this.currentUser?.uid;
  }

  onLike(): void {
    const currentUserId = this.authService.currentUser()?.uid;

    if (!currentUserId) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.post) {
      console.error('Post not found!');
      return;
    }

    const postId = this.post.id;
    const postRef = doc(this.firestore, `posts/${postId}`);

    if (!this.isLiked) {
      updateDoc(postRef, {
        likes: arrayUnion(currentUserId),
      });
      this.isLiked = true;
    }
  }

  onDelete(): void {
    const postId = this.post?.id;

    if (postId) {
      this.postService
        .deletePost(postId)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          console.error('Error deleting the post:', error);
        });
    } else {
      console.error('Post ID is missing!');
    }
  }
}
