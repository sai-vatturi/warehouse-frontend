import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent {
  title = 'Warehouse Management';

  constructor(private router: Router) {}

  // Check if the user is logged in by looking for the JWT token
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout the user
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
