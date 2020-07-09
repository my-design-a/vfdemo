import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  productsData:any=[];
  itemName: string;


  searchedData:any=[];

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
    this.httpClient.get("./assets/productsData.json").subscribe(data=>{
      this.productsData = data;
      //console.log("this.productsData :",this.productsData)

    });
  }



  onClickSearch(){
    console.log(this.itemName);
    var ab=this.productsData.products.filter(data=>{
     
      var filterData = data;
      filterData.selectedweight = 1;
       console.log("this.itemName",filterData.productEName);
     //return filterData.productEName == this.itemName;  
        
      return filterData.productEName.toUpperCase().match(this.itemName.toUpperCase());  
    });
  
    
   this.searchedData = ab;
    console.log(ab);
     
    
  }

}
