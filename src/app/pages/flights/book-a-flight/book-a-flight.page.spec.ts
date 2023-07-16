import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookAFlightPage } from './book-a-flight.page';

describe('BookAFlightPage', () => {
  let component: BookAFlightPage;
  let fixture: ComponentFixture<BookAFlightPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookAFlightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
