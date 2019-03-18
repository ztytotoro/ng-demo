import { CookiesService } from './../cookies/cookies.service';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  token: string = null;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private cookies: CookiesService, private http: HttpClient) {
    this.token = this.cookies.get('token');
    this.isLoggedIn = !!this.token;
  }

  Login(userName: string, password: string): Observable<object> {
    const ob = this.http.post('', {}, {
      params: {
        userName,
        password
      },
      withCredentials: true
    });

    ob.subscribe((response: { token: string }) => {
      this.token = response.token;
    });

    return ob;
  }

  Logout(): void {
    this.isLoggedIn = false;
    this.token = null;
  }
}
