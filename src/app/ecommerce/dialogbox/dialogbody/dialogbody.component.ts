import { Component, OnInit} from '@angular/core';
import { EcommerceServicceService } from 'src/app/ecommerce-servicce.service';



@Component({
  selector: 'app-dialogbody',
  templateUrl: './dialogbody.component.html',
  styleUrls: ['./dialogbody.component.css']
})
export class DialogbodyComponent implements OnInit {
  
   cartData=[];
   userAddress:any=[];
   totalCartValue=0;
   totalDiscountValue=0;
  constructor(private ecom:EcommerceServicceService) {
    this.ecom.getUseraddressDetails().subscribe(data=>{
      var a = data;
      this.userAddress.push(a["7093094220"]);
    });
   }
  
  
     ngOnInit(): void {
    
      for ( var j = 0, len = localStorage.length; j < len; j++ ) 
      {   
       var object1   = JSON.parse(localStorage.getItem(localStorage.key( j )));   
      
       this.cartData.push(object1[0]);
      }
      this.cartData.forEach(e=>{
        if(e.weights.weight1.includes('ml'))
            {
             e.selWeight = e.selectedweight>=1?e.selectedweight+' lt':e.selectedweight*1000+' ml';
            }
            else if(e.weights.weight1.includes('g'))
            {
             e.selWeight = e.selectedweight>=1?e.selectedweight+' kg':e.selectedweight*1000+' gms';
            } 
            this.totalCartValue = this.totalCartValue + (e.productDiscountPrice*e.quantity*e.selectedweight);
            this.totalDiscountValue = this.totalDiscountValue + (e.productOriginalPrice*e.quantity*e.selectedweight);
            
        }
        
         );
     
    }
    
    getUserDetails(){
      // this.ecom.getUseraddressDetails().subscribe(data=>{
      //   var a = data;
      //   this.userAddress.push(a["7093094220"]);
      // });
      window.print();
    }


  
}
