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
      brand: new FormControl(''),
      country: new FormControl(''),
      registration: new FormControl(Date)
    });
  }

  updateMode(car: Car) {
    this.UpdateMode = true;
    this.idUpdate = car.id;
    this.button = 'update';
    var str:String;
    var d = new Date(car.registration);
    str = d.getFullYear().toString();
    if((d.getMonth()+1) < 10){
      str+= "-0" + (d.getMonth()+1);
    }else{
      str+= "-" + (d.getMonth()+1);
    }
    if(d.getDate() < 10){
      str+= "-0" + d.getDate();
    }else{
      str+= "-" + d.getDate();
    }
    
    this.checkoutForm.setValue({
      brand: (car.brand),
      country: (car.country),
      registration: (str)
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
