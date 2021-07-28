import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskContainerComponent } from './components/task-container/task-container.component';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './effects/task.effects';
import { StoreModule } from '@ngrx/store';
import * as fromTasks from './reducers';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskContainerComponent, TaskFormComponent, TaskListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([TaskEffects]),
    StoreModule.forFeature(fromTasks.tasksFeatureKey, fromTasks.reducers, {
      //metaReducers: fromTasks.metaReducers,
    }),
  ],
  exports: [TaskContainerComponent],
})
export class TasksModule {}
