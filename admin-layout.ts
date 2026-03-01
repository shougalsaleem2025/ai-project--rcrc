import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'],
})
export class AdminLayout {
  constructor(private auth: Auth, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}