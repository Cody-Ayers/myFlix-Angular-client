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
    * component for sending inputs to the APU
    * @returns 'User registration successful' / 'User registration failed' notification
    */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close();
      console.log(response); // This will close the modal on success!
      this.snackBar.open(response, 'User registration successful', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open(response, 'User registration failed', {
        duration: 2000
      });
    });
  }

}
