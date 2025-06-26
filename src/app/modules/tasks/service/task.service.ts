import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Tasks } from '../models/task.model'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly API_URL = 'http://localhost:3000/api/tasks'

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token')
    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    })
  }

  getTasks(): Observable<{ tasks: Tasks[] }> {
    return this.http.get<{ tasks: Tasks[] }>(`${this.API_URL}/byUserId`, {
      headers: this.getAuthHeaders()
    })
  }

  createTask(task: Partial<Tasks>): Observable<Tasks> {
    return this.http.post<Tasks>(`${this.API_URL}/register`, task, {
      headers: this.getAuthHeaders()
    })
  }

  updateTask(id: string, task: Partial<Tasks>): Observable<Tasks> {
    return this.http.put<Tasks>(`${this.API_URL}/${id}`, task, {
      headers: this.getAuthHeaders()
    })
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete/${id}`, {
      headers: this.getAuthHeaders()
    })
  }
}
