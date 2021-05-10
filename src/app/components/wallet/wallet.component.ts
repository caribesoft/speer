import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from '../../services/data.service';
import { Data } from '../../models/data.model';
import firebase from 'firebase';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

	transactions: Data[];
    balance: number=0;
    framount: number;
    errorMessage: string;
    actuser: string;

  constructor(private dataService: DataService) { 

    this.actuser = firebase.auth().currentUser.email;
  }


  addbalanceForm = new FormGroup({
  	 amount : new FormControl('', Validators.required ),

  })


  submitForm(){
  	this.errorMessage='';
  	this.framount = this.addbalanceForm.value.amount * 1; 
  	if(this.framount == 0){
  		 return
  	}
	  this.dataService.addTransaction(this.framount,this.actuser);
    this.errorMessage='Transfer successfully completed'; 
   }

  
  ngOnInit() {
  	/// GET ALL TRANSACTIONS ///
  	this.dataService.getAllTransactions(this.actuser).subscribe((catsSnapshot) => {
  	   this.balance = 0;
       this.transactions = [];
      catsSnapshot.forEach((catData: any) => {
        this.transactions.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data(),
        });
        this.balance += catData.payload.doc.data().amount;
      })
    });

  }



  

}
