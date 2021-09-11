import { Task } from './../../../models/task';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Output()
  addTask = new EventEmitter<Task>();

  public task?: Task;

  public displayed = false;

  taskFormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
    ],
    description: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  btnSubmitClicked(event: any): void {
    // do not reload the page on submit
    event.preventDefault();
    let tempTask = this.taskFormGroup.value;
    // let the database generate an id
    tempTask.id = -1;
    // state is initially unknown
    tempTask.state = 'UNKNOWN';
    // clear the form because there are exceptions, when submitting the same data twice!
    this.taskFormGroup.reset();
    // this component will emit an event about a newly created task
    // call the callback
    this.addTask.emit(tempTask);
  }

  btnPopupClicked(event: any): void {
    this.taskFormGroup = this.fb.group({
      name: [
        this.task?.name,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      description: [this.task?.description],
    });

    this.displayed = true;
    console.log('this.displayed: ', this.displayed);
  }

  btnClosePopupClicked(event: any): void {
    this.displayed = false;
    console.log('this.displayed: ', this.displayed);
  }
}
