import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  constructor(public authService: AuthService, private router: Router) { }

  loginForm = new FormGroup({
  	 username : new FormControl('', Validators.required ),
  	 password : new FormControl('', Validators.required ),

  })

 

  signIn() {
    let email = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.authService.SignIn(email, password) 
    .then(res => {
        console.log(res);
      }, err => {
        this.errorMessage = err.message;
      })

  }

  ngOnInit(): void {
  }

}
