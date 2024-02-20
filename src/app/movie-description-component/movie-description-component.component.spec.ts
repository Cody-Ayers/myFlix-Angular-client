import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDescriptionComponentComponent } from './movie-description-component.component';

describe('MovieDescriptionComponentComponent', () => {
  let component: MovieDescriptionComponentComponent;
  let fixture: ComponentFixture<MovieDescriptionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDescriptionComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieDescriptionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
