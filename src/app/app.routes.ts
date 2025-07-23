import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { ProductListComponent } from './components/product-list/product-list';


export const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'product', component: ProductListComponent },
  { path: '', redirectTo: "/home" ,pathMatch: 'full'},
  { path: '**', redirectTo: "/home"},
];
