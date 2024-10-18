import { Injectable } from '@angular/core';
import { User } from '../utils/user';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  private user: User | null = null;

  constructor() {}

  setUser(userData: User): void {
    this.user = userData;
  }

  getUser(): User | null {
    return this.user;
  }

  clearUser(): void {
    this.user = null;
  }
}
