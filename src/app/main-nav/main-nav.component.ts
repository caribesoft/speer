import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  @ViewChild('drawer') drawer: any;
  user: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, 
  	private afAuth: AngularFireAuth,
  	public authService: AuthService,
  	private router: Router) {

  	this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
      } else {
      	this.user = '';
      }
    })

  }

  closeSideNav() {
  if (this.drawer._mode=='over') {
    this.drawer.close();
  }
}


  logOut(){
		this.authService.SignOut();
		
	}

}
