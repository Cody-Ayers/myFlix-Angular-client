import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-description-component',
  templateUrl: './movie-description-component.component.html',
  styleUrls: ['./movie-description-component.component.scss']
})
export class MovieDescriptionComponentComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Title: string,
      Description: string,
    }
  ) { }

  ngOnInit(): void {

  }
}
