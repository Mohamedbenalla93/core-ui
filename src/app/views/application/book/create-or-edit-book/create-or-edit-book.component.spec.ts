import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditBookComponent } from './create-or-edit-book.component';

describe('CreateOrEditBookComponent', () => {
  let component: CreateOrEditBookComponent;
  let fixture: ComponentFixture<CreateOrEditBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrEditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
