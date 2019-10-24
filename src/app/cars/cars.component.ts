import { Component, OnInit, PipeTransform } from '@angular/core';
import { Car } from '../car';
import { CarService } from "../car.service";
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  providers: [DatePipe]
})
export class CarsComponent implements OnInit {
  car: Car;
  UpdateMode = false;
  cars: Car[] = [];
  cars$: Observable<Car[]>;
  filter = new FormControl('');

  search(text: string, pipe: PipeTransform): Car[] {
    return this.cars.filter(car => {
      const term = text.toLowerCase();
      return car.brand.toLowerCase().includes(term)
        || pipe.transform(car.registration, 'shortDate').includes(term);
    });
  }

  constructor(private carService: CarService,
    private pipe: DatePipe) { }

  ngOnInit() {
    this.getCars();

  }

  add(car: Car): void {
    if (!car) { return; }
    if (this.UpdateMode) {
      this.carService.updateCar(car as Car).subscribe();
      this.UpdateMode = false;
    } else {
      this.carService.addCar(car as Car)
        .subscribe(car => {
          this.cars.push(car);
        });
    }
    this.getCars();
  }


  getCars(): void {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.initFilter();
    });
  }
  updateCar(id: number): Car {
    this.UpdateMode = true;
    this.car = this.cars.find(c => c.id == id);
    return this.car;
  }
  deleteCar(id: number) {
    if (!id) { return; }
    this.carService.deleteCar(id).subscribe();
    this.getCars();
  }

  initFilter() {
    this.cars$ = this.filter.valueChanges.pipe(
      startWith(this.filter.value),
      map(text => this.search(text, this.pipe)));
  }

}
