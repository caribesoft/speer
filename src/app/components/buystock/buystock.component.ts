import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Data } from '../../models/data.model';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import firebase from 'firebase';

@Component({
  selector: 'app-buystock',
  templateUrl: './buystock.component.html',
  styleUrls: ['./buystock.component.css']
})

export class BuystockComponent implements OnInit {
     shareId: string;
     displayedColumns: string[] = ['symbol', 'name', 'price', 'change', 'chgper', 'volume', 'buy'];
     shares: Data[];
     public qty: number;
     price:number;
     symbol: string;
     name: string;
     msgError: string;
     balance: number=0;
     transactions: Data[];
     actuser: string;

  constructor(private _Activatedroute:ActivatedRoute, 
    private dataService: DataService,
    private router: Router ) { 

  	this.shareId=this._Activatedroute.snapshot.paramMap.get("id");
  	console.log("Share ", this.shareId);
    this.actuser = firebase.auth().currentUser.email;



    /// GET SHARE DETAILS ///
    this.dataService.getOneShare(this.shareId).subscribe((catsSnapshot) => {
       this.shares = [];
      catsSnapshot.forEach((catData: any) => {
        this.shares.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data(),
        });
      })
      console.log("SHARE DET ", this.shares[0].data.price)
      this.price = this.shares[0].data.price;
      this.symbol = this.shares[0].data.symbol;
      this.name = this.shares[0].data.name;
    });

  }

  submitForm(){
    this.msgError = '';
    if(!this.qty){
      this.msgError = 'Please eneter quantity';
      return
    }

    let total = this.qty * this.price;
    let qty = this.qty;
    let balance = this.balance;
    let symbol = this.symbol;
    let name = this.name;
    let price = this.price;

    console.log("TOTAL ", this.qty,  total, this.balance, this.symbol, this.name);
    
    // Validate Funds //
    if(total > this.balance){
      this.msgError = 'insufficient funds for your purchase, reload your wallet!';
      return
    } 

    // Add to Portfolio & Create transaction //
    this.dataService.addToPortfolio(qty,total,symbol,name,price,this.actuser);
    this.msgError = 'Transaction completed!';
    this.router.navigate(['wallet']);
  }


  ngOnInit() {
    /// Get the balance ///
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
