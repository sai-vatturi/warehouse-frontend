import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, NgFor],
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    role: '', // User's role (Admin, Supplier, Customer)
  };

  roles = ['Admin', 'Supplier', 'Customer']; // Dropdown options for roles

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:5000/api/auth/register', this.user).subscribe(
      (response: any) => {
        alert('Registration successful! You can now log in.');
        this.router.navigate(['/login']); // Redirect to login page
      },
      (error) => {
        alert('Registration failed. Please try again.');
      }
    );
  }
}
