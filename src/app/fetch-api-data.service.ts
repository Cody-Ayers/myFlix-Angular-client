import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Movie, User, UserUpdate } from './models';

/** Base URL of the hosted myFlix REST API */
const apiUrl = 'https://codys-flix-0b23a40a1d0d.herokuapp.com/';

/**
 * @description Service that wraps every call to the myFlix REST API.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) { }

  /** Register a new user */
  public userRegistration(userDetails: UserUpdate): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /** Log a user in. Resolves with `{ user, token }` */
  public userLogin(userDetails: { Username: string; Password: string }): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /** Get every movie */
  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(apiUrl + 'movies', { headers: this.authHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  /** Get one movie by title */
  getOneMovies(title: string): Observable<Movie> {
    return this.http.get<Movie>(apiUrl + 'movies/' + title, { headers: this.authHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  /** Read the logged-in user out of local storage */
  getUser(): User {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return { Username: '', Email: '', Favorites: [], ...user };
  }

  /** Get a user's profile from the API */
  getFavorites(username: string): Observable<User> {
    return this.http.get<User>(apiUrl + 'users/' + username, { headers: this.authHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  /** Add a movie to the logged-in user's favorites */
  addFavorites(movie: Movie): Observable<User> {
    const user = this.getUser();
    return this.http.post<User>(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, null, {
      headers: this.authHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  /** Remove a movie from the logged-in user's favorites */
  deleteFavorites(movie: Movie): Observable<User> {
    const user = this.getUser();
    return this.http.delete<User>(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, {
      headers: this.authHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  /** Update the logged-in user's profile */
  editUser(userDetails: UserUpdate): Observable<User> {
    return this.http.put<User>(apiUrl + 'users/' + this.getUser().Username, userDetails, {
      headers: this.authHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  /** Delete the logged-in user's account */
  deleteUser(): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + this.getUser().Username, {
      headers: this.authHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  /** Builds the bearer-token header used by every protected endpoint */
  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, Error body is: ${error.error}`);
    }
    return throwError(() => 'Something bad happened; please try again later.');
  }
}
