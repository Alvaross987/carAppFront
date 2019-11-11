import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {
  checkoutForm: FormGroup;
  token: String;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private location: Location) {
    this.checkoutForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
   }

   login(user: User){
     user= this.checkoutForm.value;
     if(!user) return;
     const a = this.userService.login(user).subscribe(token => {
       localStorage.setItem("access_token",token[0]);
    });
    (async () => { 
      await this.sleep(300);
      this.goCars();
    })();
    
    
   }
   sleep(n: number): any{
    return new Promise(resolve => setTimeout(resolve, n));
   }
   goCars(){
     //this.router.navigateByUrl("/");
     this.location.back();
   }
  ngOnInit() {

  }

}
