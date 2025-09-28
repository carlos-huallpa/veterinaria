import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosList } from './medicos-list';

describe('MedicosList', () => {
  let component: MedicosList;
  let fixture: ComponentFixture<MedicosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
