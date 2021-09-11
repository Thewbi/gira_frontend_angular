import { Action } from '@ngrx/store';
import {
  AddTaskFinishedAction,
  ClearTaskStateAction,
  DeleteTaskAction,
  DeleteTaskFinishedAction,
  LoadAllTasksFinishedAction,
  LoadTasksOfSelectedProjectFinishedAction,
  SelectTaskAction,
  TaskActionTypes,
  UpdateTaskFinishedAction,
} from '../actions';
import { Task } from '../../models/task';

export function selectedTasksReducer(
  state: Task | null = null,
  action: Action
): Task | null {
  switch (action.type) {
    case TaskActionTypes.SelectTask: {
      let selectedTask = (action as SelectTaskAction).payload;
      return selectedTask;
    }
    case TaskActionTypes.DeleteTask: {
      let deletedTask = (action as DeleteTaskAction).payload;
      if (state?.id == deletedTask.task.id) {
        return null;
      }
      return state;
    }
    case TaskActionTypes.DeleteTaskFinished: {
      let deletedTask = (action as DeleteTaskFinishedAction).payload;
      if (state?.id == deletedTask.task.id) {
        return null;
      }
      return state;
    }
    case TaskActionTypes.ClearTaskState: {
      let selectedProject = (action as ClearTaskStateAction).payload;
      return null;
    }
    default:
      return state;
  }
}

export function tasksReducer(state: Task[] = [], action: Action): Task[] {
  switch (action.type) {
    case TaskActionTypes.AddTaskFinished: {
      let taskAndProject = (action as AddTaskFinishedAction).payload;
      return [...state, taskAndProject.task];
    }
    case TaskActionTypes.LoadAllTasksFinished: {
      let payload = (action as LoadAllTasksFinishedAction).payload;
      if (payload) {
        return [...payload];
      } else {
        return state;
      }
    }
    case TaskActionTypes.LoadTasksOfSelectedProjectFinished: {
      let payload = (action as LoadTasksOfSelectedProjectFinishedAction)
        .payload;
      if (payload) {
        return [...payload];
      } else {
        return state;
      }
    }
    case TaskActionTypes.DeleteTaskFinished: {
      let deletedTask = (action as DeleteTaskFinishedAction).payload;
      console.log('Filtering task: ', deletedTask);

      console.log('Before');
      console.dir(state);
      let result = state.filter((p) => p.id !== deletedTask.task.id);
      console.log('After');
      console.dir(result);

      return result;
    }
    case TaskActionTypes.ClearTaskState: {
      let selectedProject = (action as ClearTaskStateAction).payload;
      return [];
    }
    case TaskActionTypes.UpdateTaskFinished: {
      let task = (action as UpdateTaskFinishedAction).payload;
      // return a new array having one updated task replaced
      return state.map((value, index) => (value.id === task.id ? task : value));
    }
    default:
      return [...state];
  }
}
