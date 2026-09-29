import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description component for UserRegistrationFormComponent
 * @selector 'app-user-registration-form',
 * @templateUrl './user-registration-form.component.html',
 * @styleUrls ['./user-registration-form.component.scss']
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} - used to fetch information from the API
   * @param {MatDialogRef} - opens the User Registration form
   * @param {MatSnackBar} - used for notifications
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
    * component for sending inputs to the API
    * @returns 'User registration successful' / 'User registration failed' notification
    */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: () => {
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open('Registration successful! You can log in now.', 'OK', {
          duration: 3000
        });
      },
      error: () => {
        this.snackBar.open('Registration failed. Please check your details and try again.', 'OK', {
          duration: 3000
        });
      }
    });
  }

}
