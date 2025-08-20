import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService, PostService } from '../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  imports: [FormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent {
  private postService = inject(PostService);
  private authService = inject(AuthService);
  private router = inject(Router);

  userId: string = '';

  onCreatePost(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.postService
      .createPost(form.value)
      .then((response) => {
        this.router.navigate(['/gallery']);
        form.reset();
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  }
}
