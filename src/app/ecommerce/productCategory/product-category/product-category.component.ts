import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {



  productCategory:any=[];
 
   

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
         this.http.get("./assets/productCategory.json").subscribe(
           d=>{
             this.productCategory = d;
             console.log(this.productCategory);
           }
         );

         
  }


   //Passing Value To Products Page
   passProductCategory(p:any){
     
     this.router.navigate(['/app-products'],{ queryParams: { categoryId: p.productCategoryId} });
   }

}
