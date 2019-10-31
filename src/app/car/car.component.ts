import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarFormComponent } from "../car-form/car-form.component";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  private carForm: CarFormComponent;
  UpdateMode = false;
  car: Car;
  constructor(private route: ActivatedRoute,
    private carService: CarService,
    private location: Location) { }

  getCar(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.carService.getCar(id).subscribe(car => {
      if(!car) this.goBack();
      car.find(car => {
        if (car.id = id) this.car = car;
      });
    });
  }

  updateCar(): Car {
    document.getElementById("child").hidden=false;
    return this.car;
  }
  update(car: Car): void {
    if (!car) { return; }
      car.id = this.car.id;
      this.carService.updateCar(car as Car).subscribe();
      this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  deleteCar(id: number) {
    if (!id) { return; }
    this.carService.deleteCar(id).subscribe();
    this.goBack();
  }

  ngOnInit() {
    this.getCar();
  }

}
