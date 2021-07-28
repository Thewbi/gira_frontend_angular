import { State } from './../../reducers/index';
import { createSelector } from '@ngrx/store';
import { projectsFeatureKey, ProjectState } from '../../projects/reducers';
import { tasksFeatureKey, TaskState } from '../../tasks/reducers';

// Selector for projects from the project feature slice

// first, select the feature slice from the global store state
export const selectTaskState = (state: any) => state[tasksFeatureKey];

// second, select the relevant property from the feature module's slice
export const selectTaskByState = createSelector(
  selectTaskState,
  (state: TaskState) => {
    return state.tasks.filter((task) => task.state === 'REQUESTED');
  }
);

// https://ngrx.io/guide/migration/v12
// factory selectors are used when parameters are required.
// Before, properties were used which are no deprecated.
export const selectTaskByStateFactorySelector = (taskState: string) =>
  createSelector(selectTaskState, (state: TaskState) => {
    return state.tasks.filter((task) => {
      return task.state === taskState;
    });
  });
