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
  LogginForm: FormGroup;
  RegisterForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private location: Location) {
    this.LogginForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    }),
      this.RegisterForm = this.formBuilder.group({
        username: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        firstname: new FormControl(''),
        lastname: new FormControl(''),
      });
  }

  login(user: User) {
    user = this.LogginForm.value;
    if (!user) return;
    const a = this.userService.login(user).subscribe(token => {
      localStorage.setItem("access_token", token[0]);
      this.goCars();
    });

  }

  register(user: User) {
    user = this.RegisterForm.value;
    const a = this.userService.addUser(user).subscribe();
    this.RegisterForm.reset();
  }



  goCars() {
    //this.router.navigateByUrl("/");
    this.location.back();
  }
  ngOnInit() {

  }

}
