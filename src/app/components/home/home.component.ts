import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	errorMessage: string;
	user: any;

  constructor(public authService: AuthService, 
  	private router: Router,
  	private afAuth: AngularFireAuth) {


	this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        console.log("ACTIVO ", this.user)
      } else {
        this.user = '';
        console.log("DEACTIVO ", this.user)
        this.router.navigate(['login']);
      }
    })

   }


  ngOnInit(): void {
  }

}
