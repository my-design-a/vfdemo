import { Component } from '@angular/core';
import {EcommerceServicceService } from './ecommerce-servicce.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Data';
 
   cartnum : string;
 
  numberOfProducts: string;

  

  constructor(private eService:EcommerceServicceService){

 




   
    this.eService.getMessage()
      .subscribe(mymessage => {
        console.log('Getting value from Data Sending component: ', mymessage);
        
        this.numberOfProducts = mymessage
      });

      var cartSize = localStorage.length;
      this.numberOfProducts = cartSize.toString();

  }

  ngOnInit() {
   

  }
  

  
}
