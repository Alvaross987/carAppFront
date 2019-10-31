import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from "@angular/forms";
import { Country } from '../country';
import { Brand } from '../brand';
import { BrandService } from '../brand.service';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {
  @Output() newCar: EventEmitter<Car> = new EventEmitter();
  colours = ["Red", "Blue", "White", "Black"];

  countries: Country[];
  brands: Brand[];
  UpdateMode: boolean = false;
  idUpdate: number;
  button = 'add';
  checkoutForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private countryService: CountryService) {
      
    this.checkoutForm = this.formBuilder.group({
      brand: new FormControl([]),
      country: new FormControl([]),
      registration: new FormControl(Date),
      color: new FormControl(''),
      model: new FormControl('')
    });
  }


  updateMode(car: Car) {
    this.UpdateMode = true;
    this.idUpdate = car.id;
    this.button = 'update';
    var str: String;
    var d = new Date(car.registration);
    str = d.getFullYear().toString();
    if ((d.getMonth() + 1) < 10) {
      str += "-0" + (d.getMonth() + 1);
    } else {
      str += "-" + (d.getMonth() + 1);
    }
    if (d.getDate() < 10) {
      str += "-0" + d.getDate();
    } else {
      str += "-" + d.getDate();
    }

    this.checkoutForm.setValue({
      brand: (car.brand.id),
      country: (car.country.id),
      registration: (str),
      color: (car.color),
      model: (car.model)
    });
  }

  add(car: Car): void {
    const a = this.checkoutForm.value;
    car = this.makeCar(a);
    if (!car) { return; }
    if (this.UpdateMode) {
      car.id = this.idUpdate;
      this.UpdateMode = false;
    }
    this.button = 'add';
    this.newCar.emit(car);
    this.checkoutForm.reset();
  }

  makeCar(a: any): Car {
    const car = new Car;
    const brand = new Brand;
    const country = new Country;
    brand.id = a.brand;
    country.id = a.country;
    car.brand = brand;
    car.country = country;
    car.registration = a.registration;
    car.model = a.model;
    car.color = a.color;
    return car;
  }

  getResources(): void {
    this.brandService.getAllBrand().subscribe((brand) => {
      this.brands = brand;
    });
    this.countryService.getAllCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  ngOnInit() {
    this.getResources();
  }

}
