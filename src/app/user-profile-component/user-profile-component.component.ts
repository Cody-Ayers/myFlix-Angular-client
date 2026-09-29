import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DirectorViewComponentComponent } from '../director-view-component/director-view-component.component';
import { MovieDescriptionComponentComponent } from '../movie-description-component/movie-description-component.component';
import { GenreViewComponentComponent } from '../genre-view-component/genre-view-component.component';

import { FetchApiDataService } from '../fetch-api-data.service';
import { Movie, User, UserUpdate } from '../models';

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
  @Input() userData: UserUpdate = { Username: '', Password: '', Email: '', Birthday: '' };

  user: User = { Username: '', Email: '', Favorites: [] };
  Favorites: Movie[] = [];

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
  }

  /** Initials shown in the avatar circle */
  get initials(): string {
    return (this.user.Username || '?').slice(0, 2).toUpperCase();
  }

  /** This is the component that gets the users profile
   * @returns username, email and birthday and also display the users Favorites
  */
  getProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    // date inputs need yyyy-MM-dd, the API sends a full ISO string
    this.userData.Birthday = this.user.Birthday ? String(this.user.Birthday).slice(0, 10) : '';
    this.fetchApiData.getAllMovies().subscribe((response: Movie[]) => {
      this.Favorites = response.filter((movie) => this.user.Favorites.includes(movie._id));
    });
  }

  /** This is the component that allows the user to update their profile
   * @returns a 'User update successful' or 'Failed to update user' notification
  */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.user = this.fetchApiData.getUser();
        this.userData.Password = '';
        this.snackBar.open('User update successful', 'OK', {
          duration: 2000
        });
      },
      error: () => {
        this.snackBar.open('Failed to update user', 'OK', {
          duration: 2000
        });
      }
    });
  }

  /** This component allows the user to delete their profile
   * @returns 'User successfully deleted' notification
   */
  deleteUser(): void {
    if (!confirm('Delete your account? This cannot be undone.')) {
      return;
    }
    this.fetchApiData.deleteUser().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['welcome']).then(() => {
          this.snackBar.open('User successfully deleted.', 'OK', {
            duration: 2000
          });
        });
      },
      error: () => {
        this.snackBar.open('Could not delete your account. Please try again.', 'OK', {
          duration: 3000
        });
      }
    });
  }

  /** This opens a dialog box for the Director Information.
   * @param {string} Name,
   * @param {string} Bio,
   * @param {string} Birthdate,
   * @param {string} DeathDate
   * @returns Directors name, bio birth and death year.
   */
  openDirectorDialog(name: string, bio: string, birth?: string | null, death?: string | null): void {
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

  /** This will delete the movie from the users Favorites on their profile
   * @param {Movie} movie
   * @returns 'Movie has been deleted from your favorites!' notification
   */
  deleteFavMovies(movie: Movie): void {
    this.fetchApiData.deleteFavorites(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getProfile();
      this.snackBar.open('Movie has been removed from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

}
