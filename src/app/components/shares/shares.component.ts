import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Data } from '../../models/data.model';
import firebase from 'firebase';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrls: ['./shares.component.css']
})
export class SharesComponent implements OnInit {

	shares: Data[];

  constructor(private dataService: DataService) { }



 
  ngOnInit() {
  	/// GET ALL SHARES ///
  	this.dataService.getAllShares().subscribe((catsSnapshot) => {
       this.shares = [];
      catsSnapshot.forEach((catData: any) => {
        this.shares.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data(),
        });
      })
    });
  }

}
