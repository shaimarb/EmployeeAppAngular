import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [EmployeeFormComponent, MatCardModule],
  templateUrl: './add-employee.component.html',
  styles: [''],
})
export class AddEmployeeComponent {
  // Constructor to inject Router and EmployeeService into the component
  constructor(
    private router: Router, // Router for navigation after adding employee
    private employeeService: EmployeeService // Service to manage employee data
  ) { }

  // Method to handle the submission of employee data
  addEmployee(employee: Employee) {
    // Call createEmployee method from the EmployeeService to add a new employee
    this.employeeService.createEmployee(employee).subscribe({
      next: () => {
        // On successful employee creation, navigate to the home route ('/')
        this.router.navigate(['/']);
      },
      error: (error) => {
        // If there's an error during the employee creation, alert and log the error
        alert('Failed to create employee');
        console.error(error);
      },
    });
    // Fetch the updated list of employees after creating the new employee (optional, depending on your use case)
    this.employeeService.getEmployees();
  }
}