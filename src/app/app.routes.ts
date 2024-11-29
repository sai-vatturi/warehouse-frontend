import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'admin', loadComponent: () => import('./components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
  { path: 'supplier', loadComponent: () => import('./components/supplier-dashboard/supplier-dashboard.component').then(m => m.SupplierDashboardComponent) },
  { path: 'customer', loadComponent: () => import('./components/customer-dashboard/customer-dashboard.component').then(m => m.CustomerDashboardComponent) },
  { path: 'orders', loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent) },
  { path: '**', redirectTo: '/login' },
];
