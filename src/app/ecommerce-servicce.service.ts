import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { ArrayType } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database/database';



@Injectable({
  providedIn: 'root'
})
export class EcommerceServicceService {

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
 
  httpOptions = {
    headers: this.headers
  };

final:string;

  constructor(private httpClient : HttpClient,private firestore: AngularFirestore) { }

 myMessage = new Subject<string>();
 qtyValue = new Subject<string>();
//items = new Subject<ArrayType>();,



 dataFromFirebase(): Observable<ArrayType> {
  return this.httpClient.get<ArrayType>("https://vnrsf-40e18.firebaseio.com/products.json");
 }

//Sending Data To AppComponent Cart
 getMessage(): Observable<string> {
  return this.myMessage.asObservable();
  
 }

 //Sending Data To AppComponent Cart
 getQtyValue(): Observable<string> {
  return this.qtyValue.asObservable();
  
 }

/*
getArrayValues(): Observable<ArrayType> {
  return this.items.asObservable();
}*/


  cartData(products:any){
    var productData=[];
  productData.push(products);
  //console.log("Products:"+JSON.stringify(products));
 
  
  productData.forEach(data=>{

    let keyValue = ((data.productId).toString()).concat((data.selectedweight*100));
    console.log("keyValue :",keyValue);
    var initalval = localStorage.getItem(keyValue);
    // console.log("initalval :",JSON.parse(initalval));
    
    if(initalval != null )
    {
      var prodData = JSON.parse(initalval);
      //console.log( 'prodData.quantity'+ prodData);
      prodData[0].quantity = prodData[0].quantity + 1;
      //console.log("prodData[0].quantity",prodData[0].quantity);
      //this.qtyValue.next(prodData[0].quantity);
     localStorage.setItem(keyValue,JSON.stringify(prodData));
    }
    
   
    else
    {
      productData[0].quantity = 1;
      localStorage.setItem(keyValue,JSON.stringify(productData));
    }
    console.log('**All Values Start**');
    var cartSize = localStorage.length;
    this.myMessage.next(cartSize.toString());
    
    
    console.log('**End**');
  });
 /* for ( var j = 0, len = localStorage.length; j < len; ++j ) 
  { 
    //console.log(j + ' : ' + localStorage.getItem(localStorage.key( j )));  
    var object = JSON.parse(localStorage.getItem(localStorage.key( j )));
   
    itesss.push(object[0]);
  
    console.log(j + ' : ' + localStorage.getItem(localStorage.key( j )));
  }
  */
     
    }


    


  //While Decerement Value
  cartQtyDec(products:any){
    var productData=[];
  productData.push(products);
  var itesss:any=[];
  console.log("decrementValue In Service:");
  productData.forEach(data=>{

    let keyValue = ((data.productId).toString()).concat((data.selectedweight*100));
    var initalval = localStorage.getItem(keyValue);

    if(initalval != null)
    {
      var prodData = JSON.parse(initalval);
      console.log( 'prodData.quantity'+ prodData);
      prodData[0].quantity = prodData[0].quantity - 1;
      
      console.log("prodData[0].quantity",prodData[0].quantity);
      this.qtyValue.next(prodData[0].quantity);
      localStorage.setItem(keyValue,JSON.stringify(prodData));
    }
    else
    {
      productData[0].quantity = 1;
      localStorage.setItem(keyValue,JSON.stringify(productData));
    }
    console.log('**All Values Start**');
    var cartSize = localStorage.length;
    this.myMessage.next(cartSize.toString());
    for ( var j = 0, len = localStorage.length; j < len; ++j ) 
    { 
        
      var object1 = JSON.parse(localStorage.getItem(localStorage.key( j )));
     
      itesss.push(object1[0]);
      console.log(j + ' : ' + localStorage.getItem(localStorage.key( j ))); 
        
    }
    console.log('**End**');

    
  });

  }



  cartQtyRemove(p:any){
    localStorage.removeItem(((p.productId).toString()).concat((p.selectedweight*100)));
  }


    items=[];
  addCartDataToDataBase(){
    console.log("In Service");
    var object;
    for ( var j = 0, len = localStorage.length; j < len; ++j ){
      object = JSON.parse(localStorage.getItem(localStorage.key( j )));
      this.items.push(object[0]);
    }
 //${this.getEmployeeURL}/${id}
    console.log(JSON.stringify(this.items));
    var dataUrl = 'https://vnrsf-40e18.firebaseio.com/orders.json';
    return this.httpClient.put(dataUrl,this.items);
 
  }

   

  addCartDataToFirestore(){
    console.log("In Service");

    return this.firestore.collection('cartItemOrders').doc("9490457531").set({ ...this.items });
    
  }



  addUseraddressDetails(p:{}){
    var userdeatils=[];
    userdeatils.push(p);
    const dataUrl = 'https://vnrsf-40e18.firebaseio.com/userdetails/7093094220/.json';
    return this.httpClient.put(dataUrl,p);
  }


  getUseraddressDetails(){
    //var userdeatils=[];
    //userdeatils.push();
    const dataUrl = 'https://vnrsf-40e18.firebaseio.com/userdetails.json';
    return this.httpClient.get(dataUrl);
  }




}
