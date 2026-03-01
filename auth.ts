import { Injectable } from '@angular/core';

type User = {
  email: string;
  role: 'Admin';
};

@Injectable({ providedIn: 'root' })
export class Auth {
  private key = 'tn_user';

  getUser(): User | null {
    const raw = localStorage.getItem(this.key);
    return raw ? (JSON.parse(raw) as User) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  login(email: string, password: string): { ok: boolean; message?: string } {
    const e = (email || '').trim().toLowerCase();
    const p = (password || '').trim();

    if (e === 'admin@rcrc.gov.sa' && p === 'Admin@123') {
      localStorage.setItem(this.key, JSON.stringify({ email: e, role: 'Admin' }));
      return { ok: true };
    }

    return { ok: false, message: 'Invalid email or password' };
  }

  logout() {
    localStorage.removeItem(this.key);
  }
}