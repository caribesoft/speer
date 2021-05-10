import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletComponent } from './components/wallet/wallet.component';
import { SharesComponent } from './components/shares/shares.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { HomeComponent } from './components/home/home.component';
import { BuystockComponent } from './components/buystock/buystock.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'wallet', component: WalletComponent },
	{ path: 'shares', component: SharesComponent },
	{ path: 'portfolio', component: PortfolioComponent },
	{ path: 'buystock/:id', component: BuystockComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
