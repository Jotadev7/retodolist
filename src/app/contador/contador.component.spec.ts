import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorComponent } from './contador.component';

// Descrevendo o que esse teste vai fazer
describe('ContadorComponent', () => {
  let component: ContadorComponent;
  let fixture: ComponentFixture<ContadorComponent>;

  // Configurando o que vai acontecer a cada teste
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ContadorComponent ]
    });

    // Fixture é uma instância de uma fixture de teste
    fixture = TestBed.createComponent(ContadorComponent);
    // dentro dessa fixture tem a instância do componente
    component = fixture.componentInstance;

    component.valor = 0;
  });

  it('Deve incrementar corretamente', () => {
    component.incrementar();
    expect(component.valor).toBe(1);
  });

  it('Deve decrementar corretamente', () => {
    component.incrementar();
    expect(component.valor).toBe(1);
    component.decrementar();
    expect(component.valor).toBe(0);
  });

  it('Não deve decrementar abaixo do valor permitido', () => {
    component.incrementar();
    expect(component.valor).toBe(1);
    component.decrementar();
    expect(component.valor).toBe(0);
    component.decrementar();
    expect(component.valor).toBe(0);
  });

  it('Não deve incrementar acima do valor permitido', () => {
    for(let i = 0; 1 < 200; i++) {
      component.incrementar();
    }
    expect(component.valor).toBe(100);
  });

});
