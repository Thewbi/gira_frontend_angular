import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-kanbanitem',
  templateUrl: './kanbanitem.component.html',
  styleUrls: ['./kanbanitem.component.scss'],
})
export class KanbanitemComponent implements OnInit {
  @Input()
  public task: Task | null;

  @Output()
  public selectTask = new EventEmitter<Task>();

  @Output()
  public deleteTask = new EventEmitter<Task>();

  constructor() {
    this.task = null;
  }

  ngOnInit(): void {}

  public onSelect(task: Task) {
    this.selectTask.emit(task);
  }

  //public onDeleteTask(event: any, task: Task | null) {
  public onDeleteTask(event: any, task: Task | null) {
    // console.log('onDeleteTask event: ', event, ' task: ', task);
    event.stopPropagation();
    if (task != null) {
      console.log('onDeleteTask Calling event emitter: ', this.deleteTask);
      this.deleteTask.emit(task);
    }
  }
}
