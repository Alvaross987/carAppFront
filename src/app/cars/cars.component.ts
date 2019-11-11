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
  cars: Car[] = [];
  cars$: Observable<Car[]>;
  filter = new FormControl('');
  
  search(text: string, pipe: PipeTransform): Car[] {
    return this.cars.filter(car => {
      const term = text.toLowerCase();
      return car.brand.name.toLowerCase().includes(term)
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
      this.carService.addCar(car as Car)
        .subscribe(car => {
          this.cars.push(car);
        });
    this.getCars();
  }


  getCars(): void {
    this.cars = null;
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.initFilter();
    });
  }

  initFilter() {
    this.cars$ = this.filter.valueChanges.pipe(
      startWith(this.filter.value),
      map(text => this.search(text, this.pipe)));
  }

}
