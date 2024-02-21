import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DirectorViewComponentComponent } from '../director-view-component/director-view-component.component';
import { MovieDescriptionComponentComponent } from '../movie-description-component/movie-description-component.component';
import { GenreViewComponentComponent } from '../genre-view-component/genre-view-component.component';

import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * @description Component for the Profile Page
 * @selector 'app-user-profile-component'
 * @templateUrl './user-profile-component.component.html'
 * @styleUrls ['./user-profile-component.component.scss']
 */
@Component({
  selector: 'app-user-profile-component',
  templateUrl: './user-profile-component.component.html',
  styleUrls: ['./user-profile-component.component.scss']
})
export class UserProfileComponentComponent implements OnInit {
  @Input() userData = { Username: "", Password: "", Email: "", Birthday: "", Favorites: [] };

  user: any = {};
  movies: any[] = [];
  Favorites: any[] = [];

  /**
  * @constructor - Constructor for UserProfileComponentComponent.
  * @param {FetchApiDataService} fetchApiData - Fetches the movie API
  * @param {MatSnackBar} snackBar - Material to display notifications.
  * @param {Router} router - Navigation router
  * @param {MatDialog} dialog - Material to display dialog boxes.
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.getFavMovies();
  }

  /** This is the component that gets the users profile
   * @returns username, email and birthday and also display the users Favorites
  */
  getProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.Favorites = response.filter((movie: any) => this.user.Favorites.includes(movie._id));
    });
  }

  /** This is the component that allows the user to update their username
   * @returns a 'User update successful' or 'Failed to update user' notification
  */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      console.log('User update success:', response);
      localStorage.setItem('user', JSON.stringify(response));
      this.snackBar.open('User update successful', 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.error('Error updating user:', error);
      this.snackBar.open('Failed to update user', 'OK', {
        duration: 2000
      });
    });
  }

  /** This component allows the user to delete their profile
   * @returns 'User successfully deleted' notification
   */
  deleteUser(): void {
    this.router.navigate(['welcome']).then(() => {
      localStorage.clear();
      this.snackBar.open('User successfully deleted.', 'OK', {
        duration: 2000
      });
    })
    this.fetchApiData.deleteUser().subscribe((response) => {
      console.log(response);
    });
  }

  /** This component retrieves all movies from the API
   * @returns All movies from API
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /** This calls the favorite movies for the user
   * @returns Users favorite movies
  */
  getFavMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Favorites = this.user.Favorites;
    this.Favorites = this.user.Favorites;
  }

  /** This opens a dialog box for the Director Information.
   * @param {string} Name,
   * @param {string} Bio,
   * @param {string} Birthdate,
   * @param {string} DeathDate
   * @returns Directors name, bio birth and death year.
   */
  openDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorViewComponentComponent, {
      data: {
        Name: name,
        Bio: bio,
        BirthDate: birth,
        DeathDate: death
      },
      width: '400px',
    });
  }

  /** This opens the Genre Dialog box
   * @param {string} Name,
   * @param {string} Description
   * @returns Genre Name and Description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponentComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

  /** This opens the Movie Synopsis box
   * @param {string} Title,
   * @param {string} Description
   * @returns Movie Title and Description
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(MovieDescriptionComponentComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '400px',
    });
  }

  /** Finds if the the movie is a Favorite or not
   * @param {any} Movie
   * @returns {boolean} if the movie is a favorite or not
   */
  isFav(movie: any): any {
    const MovieID = movie._id;
    if (this.Favorites.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  /** This will delete the movie from the users Favorites on their profile
   * @param {any} Movie
   * @returns 'Movie has been deleted from your favorites!' notification
   */
  deleteFavMovies(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this, this.userData = this.user.Username;
    this.fetchApiData.deleteFavorites(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavMovies();
      this.getProfile();
      this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

}
