import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasList } from './mascotas-list';

describe('MascotasList', () => {
  let component: MascotasList;
  let fixture: ComponentFixture<MascotasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
