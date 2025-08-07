import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  emailError: boolean = false;
  passwordError: boolean = false;

  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';

  private isValidEmail(email: string): boolean {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegEx.test(email);
  }

  validateEmail(): void {
    if (!this.email) {
      this.emailErrorMessage = 'Email is required!';
      this.emailError = true;
    } else if (!this.isValidEmail(this.email)) {
      this.emailErrorMessage = 'Email is not valid!';
      this.emailError = true;
    } else {
      this.emailError = false;
      this.emailErrorMessage = '';
    }
  }

  validatePassword(): void {
    if (!this.password) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password is required!';
    } else if (this.password.length < 4) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password must be at least 4 characters!';
    } else {
      this.passwordError = false;
      this.passwordErrorMessage = '';
    }
  }

  isFormValid(): boolean {
    return (
      Boolean(this.email) &&
      Boolean(this.password) &&
      !this.emailError &&
      !this.passwordError
    );
  }

  onLogin(): void {
    this.validateEmail();
    this.validatePassword();
    if (this.isFormValid()) {
      const response = this.authService.login(this.email, this.password);
      if (response === true) {
        this.router.navigate(['/home']);
      }
    }
  }
}
