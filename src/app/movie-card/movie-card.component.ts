import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DirectorViewComponentComponent } from '../director-view-component/director-view-component.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponentComponent } from '../genre-view-component/genre-view-component.component';
import { MovieDescriptionComponentComponent } from '../movie-description-component/movie-description-component.component';

/**
 * @description MovieCardComponent displays all movie cards from API
 * @selector 'app-movie-card',
 * @templateUrl './movie-card.component.html',
 * @styleUrls ['./movie-card.component.scss'],
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  userData = { Username: "", Favorites: [] };
  Favorites: any[] = [];
  isFavMovie: boolean = false;

  /**
   * @constructor
   * @param {FetchApiDataService} - fetches data from API
   * @param {MatDialog} - used for the dialog box
   * @param {MatSnackBar} - used for notifications
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }
  /** This is a function to get all movies
   * @returns returns all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
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
        Description: description
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

  /** This calls the favorite movies for the user
   * @returns Users favorite movies
  */
  getFavMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Favorites = this.user.Favorites;
    this.Favorites = this.user.Favorites;
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

  /** This is the add or delete fav icon
   * @param {any} Movie
   */
  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie);
    isFavorite
      ? this.deleteFavMovies(movie)
      : this.addFavMovies(movie);
  }

  /** This will add a movie to the users Favorites on their profile
   * @param {any} Movie
   * @returns 'Movie has been added to your favorites!' notification
  */
  addFavMovies(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.addFavorites(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavMovies();
      this.snackBar.open('Movie has been added to your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

  /** This will delete the movie from the users Favorites on their profile
   * @param {any} Movie
   * @returns 'Movie has been deleted from your favorites!' notification
   */
  deleteFavMovies(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.deleteFavorites(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavMovies();
      this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }
}
