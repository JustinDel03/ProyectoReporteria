import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthData } from 'app/interfaces/auth-data.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<AuthData>(`${this.apiUrl}/login`, { email: email, password: password })
      .pipe(
        tap(response => {
          if (response && response.accessToken) {
            console.log("entro if responsive")
            this.storeTokens(response.accessToken, response.refreshToken);
          }
        })
      );
  }

  logout(): void {
    const userId = this.getUserId();
    if (userId) {
      this.http.post<any>(`${this.apiUrl}/logout`, { id: userId }).subscribe();
      this.clearTokens();
    }
  }

  private storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  public getUserId(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken ? decodedToken.id : null;
  }

  private getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
