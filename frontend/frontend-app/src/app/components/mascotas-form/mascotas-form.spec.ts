import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasForm } from './mascotas-form';

describe('MascotasForm', () => {
  let component: MascotasForm;
  let fixture: ComponentFixture<MascotasForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
