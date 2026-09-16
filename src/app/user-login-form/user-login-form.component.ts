import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * @description component for the user log in dialog box
 * @selector 'app-user-login-form',
 * @templateUrl './user-login-form.component.html',
 * @styleUrls ['./user-login-form.component.scss']
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} - fetches data from the API
   * @param {MatDialogRef} - used for dialog boxes
   * @param {MatSnackBar} - used for notifications
   * @param {Router} - used to navigate throughout the app
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /** This is the component that lets the user log in if they have a username and password */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      //Logic for a successful user login
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      this.dialogRef.close(); // Will close modal on success
      this.snackBar.open(response, 'User login successful', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open(response, 'User login failed', {
        duration: 2000
      });
    });
  }

}
