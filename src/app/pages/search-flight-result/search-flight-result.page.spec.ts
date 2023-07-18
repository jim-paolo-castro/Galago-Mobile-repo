import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFlightResultPage } from './search-flight-result.page';

describe('SearchFlightResultPage', () => {
  let component: SearchFlightResultPage;
  let fixture: ComponentFixture<SearchFlightResultPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchFlightResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
