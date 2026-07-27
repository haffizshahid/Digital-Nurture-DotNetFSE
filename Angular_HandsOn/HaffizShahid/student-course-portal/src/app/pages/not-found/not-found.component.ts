import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container not-found-card">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist in the Student Course Portal.</p>
      <a routerLink="/" class="btn btn-primary">Return to Home</a>
    </div>
  `,
  styles: [`
    .not-found-card {
      text-align: center;
      padding: 5rem 2rem;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      margin-top: 2rem;
    }
    h1 { font-size: 5rem; color: var(--danger-color); font-weight: 900; }
    h2 { margin-bottom: 1rem; }
    p { color: var(--text-muted); margin-bottom: 2rem; }
  `]
})
export class NotFoundComponent {}
