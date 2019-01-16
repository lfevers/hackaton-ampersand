import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificarComponent } from './identificar.component';

describe('IdentificarComponent', () => {
  let component: IdentificarComponent;
  let fixture: ComponentFixture<IdentificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
