import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {
  @Output() newCar: EventEmitter<Car> = new EventEmitter();
  UpdateMode: boolean = false;
  idUpdate: number;
  button = 'add';
  checkoutForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private carService: CarService) {
    this.checkoutForm = this.formBuilder.group({
      name: new FormControl(''),
      brand: new FormControl(''),
      country: new FormControl(''),
      registration: new FormControl(Date)
    });
  }

  updateMode(car: Car) {
    this.UpdateMode = true;
    this.idUpdate = car.id;
    this.button = 'update';
    this.checkoutForm.setValue({
      name: (car.name),
      brand: (car.brand),
      country: (car.country),
      registration: (car.registration)
    });
  }

  add(car: Car): void {
    car = this.checkoutForm.value;
    if (!car) { return; }
    if (this.UpdateMode) {
      car.id = this.idUpdate;
      this.UpdateMode = false;
    }
    this.button = 'add';
    this.newCar.emit(car);
    this.checkoutForm.reset();
  }

  ngOnInit() {

  }

}
