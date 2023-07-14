import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectDatesPage } from './select-dates.page';

describe('SelectDatesPage', () => {
  let component: SelectDatesPage;
  let fixture: ComponentFixture<SelectDatesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectDatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
