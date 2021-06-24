import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit {

  // form = new FormGroup({
  //   'username': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)] ),
  //   'password': new FormControl('', Validators.required)
  // });

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    console.dir(this.form.value);
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

}
