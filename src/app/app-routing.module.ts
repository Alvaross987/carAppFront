import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { CarComponent } from './car/car.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: 'cars', component: CarsComponent },
  { path: 'cars/:id', component: CarComponent },
  { path: 'login', component: LoginScreenComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
