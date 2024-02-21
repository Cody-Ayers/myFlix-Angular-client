import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * @description component for the Welcome page
 * @selector 'app-welcome-page',
 * @templateUrl './welcome-page.component.html',
 * @styleUrls ['./welcome-page.component.scss']
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {

  /**
   * @constructor
   * @param {MatDialog} dialog - used to open a dialog box
   */
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }

  /** Button to open the registration form
   * @returns an input field to register
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '300px'
    });
  }

  /** Button to open login form
   * @retuns an input field for the user to log in
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '300px'
    });
  }

}
