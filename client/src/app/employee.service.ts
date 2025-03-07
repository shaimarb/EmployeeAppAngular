import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private url = 'http://localhost:5200'; // The URL of the backend API to manage employees
    employees$ = signal<Employee[]>([]);  // Define a signal for employee list data
    employee$ = signal<Employee>({} as Employee); // Define a signal for a single employee's data

    constructor(private httpClient: HttpClient) { } // Inject HttpClient to interact with the backend API

    // Private method to refresh the employee list from the backend
    private refreshEmployees() {
        this.httpClient.get<Employee[]>(`${this.url}/employees`) // Make a GET request to fetch all employees
            .subscribe(employees => { // When the data is received, set it to the employees$ signal
                this.employees$.set(employees);
            });
    }

    // Public method to fetch and return the list of employees
    getEmployees() {
        this.refreshEmployees(); // Call the method to refresh the employee list
        return this.employees$();  // Return the current value of employees$ signal
    }

    // Public method to fetch a single employee by ID
    getEmployee(id: string) {
        this.httpClient.get<Employee>(`${this.url}/employees/${id}`) // Make a GET request to fetch the employee by ID
            .subscribe(employee => {  // When the data is received, set it to the employee$ signal
                this.employee$.set(employee);
                return this.employee$();  // Return the current value of employee$ signal
            });
    }

    // Public method to create a new employee
    createEmployee(employee: Employee) {
        return this.httpClient.post(`${this.url}/employees`, employee, { responseType: 'text' }); // POST request to create a new employee
    }

    // Public method to update an existing employee by ID
    updateEmployee(id: string, employee: Employee) {
        return this.httpClient.put(`${this.url}/employees/${id}`, employee, { responseType: 'text' }); // PUT request to update employee details
    }

    // Public method to delete an employee by ID
    deleteEmployee(id: string) {
        return this.httpClient.delete(`${this.url}/employees/${id}`, { responseType: 'text' }); // DELETE request to remove an employee
    }
}