import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { EcommerceServicceService } from 'src/app/ecommerce-servicce.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.css']
})
export class CartComponentComponent implements OnInit {


  cartData:any=[];

  displayDataCart:any = [];

  totalCartValue = 0;
  totalDiscountValue = 0;
  
  constructor( private eComservice:EcommerceServicceService,private httpClient:HttpClient){
   for ( var j = 0, len = localStorage.length; j < len; j++ ) 
    {   
     var object1   = JSON.parse(localStorage.getItem(localStorage.key( j )));   
    
     this.cartData.push(object1[0]);
     }
     console.log(this.cartData);
 
   //Starts here
     this.httpClient.get("./assets/productsData.json").subscribe(data=>{
     
      this.displayDataCart = data;
      this.displayDataCart.products.forEach(d=>{
        this.cartData.forEach(e => {
        if(d.productId==e.productId){
           e.productOriginalPrice = d.productOriginalPrice ;
           e.productDiscountPrice = d.productDiscountPrice ;
           e.Orgprice = Math.round(e.productOriginalPrice*e.quantity*e.selectedweight);
           e.DisPrice = Math.round(e.productDiscountPrice*e.quantity*e.selectedweight);
           if(e.weights.weight1.includes('ml'))
           {
            e.selWeight = e.selectedweight>=1?e.selectedweight+'lt':e.selectedweight*1000+'ml';
           }
           else if(e.weights.weight1.includes('g'))
           {
            e.selWeight = e.selectedweight>=1?e.selectedweight+'kg':e.selectedweight*1000+'g';
           }            
           this.totalCartValue = this.totalCartValue + (e.productDiscountPrice*e.quantity*e.selectedweight);
           this.totalDiscountValue = this.totalDiscountValue + (e.productOriginalPrice*e.quantity*e.selectedweight);
           }
          
        });
       


      });

     
    });

  }

  ngOnInit() {
    
  }

 /*Quantity Increment Button On Click*/
  incrementValue(p:any) {
    
    if(p.quantity>=1){ 
      p.quantity++; 

      this.totalCartValue = this.totalCartValue + (p.productDiscountPrice*p.selectedweight);
      
      this.totalDiscountValue = this.totalDiscountValue + (p.productOriginalPrice*p.selectedweight);


      p.Orgprice = Math.round(p.productOriginalPrice*p.quantity*p.selectedweight);
      p.DisPrice = Math.round(p.productDiscountPrice*p.quantity*p.selectedweight);

    
   
    this.eComservice.cartData(p);
   
    }
    
   }
  /*End Of Increment Button*/

  /*Quantity Decrement Button On Click*/
  decrementValue(p:any){
   
    console.log("decrementValue");
    if(p.quantity>1){
      p.quantity--; 
      
      this.totalCartValue = this.totalCartValue - (p.productDiscountPrice*p.selectedweight);
      this.totalDiscountValue = this.totalDiscountValue - (p.productOriginalPrice*p.selectedweight);
      p.Orgprice = Math.round(p.productOriginalPrice*p.quantity*p.selectedweight);
      p.DisPrice = Math.round(p.productDiscountPrice*p.quantity*p.selectedweight);

      this.eComservice.cartQtyDec(p);

    }
    else{
      
      this.eComservice.cartQtyRemove(p);
      history.go(0); 
    }
    
  }
  /*End Of Decrement Button*/


  removeValues(p:any){
    console.log("decrementValue");

    this.eComservice.cartQtyRemove(p);
    alert("Do you Want Remove :"+(p.productName));
    
   
    history.go(0);
    
  }


    checkOut(){
     this.eComservice.addCartDataToDataBase().subscribe(d=>
      {
      console.log("Saved Sccesfully",d);
       });


       this.eComservice.addCartDataToFirestore();
    }

  






  }
