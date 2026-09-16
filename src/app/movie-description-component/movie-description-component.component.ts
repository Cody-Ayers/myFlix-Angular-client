import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description MovieDescriptionComponentComponent used to open a dialog box displaying the movie description
 * @selector 'app-movie-description-component',
 * @templateUrl './movie-description-component.component.html',
 * @styleUrls ['./movie-description-component.component.scss']
 */
@Component({
  selector: 'app-movie-description-component',
  templateUrl: './movie-description-component.component.html',
  styleUrls: ['./movie-description-component.component.scss']
})
export class MovieDescriptionComponentComponent implements OnInit {

  /**
   * @constructor
   * @param data to display the data in the dialog box
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    /** This displays the Movie Synopsis
     * @param {string} Title,
     * @param {string} Description
     */
    public data: {
      Title: string,
      Description: string,
    }
  ) { }

  ngOnInit(): void {

  }
}
