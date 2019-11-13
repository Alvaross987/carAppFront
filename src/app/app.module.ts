import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { CarFormComponent } from './car-form/car-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CarComponent } from './car/car.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrandCountryFormComponent } from './brand-country-form/brand-country-form.component';

export function tokenGetter() {
  const token = localStorage.getItem("access_token");
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    CarFormComponent,
    CarComponent,
    LoginScreenComponent,
    NavBarComponent,
    BrandCountryFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    NgbModule,
    CommonModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme: "",
        skipWhenExpired: true,
        whitelistedDomains: ["localhost:8080", "localhost:4242"],
        blacklistedRoutes: ["localhost:8080/login"]
      }
    })

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
