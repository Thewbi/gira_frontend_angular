import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanboardComponent } from './components/kanbanboard/kanbanboard.component';
import { StoreModule } from '@ngrx/store';
import * as fromKanban from './reducers';
import { KanbanlaneComponent } from './components/kanbanlane/kanbanlane.component';
import { KanbanitemComponent } from './components/kanbanitem/kanbanitem.component';


@NgModule({
  declarations: [
    KanbanboardComponent,
    KanbanlaneComponent,
    KanbanitemComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    StoreModule.forFeature(fromKanban.kanbanFeatureKey, fromKanban.reducers, { metaReducers: fromKanban.metaReducers })
  ]
})
export class KanbanModule { }
