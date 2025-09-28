import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosForm } from './medicos-form';

describe('MedicosForm', () => {
  let component: MedicosForm;
  let fixture: ComponentFixture<MedicosForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicosForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicosForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
