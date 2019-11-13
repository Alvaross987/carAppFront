import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CarFormComponent } from "../car-form/car-form.component";
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  admin: Boolean;
  private carForm: CarFormComponent;
  UpdateMode = false;
  car: Car;
  constructor(private route: ActivatedRoute,
    private carService: CarService,
    private router: Router) { }

  getCar(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.carService.getCar(id).subscribe(car => {
      this.car = car[0];
      if (this.car == undefined) this.goCars();
    });

  }

  updateCar(): Car {
    document.getElementById("child").hidden = false;
    return this.car;
  }
  update(car: Car): void {
    if (!car) { return; }
    car.id = this.car.id;
    this.carService.updateCar(car as Car).subscribe();
    this.goCars();
  }

  goCars(): void {
    this.router.navigateByUrl("/cars");
  }

  deleteCar(id: number) {
    if (!id) { return; }
    this.carService.deleteCar(id).subscribe();
    this.goCars();
  }
  authorization(): Boolean {
    const helper = new JwtHelperService();
    const token = localStorage.getItem("access_token");
    const decodedToken = helper.decodeToken(token);
    if(decodedToken.isadmin == 1){
      return true;
    }
    return false
  }
  ngOnInit() {
    this.getCar();
    this.admin = this.authorization();
  }

}
