import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styleUrls: ['./employee-form.component.css'],
  templateUrl: './employee-form.component.html',

})
export class EmployeeFormComponent {
  // Define an initial state for the employee form, which will receive values from the parent component
  initialState = input<Employee>();

  // Event Emitters to notify parent component when form values change or form is submitted
  @Output() formValuesChanged = new EventEmitter<Employee>();
  @Output() formSubmitted = new EventEmitter<Employee>();

  // Define the employee form with form controls and validation rules
  employeeForm;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form with fields: name, position, and level
    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],   // Name is required and should be at least 3 characters
      position: ['', [Validators.required, Validators.minLength(5)]],  // Position is required and should be at least 5 characters
      level: ['junior', [Validators.required]],  // Level is required, default to 'junior'
    });

    // Use the `effect` hook to set the form's initial values whenever `initialState` changes
    effect(() => {
      this.employeeForm.setValue({
        name: this.initialState()?.name || '', // Set 'name' from initialState or empty string
        position: this.initialState()?.position || '', // Set 'position' from initialState or empty string
        level: this.initialState()?.level || 'junior',  // Set 'level' from initialState or default to 'junior'
      });
    });
  }

  // Getter methods to access form control values
  get name() {
    return this.employeeForm.get('name')!; // Return 'name' form control
  }
  get position() {
    return this.employeeForm.get('position')!; // Return 'position' form control
  }
  get level() {
    return this.employeeForm.get('level')!; // Return 'level' form control
  }

  // Method to handle form submission, emitting the form values to the parent component
  submitForm() {
    this.formSubmitted.emit(this.employeeForm.value as Employee);
  }
}
