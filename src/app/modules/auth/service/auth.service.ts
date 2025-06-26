import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/auth'

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { email, password }).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token)  
        }
      }),
      catchError(this.handleError)
    )
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, { name, email, password }).pipe(
      catchError(this.handleError)
    )
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error)
  }
}
