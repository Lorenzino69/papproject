import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  login(token: string): void {
    localStorage.setItem('authToken', token);
    this.authStatus.next(true);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
