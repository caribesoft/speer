import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Data } from '../../models/data.model';
import firebase from 'firebase';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
	portfolio: Data[];
	actuser: string;

  constructor(private dataService: DataService) {
  		this.actuser = firebase.auth().currentUser.email;
        console.log("Active User ", this.actuser)
   }

  ngOnInit() {
  	/// GET ALL PORTFOLIO ///
  	this.dataService.getPortfolio(this.actuser).subscribe((catsSnapshot) => {
       this.portfolio = [];
      catsSnapshot.forEach((catData: any) => {
        this.portfolio.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data(),
        });
      })
    });

  }

}
