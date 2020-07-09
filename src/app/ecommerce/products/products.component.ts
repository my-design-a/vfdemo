import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EcommerceServicceService } from 'src/app/ecommerce-servicce.service';
import { Products } from '../productsData/products';
import { ActivatedRoute } from '@angular/router';






@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:any=[];
  cartData:any=[];
  itemName: string;
  Masterproducts:any=[];
  categoryId:string;
  
  

  

  constructor(private httpClient:HttpClient,private eservice:EcommerceServicceService,private route: ActivatedRoute) {
   

  
  this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
     })
    
  }

// Start Of Init
  ngOnInit() {
    
    this.getLatestCartData();     
    //this.eservice.dataFromFirebase().subscribe(d=>{
      this.httpClient.get("./assets/productsData.json").subscribe(d=>{
      this.products = d;
        console.log(d);
         this.Masterproducts = this.products.products;
         this.products.products.forEach(element => {
          
          var ele = element.weights.weight1;
          
         if(ele.includes('kg')||ele.includes('lt'))
         {
          var productWeight = parseInt(ele,10);
          element.selectedweight = productWeight;
          }
          else if(ele.includes('g')||ele.includes('ml')){ 
          var productWeight = (parseInt(ele,10))/1000;  
          element.selectedweight = productWeight;
         } 

          this.cartData.forEach(data=>{

          if(element.productId == data.productId && element.selectedweight == data.selectedweight){
            element.quantity = data.quantity; 
               
            }
           });  
           
      });
     
     }); 

     
     
     
   }

   //End Of Init

   
  
   runCheck = true;
  ngAfterViewChecked() {

    
   

  if(this.runCheck)
  { 
    
    if(this.products.length!=0 && this.products!='undefined')
    {
      console.log(this.products.products);
        this.products.products.forEach(element => {
          if(element.productCategory == this.categoryId &&(this.categoryId != null ||this.categoryId != 'undefined')){

          document.getElementById('prc1' + element.productId).setAttribute('style','background-color: brown;border-radius: 1rem;');
  
          var isprodExist = false;
          for (var i=0; i < this.cartData.length; i++) 
          {
            var p = this.cartData[i];           
            if(p.productId == element.productId && p.selectedweight == element.selectedweight)
            {
              console.log('p',p);
              isprodExist = true;
            }
        
          }
       
          if(element.quantity>1 || isprodExist){
         
            var ele1 = document.getElementById('crt' + element.productId);
            ele1.setAttribute('hidden','true');
           }          
           else if(element.quantity==1 && !isprodExist){
          
            var ele2 = document.getElementById('qnty' + element.productId);
            ele2.setAttribute('hidden','true');
           }
          }


          //Close Of If Condition


          else if(this.categoryId == null ||this.categoryId == 'undefined'){

            document.getElementById('prc1' + element.productId).setAttribute('style','background-color: brown;border-radius: 1rem;');
    
            var isprodExist = false;
            for (var i=0; i < this.cartData.length; i++) 
            {
              var p = this.cartData[i];           
              if(p.productId == element.productId && p.selectedweight == element.selectedweight)
              {
                console.log('p',p);
                isprodExist = true;
              }
          
            }
         
            if(element.quantity>1 || isprodExist){
           
              var ele1 = document.getElementById('crt' + element.productId);
              ele1.setAttribute('hidden','true');
             }          
             else if(element.quantity==1 && !isprodExist){
            
              var ele2 = document.getElementById('qnty' + element.productId);
              ele2.setAttribute('hidden','true');
             }
            }
        });   
        this.runCheck = false;
    }   
       
  }

  }
 
     //Adding Data on Click
     onButtonClickData(p:any){
       this.eservice.cartData(p);
       this.getLatestCartData(); 
     }

    /*Quantity Increment Button On Click*/
     incrementValue(p:any) {
        p.quantity++;
        if(p.quantity>1){ 
          this.eservice.cartData(p);
          this.getLatestCartData();      
        } 
     }
    /*End Of Increment Button*/

     /*Quantity Decrement Button On Click*/
     decrementValue(p:any){  
       if(p.quantity>1){
        p.quantity--;  
        this.eservice.cartQtyDec(p);      
        this.getLatestCartData();
      }      
      else
      {
        var crt = document.getElementById('crt' + p.productId);
        crt.removeAttribute('hidden');
        var qty = document.getElementById('qnty' + p.productId);
        qty.setAttribute('hidden','true');   
        this.eservice.cartQtyRemove(p);
        history.go(0);
      } 
      

     }
     /*End Of Decrement Button*/


    
    ///Add To Cart Button For mobile view
     onSelect(p:any){
       
      this.eservice.cartData(p);
      var crt = document.getElementById('crt' + p.productId);
      crt.setAttribute('hidden','true');
      var qty = document.getElementById('qnty' + p.productId);
      qty.removeAttribute('hidden');
      this.getLatestCartData();
     }


 
 
   //Changing Weights Accordingly

    onWeight(p:any){
    
      var product ;
      var isExist= false;
     
     var pId = (event.target as unknown as HTMLElement).id.toString();
     console.log("pId",p);
     
      var Id = pId.substring(4,pId.length);      
     
      this.products.products.forEach(element => {
        if(element.productId == Id){
           product = element;  
        }}); 

        //for checking include of kg and ml
        if(p.includes('kg')||p.includes('lt'))
        {
         console.log("IN KGS AND LTERS",p);
         
         var productWeight = parseInt(p,10);
         product.selectedweight = productWeight.toString();

         for (var i=0; i < this.cartData.length; i++) 
         {
            var p = this.cartData[i];  
            console.log('productWeight'+productWeight);
            console.log('p.selectedweight'+p.selectedweight);                 
            if(p.productId == Id && p.selectedweight == productWeight.toString())
            {
              product.quantity = p.quantity;
              console.log('p',p);
              var ele1 = document.getElementById('crt' + product.productId);
              ele1.setAttribute('hidden','true');
              var ele2 = document.getElementById('qnty' + product.productId);
              ele2.removeAttribute('hidden');
              isExist=true;
            }            
         }

         if(!isExist)
         {
            var ele1 = document.getElementById('crt' + product.productId);
            ele1.removeAttribute('hidden');
            var ele2 = document.getElementById('qnty' + product.productId);
            ele2.setAttribute('hidden','true'); 
         }
       
         if(pId.startsWith("prc1")){
         
          document.getElementById(pId).setAttribute('style','background-color: brown;border-radius: 1rem;');
          document.getElementById('prc2' + product.productId).removeAttribute('style');
          document.getElementById('prc3' + product.productId).removeAttribute('style');   
         }
         else if(pId.startsWith("prc2")){
          document.getElementById(pId).setAttribute('style','background-color: brown;border-radius: 1rem;');
          document.getElementById('prc1' + product.productId).removeAttribute('style');
          document.getElementById('prc3' + product.productId).removeAttribute('style');    
         }
         else if(pId.startsWith("prc3")){
          document.getElementById(pId).setAttribute('style','background-color: brown;border-radius: 1rem;');
          document.getElementById('prc2' + product.productId).removeAttribute('style');
          document.getElementById('prc1' + product.productId).removeAttribute('style');
         
         }      
        

         }

         //for checking include of g and ml
         else if(p.includes('g')||p.includes('ml')){
          
          var productWeight = (parseInt(p,10))/1000;
          product.selectedweight = productWeight.toString();          

         for (var i=0; i < this.cartData.length; i++) 
         {
            var p = this.cartData[i];                   
            if(p.productId == Id && p.selectedweight == productWeight.toString())
            {
              console.log('p',p);
              product.quantity = p.quantity;
              var ele1 = document.getElementById('crt' + product.productId);
              ele1.setAttribute('hidden','true');
              var ele2 = document.getElementById('qnty' + product.productId);
              ele2.removeAttribute('hidden');
              isExist=true;
            }            
         }

         if(!isExist)
         {
            var ele1 = document.getElementById('crt' + product.productId);
            ele1.removeAttribute('hidden');
            var ele2 = document.getElementById('qnty' + product.productId);
            ele2.setAttribute('hidden','true'); 
         }

         if(pId.startsWith("prc1")){
         
          document.getElementById(pId).setAttribute('style','background-color: brown;border-radius: 1rem;');
          document.getElementById('prc2' + product.productId).removeAttribute('style');
          document.getElementById('prc3' + product.productId).removeAttribute('style');         
         }
         else if(pId.startsWith("prc2")){
          document.getElementById(pId).setAttribute('style','background-color: brown;border-radius: 1rem;');
          document.getElementById('prc1' + product.productId).removeAttribute('style');
          document.getElementById('prc3' + product.productId).removeAttribute('style');  
         }
         else if(pId.startsWith("prc3")){
          document.getElementById(pId).setAttribute('style','background-color: brown;border-radius: 1rem;');
          document.getElementById('prc2' + product.productId).removeAttribute('style');
          document.getElementById('prc1' + product.productId).removeAttribute('style');
         }     
        }  
      }

       //For Searching products

       onClickSearch(){    
         
        
       if(this.itemName!=null){
       
        var searchData  = this.Masterproducts.filter(data=>{        
          var filterData = data;
          //filterData.productCategory.toUpperCase().match(this.itemName.toUpperCase());
          return filterData.productEName.toUpperCase().match(this.itemName.toUpperCase());   
        });
       
        this.products.products = searchData; 
        this.runCheck = true;
      }
        }
        
        getLatestCartData(){
          var items = [];
          for ( var j = 0, len = localStorage.length; j < len; ++j ){
            var object = JSON.parse(localStorage.getItem(localStorage.key( j )));
            items.push(object[0]);
          }
          this.cartData = items;
        }
}
