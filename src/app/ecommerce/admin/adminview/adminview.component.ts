import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent implements OnInit {

  productCategory:any=[];
   cartnum : string;

  constructor(private http:HttpClient) { 

    var items = localStorage.getItem("123454");

    //var res = items.concat("Hello Added");

    //console.log(items);
    //console.log("Cart Items",localStorage.getItem("123454"));
    var object = JSON.parse(items);
   var array = [];
   for(var i in object) {
    array.push(object[i]);
    }
    console.log("In Array",array);
    var num =array.length;
   
    this.cartnum = num.toString();
    console.log("Array Values",this.cartnum);



  }


  ngOnInit() {


    this.http.get("./assets/productCategory.json").subscribe(
      d=>{
        this.productCategory = d;
        console.log(this.productCategory);
      }
    );
  }




  incButton(p:any){
    console.log("this clicked",p.productCategoryId);
   p=document.getElementById('inc').classList.add('hide'); 
   //document.getElementById('dec').classList.remove('hide');
  }


}
