import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosForm } from './turnos-form';

describe('TurnosForm', () => {
  let component: TurnosForm;
  let fixture: ComponentFixture<TurnosForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnosForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
