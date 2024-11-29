import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:5000/api/auth/login', this.credentials).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      const role = JSON.parse(atob(response.token.split('.')[1])).role;

      if (role === 'Admin') this.router.navigate(['admin']);
      else if (role === 'Supplier') this.router.navigate(['supplier']);
      else if (role === 'Customer') this.router.navigate(['customer']);
    }, error => {
      alert('Invalid credentials! Please try again.');
    });
  }
}
