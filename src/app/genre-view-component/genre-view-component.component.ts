import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description GenreViewComponentComponent used to display Genre View dialog box
 * @selector 'app-genre-view-component',
 * @templateUrl './genre-view-component.component.html',
 * @styleUrls ['./genre-view-component.component.scss']
 */
@Component({
  selector: 'app-genre-view-component',
  templateUrl: './genre-view-component.component.html',
  styleUrls: ['./genre-view-component.component.scss']
})
export class GenreViewComponentComponent implements OnInit {

  /**
  * @constructor
  * @param data to display the data in the dialog box
  */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    /** This displays the Genre information
     * @param {string} Name,
     * @param {string} Description
     */
    public data: {
      Name: string,
      Description: string,
    }
  ) { }

  ngOnInit(): void {

  }
}
