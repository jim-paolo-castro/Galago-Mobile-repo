import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlyingFromToPage } from './flying-from-to.page';

describe('FlyingFromToPage', () => {
  let component: FlyingFromToPage;
  let fixture: ComponentFixture<FlyingFromToPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FlyingFromToPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
