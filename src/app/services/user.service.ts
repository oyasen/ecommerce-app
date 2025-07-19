import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../components/users/users.component';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = 'https://randomuser.me/api';
  private readonly seed = 'angular-demo';
  
  constructor(private http: HttpClient) {}
  
  getUsers(results: number, page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.baseUrl}/?results=${results}&page=${page}&seed=${this.seed}`
    );
  }
}