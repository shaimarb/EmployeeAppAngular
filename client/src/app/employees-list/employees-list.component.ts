import { Component, OnInit, WritableSignal } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styleUrls: ['./employees-list.component.css'],
  templateUrl: './employees-list.component.html',

})
export class EmployeesListComponent implements OnInit {
  // Declare a property for the list of employees. Initially, it's an empty writable signal.
  employees$ = {} as WritableSignal<Employee[]>;
  displayedColumns: string[] = [
    'col-name',
    'col-position',
    'col-level',
    'col-action',
  ];

  constructor(private employeesService: EmployeeService) { } // Inject the EmployeeService to interact with the backend

  ngOnInit() {
    this.fetchEmployees(); // Fetch the list of employees when the component is initialized
  }

  // Method to delete an employee
  deleteEmployee(id: string): void {
    // Call delete method from the service and fetch the updated employee list
    this.employeesService.deleteEmployee(id).subscribe({
      next: () => this.fetchEmployees(), // On success, fetch updated employees
    });
  }

  // Private method to fetch the employee data from the service
  private fetchEmployees(): void {
    this.employees$ = this.employeesService.employees$; // Assign the observable of employees from the service
    this.employeesService.getEmployees(); // Call the service method to fetch the employees
  }
}