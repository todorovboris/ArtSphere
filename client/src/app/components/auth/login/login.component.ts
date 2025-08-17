import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  onLogin(loginForm: NgForm): void {
    this.errorMessage = '';

    if (loginForm.invalid) return;

    const { email, password } = loginForm.value;
    this.email = email;
    this.password = password;

    this.authService
      .login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMessage = 'Email is not valid!';
            break;
          case 'auth/user-not-found':
            this.errorMessage = 'Wrong user!';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Wrong password!';
            break;
          case 'auth/invalid-credential':
            this.errorMessage = 'Email or password is not correct!';
            break;
          default:
            this.errorMessage = 'Error on Login. Please try again later!';
            break;
        }
      });
  }
}
