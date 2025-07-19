import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { ProductListComponent } from './app/components/product-list/product-list';
import { ProductDetailComponent } from './app/components/product-detail/product-detail';
import { AppComponent } from './app/app';
import { HomeComponent } from './app/components/home/home.component';
import { UsersComponent } from './app/components/users/users.component';


const routes: Routes = [
  
  { path: 'yassin', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'product', component: ProductListComponent },
  { path: 'users', component: UsersComponent},
  { path: '', redirectTo: "/home" ,pathMatch: 'full'},
  { path: '**', redirectTo: "/home"},
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
  ]
});
