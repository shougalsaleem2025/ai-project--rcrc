import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  doLogin() {
    this.error = '';

    const email = (this.email || '').trim().toLowerCase();
    const password = (this.password || '').trim();

    if (!email || !password) {
      this.error = 'Enter email & password';
      return;
    }

    this.loading = true;

    const res = this.auth.login(email, password);

    this.loading = false;

    if (!res?.ok) {
      this.error = res?.message || 'Login failed';
      return;
    }

    // ✅ عندك الأدمن على المسار الأساسي (داخل AdminLayout)
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}