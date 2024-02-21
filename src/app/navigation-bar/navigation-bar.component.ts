import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description NavigationBarComponent component for the top navigation bar
 * @selector 'app-navigation-bar',
 * @templateUrl './navigation-bar.component.html',
 * @styleUrls ['./navigation-bar.component.scss']
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  /**
   * @constructor
   * @param {Router} - used to navigate throughout the app
   * @param {MatSnackBar} - used for notifications
   */
  constructor(
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  /** This routes the user to the Main View */
  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  /** This routes the user to their Profile Page */
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  /** This will allow the user to sign out of the app */
  public logoutUser(): void {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
    this.snackBar.open('User logout successful', 'OK', {
      duration: 2000
    })
  }

}
