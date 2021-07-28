import { Project } from './../../../models/project';
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  styleUrls: ["./project-form.component.scss"],
})
export class ProjectFormComponent implements OnInit {

  @Output()
  addProject = new EventEmitter<Project>();

  projectFormGroup = this.fb.group({
    projectname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10),]],
    description: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  submit(event: any): void {
    event.preventDefault();
    let project = this.projectFormGroup.value;
    project.id = -1;

    // clear the form because there are exceptions, when submitting the same data twice!
    this.projectFormGroup.reset();

    // this component will emit an event about a newly created project
    this.addProject.emit(project);
  }
}
