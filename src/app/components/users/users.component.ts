import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface Name {
  title: string;
  first: string;
  last: string;
}

interface Street {
  number: number;
  name: string;
}

interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: string | number;
}

interface Login {
  uuid: string;
  username: string;
}

interface Dob {
  date: string;
  age: number;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  phone: string;
  cell: string;
  picture: Picture;
  nat: string;
}
 
export interface ApiResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [HttpClient] // Ensure HttpClient is provided
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  error = '';
  currentPage = 1;
  resultsPerPage = 10;
  totalPages = 10; // RandomUser.me doesn't provide total pages, so we'll set a reasonable limit
  seed = 'angular-demo'; // Fixed seed for consistent pagination

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.error = '';
    
    this.http.get<ApiResponse>(
      `https://randomuser.me/api/?results=${this.resultsPerPage}&page=${this.currentPage}&seed=${this.seed}`
    )
    .pipe(
      catchError(err => {
        this.error = 'Failed to load users. Please try again later.';
        console.error('API Error:', err);
        return throwError(err);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe({
      next: (data) => {
        this.users = data.results;
        // RandomUser.me doesn't provide total pages in response
        // So we'll just prevent infinite pagination
        if (this.currentPage >= this.totalPages) {
          this.totalPages = this.currentPage;
        }
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  changeResultsCount(count: number): void {
    this.resultsPerPage = count;
    this.currentPage = 1; // Reset to first page when changing page size
    this.loadUsers();
  }

  getFormattedLocation(user: User): string {
    const loc = user.location;
    return `${loc.street.number} ${loc.street.name}, ${loc.city}, ${loc.state}, ${loc.country}`;
  }

  getFormattedName(user: User): string {
    return `${user.name.title} ${user.name.first} ${user.name.last}`;
  }
}