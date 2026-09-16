import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorViewComponentComponent } from './director-view-component.component';

describe('DirectorViewComponentComponent', () => {
  let component: DirectorViewComponentComponent;
  let fixture: ComponentFixture<DirectorViewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectorViewComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectorViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
