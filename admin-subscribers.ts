import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Subscriber = {
  id: string;
  email: string;
  status: 'Active' | 'Unsubscribed';
  createdAt: string;
};

@Component({
  selector: 'app-admin-subscribers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-subscribers.html',
  styleUrls: ['./admin-subscribers.css'],
})
export class AdminSubscribers {
  private storageKey = 'tn_subscribers';

  q = '';
  newEmail = '';
  items: Subscriber[] = [];

  ngOnInit() {
    this.items = this.load();

    if (this.items.length === 0) {
      this.items = [
        this.make('employee1@rcrc.gov.sa', 'Active'),
        this.make('employee2@rcrc.gov.sa', 'Active'),
        this.make('employee3@rcrc.gov.sa', 'Unsubscribed'),
      ];
      this.save();
    }
  }

  get filtered(): Subscriber[] {
    const term = (this.q || '').trim().toLowerCase();
    if (!term) return this.items;

    return this.items.filter((x) => x.email.toLowerCase().includes(term));
  }

  get total() {
    return this.items.length;
  }

  get activeCount() {
    return this.items.filter((x) => x.status === 'Active').length;
  }

  get unsubCount() {
    return this.items.filter((x) => x.status === 'Unsubscribed').length;
  }

  add() {
    const email = (this.newEmail || '').trim().toLowerCase();
    if (!email) return;

    if (!this.isValidRcrcEmail(email)) {
      alert('Email must be on rcrc.gov.sa domain');
      return;
    }

    const exists = this.items.some((x) => x.email === email);
    if (exists) {
      alert('This email already exists');
      return;
    }

    this.items = [this.make(email, 'Active'), ...this.items];
    this.newEmail = '';
    this.save();
  }

  toggle(sub: Subscriber) {
    sub.status = sub.status === 'Active' ? 'Unsubscribed' : 'Active';
    this.save();
  }

  remove(sub: Subscriber) {
    const ok = confirm(`Delete ${sub.email}?`);
    if (!ok) return;

    this.items = this.items.filter((x) => x.id !== sub.id);
    this.save();
  }

  setAll(status: 'Active' | 'Unsubscribed') {
    const ok = confirm(
      status === 'Active'
        ? 'Activate all subscribers?'
        : 'Unsubscribe all subscribers?'
    );
    if (!ok) return;

    this.items = this.items.map((x) => ({ ...x, status }));
    this.save();
  }

  trackById(_: number, x: Subscriber) {
    return x.id;
  }

  private make(email: string, status: Subscriber['status']): Subscriber {
    return {
      id: crypto?.randomUUID?.() ?? String(Date.now() + Math.random()),
      email,
      status,
      createdAt: new Date().toISOString(),
    };
  }

  private isValidRcrcEmail(email: string) {
    return /^[^\s@]+@rcrc\.gov\.sa$/i.test(email);
  }

  private load(): Subscriber[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }
}