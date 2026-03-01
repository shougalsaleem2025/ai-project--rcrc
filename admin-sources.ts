import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type SourceItem = {
  id: string;
  name: string;
  url: string;
  category: string;
  enabled: boolean;
  createdAt: string;
};

@Component({
  selector: 'app-admin-sources',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-sources.html',
  styleUrls: ['./admin-sources.css'],
})
export class AdminSources {
  private storageKey = 'tn_sources';

  q = '';
  name = '';
  url = '';
  category = 'Tech';
  enabled = true;

  items: SourceItem[] = [];

  ngOnInit() {
    this.items = this.load();

    if (this.items.length === 0) {
      this.items = [
        this.make('Google AI Blog', 'https://blog.google/technology/ai/rss/', 'AI', true),
        this.make('Microsoft AI Blog', 'https://blogs.microsoft.com/ai/feed/', 'AI', true),
        this.make('AWS News Blog', 'https://aws.amazon.com/blogs/aws/feed/', 'Cloud', true),
      ];
      this.save();
    }
  }

  get filtered(): SourceItem[] {
    const term = (this.q || '').trim().toLowerCase();
    if (!term) return this.items;

    return this.items.filter((x) => {
      const hay = `${x.name} ${x.url} ${x.category}`.toLowerCase();
      return hay.includes(term);
    });
  }

  get total() {
    return this.items.length;
  }

  get enabledCount() {
    return this.items.filter((x) => x.enabled).length;
  }

  get disabledCount() {
    return this.items.filter((x) => !x.enabled).length;
  }

  add() {
    const n = (this.name || '').trim();
    const u = (this.url || '').trim();
    const c = (this.category || '').trim() || 'Tech';

    if (!n || !u) return;

    if (!this.isValidUrl(u)) {
      alert('Please enter a valid URL (https://...)');
      return;
    }

    const exists = this.items.some((x) => x.url.toLowerCase() === u.toLowerCase());
    if (exists) {
      alert('This source URL already exists');
      return;
    }

    this.items = [this.make(n, u, c, this.enabled), ...this.items];
    this.name = '';
    this.url = '';
    this.category = 'Tech';
    this.enabled = true;
    this.save();
  }

  toggle(x: SourceItem) {
    x.enabled = !x.enabled;
    this.save();
  }

  remove(x: SourceItem) {
    const ok = confirm(`Delete source?\n\n${x.name}`);
    if (!ok) return;

    this.items = this.items.filter((s) => s.id !== x.id);
    this.save();
  }

  setAllEnabled(enabled: boolean) {
    const ok = confirm(enabled ? 'Enable all sources?' : 'Disable all sources?');
    if (!ok) return;

    this.items = this.items.map((x) => ({ ...x, enabled }));
    this.save();
  }

  trackById(_: number, x: SourceItem) {
    return x.id;
  }

  private make(name: string, url: string, category: string, enabled: boolean): SourceItem {
    return {
      id: crypto?.randomUUID?.() ?? String(Date.now() + Math.random()),
      name,
      url,
      category,
      enabled,
      createdAt: new Date().toISOString(),
    };
  }

  private isValidUrl(u: string) {
    try {
      const x = new URL(u);
      return x.protocol === 'http:' || x.protocol === 'https:';
    } catch {
      return false;
    }
  }

  private load(): SourceItem[] {
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