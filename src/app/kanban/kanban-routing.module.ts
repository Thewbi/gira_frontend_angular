import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KanbanboardComponent } from './components/kanbanboard/kanbanboard.component';

const routes: Routes = [
  {
    path: '',
    component: KanbanboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KanbanRoutingModule {}
