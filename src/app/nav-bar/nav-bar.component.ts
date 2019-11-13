import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  admin: Boolean;
  constructor(private router: Router) { }

  logout(){
      localStorage.clear();
      this.router.navigateByUrl("/login");
  }

  gocars(){
    this.router.navigateByUrl("/cars");
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

  ngOnInit() {
    this.authorization();
  }

}
