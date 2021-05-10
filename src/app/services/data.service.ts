import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	message:string='';

 
  constructor(public firestore: AngularFirestore) { }


  getAllTransactions(activeuser) {
    return this.firestore.collection('transactions', ref => ref.orderBy('timestamp', 'desc')
      .where('uid','==', activeuser)).snapshotChanges();
  }

  getAllShares() {
    return this.firestore.collection('stock', ref => ref.orderBy('symbol')).snapshotChanges();
  }

  getOneShare(id) {
    return this.firestore.collection('stock', ref => ref.where('symbol','==',id)).snapshotChanges();
  }

  getPortfolio(activeuser) {
    return this.firestore.collection('portfolio', ref => ref.orderBy('timestamp', 'desc')
      .where('uid','==', activeuser)).snapshotChanges();
  }

 addTransaction(amount,activeuser) { 
    let now = Date.now();
    return this.firestore.collection('transactions').add({
		  trantype: 'D',
      decrip: 'Funds added',
		  amount: amount,
		  timestamp: now,
      uid: activeuser,	
  	});
  }

  addToPortfolio(qty,total,symbol,name,price,activeuser){
    let now = Date.now();
    this.firestore.collection('portfolio').add({
      qty: qty,
      price: price,
      symbol: symbol,
      name: name,
      timestamp: now,
      uid: activeuser,  
    });

    /// create transaction ///
    total = total * -1;
    return this.firestore.collection('transactions').add({
      trantype: 'C',
      amount: total,
      timestamp: now,
      decrip: 'Stock purchase', 
      uid: activeuser, 
    });
      
  }

}
