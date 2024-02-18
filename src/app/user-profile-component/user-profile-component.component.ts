import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DirectorViewComponentComponent } from '../director-view-component/director-view-component.component';
import { MovieDescriptionComponentComponent } from '../movie-description-component/movie-description-component.component';
import { GenreViewComponentComponent } from '../genre-view-component/genre-view-component.component';

import { FetchApiDataService } from '../fetch-api-data.service';

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

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.user = this.fetchApiData.getUser();
    this.Favorites = this.user.Favorites
  }


  getProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.Favorites = response.filter((movie: any) => this.user.Favorites.includes(movie._id));
    });
  }

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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

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

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponentComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(MovieDescriptionComponentComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '400px',
    });
  }

  isFav(movie: any): any {
    const MovieID = movie._id;
    if (this.Favorites.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie);
    isFavorite
      ? this.deleteFavMovies(movie)
      : this.addFavMovies(movie);
  }

  addFavMovies(movie: any): void {
    this.fetchApiData.addFavorites(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.Favorites = response.Favorites
      this.snackBar.open('Movie has been added to your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

  deleteFavMovies(movie: any): void {
    this.fetchApiData.deleteFavorites(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.Favorites = response.Favorites
      this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

}
