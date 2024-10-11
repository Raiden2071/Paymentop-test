import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '**', loadComponent: () => import('./feature/books/books.component').then(m => m.BooksComponent) }
];
