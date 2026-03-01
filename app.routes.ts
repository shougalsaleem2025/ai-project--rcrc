import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AdminSources } from './pages/admin-sources/admin-sources';
import { AdminSubscribers } from './pages/admin-subscribers/admin-subscribers';

 import { authGuard } from './guards/auth/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },

  {
    path: '',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: AdminDashboard },
      { path: 'sources', component: AdminSources },
      { path: 'subscribers', component: AdminSubscribers },
    ],
  },

  { path: '**', redirectTo: 'login' },
];