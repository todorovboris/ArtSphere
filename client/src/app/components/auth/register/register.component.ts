import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';
  rePassword: string = '';
  passwordsDoNotMatch: boolean = false;

  onRegister(registerForm: NgForm): void {
    if (registerForm.invalid) return;

    const { email, password, rePassword } = registerForm.value;

    if (password !== rePassword) {
      this.passwordsDoNotMatch = true;
      return;
    }

    this.passwordsDoNotMatch = false;

    this.email = email;
    this.password = password;
    this.rePassword = rePassword;

    this.authService.register(this.email, this.password);
    this.router.navigate(['/home']);
  }
}
