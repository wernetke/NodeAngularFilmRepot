import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmSettingsComponent } from './film-settings.component';

describe('FilmSettingsComponent', () => {
  let component: FilmSettingsComponent;
  let fixture: ComponentFixture<FilmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
