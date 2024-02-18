import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view-component',
  templateUrl: './genre-view-component.component.html',
  styleUrls: ['./genre-view-component.component.scss']
})
export class GenreViewComponentComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Name: string,
      Description: string,
    }
  ) { }

  ngOnInit(): void {

  }
}
