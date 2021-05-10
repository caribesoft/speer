import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
   errorMessage: string;

  constructor(public authService: AuthService, private router: Router) { }

     signinForm = new FormGroup({
  	 email : new FormControl('', Validators.email ),
  	 password : new FormControl('', Validators.required ),
  	 name : new FormControl('', Validators.required ),

  })


  signUp() {
    let email = this.signinForm.value.email;
    let password = this.signinForm.value.password;
    let name = this.signinForm.value.name;

    this.authService.SignUp(email, password) 
    .then(res => {
        console.log(res);
      }, err => {
        this.errorMessage = err.message;
      })

  }   

  ngOnInit(): void {
  }

}
