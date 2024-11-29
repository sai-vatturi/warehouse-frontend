import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [DatePipe, NgIf, NgFor, CommonModule]
})
export class OrdersComponent implements OnInit {
  orders: any[] = []; // Holds the orders fetched from the backend

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchOrders();
  }

  // Fetch orders from the backend
  fetchOrders() {
    this.http.get('http://localhost:5000/api/orders').subscribe(
      (response: any) => {
        this.orders = response;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
