import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSetaComponent } from './detalle-seta.component';

describe('DetalleSetaComponent', () => {
  let component: DetalleSetaComponent;
  let fixture: ComponentFixture<DetalleSetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
