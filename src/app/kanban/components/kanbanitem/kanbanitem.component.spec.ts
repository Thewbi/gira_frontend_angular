import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanitemComponent } from './kanbanitem.component';

describe('KanbanitemComponent', () => {
  let component: KanbanitemComponent;
  let fixture: ComponentFixture<KanbanitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
