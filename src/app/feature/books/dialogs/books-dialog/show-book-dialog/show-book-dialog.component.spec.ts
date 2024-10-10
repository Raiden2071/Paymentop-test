import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBookDialogComponent } from './show-book-dialog.component';

describe('ShowBookDialogComponent', () => {
  let component: ShowBookDialogComponent;
  let fixture: ComponentFixture<ShowBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBookDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
