import { Component, OnInit, WritableSignal } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [EmployeeFormComponent, MatCardModule],
  templateUrl: './edit-employee.component.html',
  styles: [''],
})
export class EditEmployeeComponent implements OnInit {
  // Define the employee as a WritableSignal, which will hold the employee data for editing
  employee = {} as WritableSignal<Employee>;

  // Constructor to inject Router, ActivatedRoute, and EmployeeService into the component
  constructor(
    private router: Router, // Router to navigate after updating employee
    private route: ActivatedRoute, // ActivatedRoute to retrieve route parameters (id)
    private employeeService: EmployeeService // Service to handle employee data operations
  ) { }

  // ngOnInit lifecycle hook to initialize the component and fetch the employee data by ID
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');     // Retrieve the 'id' from the URL route parameter
    // If no 'id' is provided, alert the user
    if (!id) {
      alert('No id provided');
    }

    // Call the getEmployee method from EmployeeService to fetch the employee data by ID
    this.employeeService.getEmployee(id!);
    // Assign the fetched employee data to the WritableSignal
    this.employee = this.employeeService.employee$;
  }

  // Method to handle the employee data update when the form is submitted
  editEmployee(employee: Employee) {
    // Call updateEmployee method from EmployeeService to update the employee in the backend
    this.employeeService
      .updateEmployee(this.employee()._id || '', employee)
      .subscribe({
        next: () => {
          // On successful update, navigate to the home page ('/')
          this.router.navigate(['/']);
        },
        error: (error) => {
          // If there's an error updating the employee, show an alert and log the error
          alert('Failed to update employee');
          console.error(error);
        },
      });
  }
}