import { Routes } from '@angular/router';
import { PostDetailsComponent } from './components/post/post-details/post-details.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(
        (c) => c.RegisterComponent
      ),
    canActivate: [publicGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
    canActivate: [publicGuard],
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('./components/post/posts-catalog/posts-catalog.component').then(
        (c) => c.PostsCatalogComponent
      ),
  },
  {
    path: 'gallery/:id',
    component: PostDetailsComponent,
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/post/post-create/post-create.component').then(
        (c) => c.PostCreateComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
