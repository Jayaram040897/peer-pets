import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPetsListComponent } from './my-pets-list.component';

describe('MyPetsListComponent', () => {
  let component: MyPetsListComponent;
  let fixture: ComponentFixture<MyPetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPetsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
