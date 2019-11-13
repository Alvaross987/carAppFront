import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { BrandService } from '../brand.service';
import { CountryService } from '../country.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-brand-country-form',
  templateUrl: './brand-country-form.component.html',
  styleUrls: ['./brand-country-form.component.css']
})
export class BrandCountryFormComponent implements OnInit {
  admin: Boolean;
  F: String;
  checkoutForm: FormGroup;
  elements: Object[];
  update: Boolean = false;
  brand: Boolean;
  element: any;
  button: String;
  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private brandService: BrandService,
    private countryService: CountryService) {

    this.checkoutForm = this.formBuilder.group({
      name: new FormControl("")
    });
  }
  countryOrbrand() {
    if (this.location.isCurrentPathEqualTo("/brand")) {
      this.F = "Brand";
      this.brand = true;
      this.brandService.getAllBrand().subscribe((brands) =>
        this.elements = brands);
    } else if (this.location.isCurrentPathEqualTo("/country")) {
      this.F = "Country";
      this.brand = false;
      this.countryService.getAllCountries().subscribe((countries) =>
        this.elements = countries);
    }
  }

  add(el :any){
    el = this.checkoutForm.value;
    if(this.update){
      el.id = this.element.id;
      if(this.brand){
        this.brandService.updateBrand(el).subscribe(c =>
          this.countryOrbrand());
      }else{
        this.countryService.updateCountry(el).subscribe(c =>
          this.countryOrbrand());
      }
      this.update = false;
      this.button = "Add";
    }else{
      if(this.brand){
        this.brandService.addBrand(el).subscribe(brand =>
          this.elements.push(brand));
      }else{
        this.countryService.addCountry(el).subscribe(country =>
          this.elements.push(country));
      }
    }
    this.checkoutForm.reset();
  }
  delete(id: number){
    if(this.brand){
      this.brandService.deleteBrand(id).subscribe(c =>
        this.countryOrbrand());
    }else{
      this. countryService.deleteCountry(id).subscribe(c =>
        this.countryOrbrand());
    }
      
  }
  cancelUpdate(){
    this.checkoutForm.reset();
    this.update = false;
  }

  authorization() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem("access_token");
    const decodedToken = helper.decodeToken(token);
    if(decodedToken.isadmin == 1){
      this.admin = true;
    }else{
      this.admin = false;
    }
  }
  updateMode(el: any) {
    this.checkoutForm.setValue({
      name: (el.name)
    });
    this.element = el;
    this.button = 'Update';
    this.update = true;
  }

  ngOnInit() {
    this.countryOrbrand();
    this.authorization();
    this.button = 'Add';
  }

}
