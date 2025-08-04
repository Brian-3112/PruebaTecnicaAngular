import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormularioTareas } from './modal-formulario-tareas';

describe('ModalFormularioTareas', () => {
  let component: ModalFormularioTareas;
  let fixture: ComponentFixture<ModalFormularioTareas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFormularioTareas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormularioTareas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
