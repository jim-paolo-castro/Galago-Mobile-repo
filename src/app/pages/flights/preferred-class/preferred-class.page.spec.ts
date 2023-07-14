import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferredClassPage } from './preferred-class.page';

describe('PreferredClassPage', () => {
  let component: PreferredClassPage;
  let fixture: ComponentFixture<PreferredClassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PreferredClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
