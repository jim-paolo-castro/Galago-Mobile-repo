import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengersInputPage } from './passengers-input.page';

describe('PassengersInputPage', () => {
  let component: PassengersInputPage;
  let fixture: ComponentFixture<PassengersInputPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PassengersInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
