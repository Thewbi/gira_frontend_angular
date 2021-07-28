import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../../models/task'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input()
  tasks!: Task[] | null;

  @Input()
  selectedTask!: Task | null;

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  selectTask = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
  }

  public onSelect(task: Task) {
    this.selectTask.emit(task);
  }

  delete(event: any, task: Task) {
    event.stopPropagation();
    this.deleteTask.emit(task);
  }

}
