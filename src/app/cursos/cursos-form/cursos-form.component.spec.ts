import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosFormComponent } from './cursos-form.component';

describe('CursosFormComponent', () => {
  let component: CursosFormComponent;
  let fixture: ComponentFixture<CursosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
