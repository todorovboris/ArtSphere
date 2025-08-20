import { Component, inject } from '@angular/core';
import { PostService } from '../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../types';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-edit',
  imports: [FormsModule],
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.css',
})
export class PostEditComponent {
  post: Post | null = null;

  private postService = inject(PostService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private postId: string | null = null;

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');

    if (this.postId) {
      this.postService.getOnePost(this.postId).subscribe({
        next: (post) => {
          this.post = post as Post;
        },
        error: (error) => {
          console.error('Error fetching post for edit:', error);
          this.router.navigate(['/home']);
        },
      });
    }
  }

  onEditPost(formData: NgForm): void {
    if (formData.invalid || !this.postId) return;

    this.postService
      .editPost(this.postId, formData.value)
      .then((resp) => {
        this.router.navigate(['/gallery', this.postId]);
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
  }
}
