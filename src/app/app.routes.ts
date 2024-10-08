import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';

export const routes: Routes = [
    {path: '', component: BooksComponent, pathMatch: 'full'},
];
