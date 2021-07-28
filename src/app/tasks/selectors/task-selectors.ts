import { createSelector } from '@ngrx/store';
import { tasksFeatureKey, TaskState } from '../reducers';

// Selector for projects from the project feature slice

// first, select the feature slice from the global store state
export const selectTaskState = (state: any) => state[tasksFeatureKey];

// second, select the relevant property from the feature module's slice
export const selectTasks = createSelector(
  selectTaskState,
  (state: TaskState) => {
    return state?.tasks;
  }
);

// second, select the relevant property from the feature module's slice
export const selectSelectedTask = createSelector(
  selectTaskState,
  (state: TaskState) => {
    return state.selectedTask;
  }
);
