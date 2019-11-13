import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCountryFormComponent } from './brand-country-form.component';

describe('BrandCountryFormComponent', () => {
  let component: BrandCountryFormComponent;
  let fixture: ComponentFixture<BrandCountryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandCountryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandCountryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
