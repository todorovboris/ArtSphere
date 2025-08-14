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

  onLogin(loginForm: NgForm): void {
    if (loginForm.invalid) return;

    const { email, password } = loginForm.value;
    this.email = email;
    this.password = password;

    this.authService.login(this.email, this.password);
    this.router.navigate(['/home']);

    // const response = this.authService.login(this.email, this.password);
    // if (response === true) {
    //   this.router.navigate(['/home']);
    // }
  }
}
