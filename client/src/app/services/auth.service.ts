import { Injectable, signal } from '@angular/core';
import { User } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser = signal<User | null>(null);
  private _isLoggedIn = signal<boolean>(false);
  private _users: User[] = [
    {
      _id: '5fa64b162183ce1728ff371d',
      username: 'John',
      email: 'john.doe@gmail.com',
    },
    {
      _id: '5fa64b162183ce1728ff371e',
      username: 'Jane',
      email: 'jane.fox@gmail.com',
    },
    {
      _id: '5fa64b162183ce1728ff371f',
      username: 'David',
      email: 'david.gilmore@gmail.com',
    },
  ];

  public isLoggedIn = this._isLoggedIn.asReadonly();
  public currentUser = this._currentUser.asReadonly();

  constructor(private http: HttpClient) {
    const loggedUser = localStorage.getItem('currentUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      this._currentUser.set(user);
      this._isLoggedIn.set(true);
    }
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ): boolean {
    if (username && email && password && rePassword) {
      const newUser: User = {
        _id: `user_${Date.now()}`,
        username: username,
        email: email,
      };

      this._users.push(newUser);
      this._currentUser.set(newUser);
      this._isLoggedIn.set(true);

      localStorage.setItem('currentUser', JSON.stringify(newUser));

      return true;
    }

    return false;
  }
}
