import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreViewComponentComponent } from './genre-view-component.component';

describe('GenreViewComponentComponent', () => {
  let component: GenreViewComponentComponent;
  let fixture: ComponentFixture<GenreViewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreViewComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenreViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
