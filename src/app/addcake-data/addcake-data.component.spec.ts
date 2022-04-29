import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcakeDataComponent } from './addcake-data.component';

describe('AddcakeDataComponent', () => {
  let component: AddcakeDataComponent;
  let fixture: ComponentFixture<AddcakeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcakeDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcakeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
