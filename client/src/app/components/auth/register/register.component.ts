import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username: string = '';
  email: string = '';
  password: string = '';
  rePassword: string = '';

  usernameError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  rePasswordError: boolean = false;

  usernameErrorMessage: string = '';
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  rePasswordErrorMessage: string = '';

  private isValidEmail(email: string): boolean {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegEx.test(email);
  }

  validateUsername(): void {
    if (!this.username) {
      this.usernameError = true;
      this.usernameErrorMessage = 'Username is required!';
    } else {
      this.usernameError = false;
      this.usernameErrorMessage = '';
    }
  }

  validateEmail(): void {
    if (!this.email) {
      this.emailError = true;
      this.emailErrorMessage = 'Email is requried!';
    }
  }

  validatePassword(): void {
    if (!this.password) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password is required!';
    } else if (this.password.length < 6) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password must be at least 6 characters!';
    } else {
      this.passwordError = false;
      this.passwordErrorMessage = '';
    }
  }

  validateRePassword(): void {
    if (!this.rePassword) {
      this.rePasswordError = true;
      this.rePasswordErrorMessage = 'Repeat Password is required!';
    } else if (this.rePassword !== this.password) {
      this.rePasswordError = true;
      this.rePasswordErrorMessage = 'Both passwords do not match!';
    } else {
      this.rePasswordError = false;
      this.rePasswordErrorMessage = '';
    }
  }

  isFormValid(): boolean {
    return (
      Boolean(this.username) &&
      Boolean(this.email) &&
      Boolean(this.password) &&
      Boolean(this.rePassword) &&
      !this.usernameError &&
      !this.emailError &&
      !this.passwordError &&
      !this.rePasswordError
    );
  }

  onRegister(): void {
    this.validateUsername();
    this.validateEmail();
    this.validatePassword();
    this.validateRePassword();

    if (this.isFormValid()) {
      const response = this.authService.register(
        this.username,
        this.email,
        this.password
      );

      if (response === true) {
        this.router.navigate(['/home']);
      }
    }
  }
}
