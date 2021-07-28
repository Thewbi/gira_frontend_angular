import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanlaneComponent } from './kanbanlane.component';

describe('KanbanlaneComponent', () => {
  let component: KanbanlaneComponent;
  let fixture: ComponentFixture<KanbanlaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanlaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
