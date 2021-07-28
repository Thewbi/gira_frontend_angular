import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { selectedTasksReducer, tasksReducer } from './tasks-reducer';
import { Task } from '../../models/task';

/*
 * This value is used in tasks.module.ts and adds a slice to the global store state
 * for this feature module. The slice/property in the global store state uses
 * tasksFeatureKey's value as a name.
 */
export const tasksFeatureKey = 'tasks_slice';

export interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
}

export const initialTaskState: TaskState = {
  tasks: [],
  selectedTask: null,
};

export const reducers: ActionReducerMap<TaskState> = {
  tasks: tasksReducer,
  selectedTask: selectedTasksReducer,
};
