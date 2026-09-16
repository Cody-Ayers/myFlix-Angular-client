import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description DirectorViewComponentComponent opens dialog box for Director Information
 * @selector 'app-director-view-component',
 * @templateUrl './director-view-component.component.html',
 * @styleUrls ['./director-view-component.component.scss']
 */
@Component({
  selector: 'app-director-view-component',
  templateUrl: './director-view-component.component.html',
  styleUrls: ['./director-view-component.component.scss']
})
export class DirectorViewComponentComponent implements OnInit {

  /**
  * @constructor
  * @param data to display the data in the dialog box
  */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    /** This displays in the information about the Director
     * @param {string} Name,
     * @param {string} Bio,
     * @param {string} BirthDate
     * @param {string} DeathDate
     */
    public data: {
      Name: string,
      Bio: string,
      BirthDate: Date,
      DeathDate: Date
    }
  ) { }

  ngOnInit(): void {

  }
}
