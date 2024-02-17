import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-director-view-component',
  templateUrl: './director-view-component.component.html',
  styleUrls: ['./director-view-component.component.scss']
})
export class DirectorViewComponentComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Name: string,
      Bio: string,
      Birth: string,
      Death: string
    }
  ) { }

  ngOnInit(): void {

  }
}
