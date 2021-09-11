import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { TaskActionTypes } from '../../actions';
import {
  selectSelectedTask,
  selectTasks,
} from '../../selectors/task-selectors';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
})
export class TaskContainerComponent implements OnInit, OnChanges {
  @Input()
  public selectedProject!: Project | null;

  public selectedTask$: Observable<Task | null> =
    this.store.select(selectSelectedTask);

  public tasks$: Observable<Task[]> = this.store.select(selectTasks);

  constructor(private store: Store<any>) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedProject) {
      this.store.dispatch({
        type: TaskActionTypes.LoadTasksOfSelectedProject,
        payload: this.selectedProject,
      });
    }
  }

  addTask(task: Task) {
    if (this.selectedProject == null) {
      return;
    }
    task.project = this.selectedProject;
    let taskAndProject = { task: task, project: this.selectedProject };
    this.store.dispatch({
      type: TaskActionTypes.AddTask,
      payload: taskAndProject,
    });
  }

  selectTask(task: Task) {
    this.store.dispatch({
      type: TaskActionTypes.SelectTask,
      payload: task,
    });
  }

  deleteTask(task: Task) {
    this.store.dispatch({
      type: TaskActionTypes.DeleteTask,
      payload: task,
    });
  }
}
