import { Action } from '@ngrx/store';
import { Task } from '../../models/task';
import { KanbanActionTypes, SelectTaskAction } from '../actions';

export function selectedTaskReducer(
  state: Task | null = null,
  action: Action
): Task | null {
  switch (action.type) {
    case KanbanActionTypes.SelectTask: {
      let selectedTask = (action as SelectTaskAction).payload;
      return selectedTask;
    }
    default:
      return state;
  }
}