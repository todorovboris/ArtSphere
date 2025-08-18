import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post, User } from '../../../types';
import { AuthService, PostService } from '../../../services';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from '@angular/fire/firestore';
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

    if (!currentUserId || !this.post) {
      console.error('User not logged in or post not found!');
      return;
    }

    const postId = this.post.id;
    const postRef = doc(this.firestore, `posts/${postId}`);
    let updateOperation;

    if (!this.isLiked) {
      updateOperation = updateDoc(postRef, {
        likes: arrayUnion(currentUserId),
      });
    }

    updateOperation
      ?.then(() => {
        if (this.isLiked) {
          this.post!.likes = this.post!.likes.filter(
            (uid) => uid !== currentUserId
          );
          this.isLiked = false;
        } else {
          this.post!.likes.push(currentUserId);
          this.isLiked = true;
        }
      })
      .catch((error) => {
        console.error('Error updating like status:', error);
      });
  }

  onDelete(): void {
    console.log('Item deleted!');
  }
}
