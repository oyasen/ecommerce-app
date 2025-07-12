import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { ProductListComponent } from './app/components/product-list/product-list';
import { ProductDetailComponent } from './app/components/product-detail/product-detail';
import { AppComponent } from './app/app';


const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
  ]
});
