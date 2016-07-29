import { Component, ViewEncapsulation } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateEmail, EmailValidatorDirective } from './email-validator';

class Hero {
  constructor(
    public id: number,
    public name: { first: string, last: string },
    public power: string,
    public alterEgo?: string
  ) { }
}

@Component({
  encapsulation: ViewEncapsulation.Native,
  selector: 'test-component-2',
  styleUrls: [
    './test.scss'
  ],
  template: `
    <div class="bla">test component 2</div>
  `
})
export class Test2Component {
}

@Component({
  selector: 'test-component',
  encapsulation: ViewEncapsulation.Native,
  styleUrls: [
    './test.scss'
  ],
  directives: [REACTIVE_FORM_DIRECTIVES, EmailValidatorDirective, Test2Component],
  template: `
    <form (submit)="onSubmit()" [formGroup]="testForm" novalidate>
      <div formGroupName="name">
        <div class="form-group">
          <label for="first">First Name</label>
          <input type="text" name="first" class="form-control" formControlName="first" validateEmail />
          <p *ngIf="testForm.controls.name.controls.first.errors?.email">
            Email invalid
          </p>
          <p *ngIf="testForm.controls.name.controls.first.errors?.required">
            This field is required
          </p>
        </div>

        <div class="form-group">
          <label for="last">Last Name</label>
          <input type="text" name="last" class="form-control" formControlName="last" />
        </div>
      </div>

      <div class="form-group">
        <label for="alterEgo">Alter Ego</label>
        <input type="text" name="alterEgo" class="form-control" formControlName="alterEgo" required />
      </div>

      <div class="form-group">
        <label for="power">Hero Power</label>
        <select class="form-control" name="power" formControlName="power">
          <option *ngFor="let p of powers" [value]="p">{{p}}</option>
        </select>
      </div>

      <button md-button type="submit">Submit</button>
    </form>
    <test-component-2></test-component-2>
  `
})
export default class TestComponent {
  submitted = false;

  powers = ['Smart', 'Flexible', 'Hot'];
  testForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.testForm = formBuilder.group({
      name: formBuilder.group({
        first: ['Al', Validators.required],
        last: ['Sam', Validators.required],
      }),
      alterEgo: '',
      power: this.powers[0]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log('submitted', this.testForm.hasError('email', ['name' , 'first']), this.testForm.valid);
  }
}
