import { Component, OnInit } from '@angular/core';
import { DialogbodyComponent } from '../../dialogbox/dialogbody/dialogbody.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EcommerceServicceService } from 'src/app/ecommerce-servicce.service';
import { Router } from '@angular/router';








@Component({
  selector: 'app-useraddress',
  templateUrl: './useraddress.component.html',
  styleUrls: ['./useraddress.component.css']
})
export class UseraddressComponent implements OnInit {
  name:any;
  UserDetails={'state':'Telangana','country':'India'};
  constructor(private router: Router,private toast:ToastrService,private ecom:EcommerceServicceService) { }

  ngOnInit() {
  
  
  }
  
 

  openDialog() {
    console.log("Ok");
    console.log("In ",this.name);
      
   /* const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="70%";
    this.dialog.open(DialogbodyComponent, dialogConfig);*/
    
  }
    

 
  onClickAddNewAddress(){
    console.log("In These Add New Address");
   // window.alert("In These Add New Address");
    // window.print();
    this.toast.success("ABCD","title");
    //this.toast.error("ABCD","title");
    //document.getElementById("newaddress").removeAttribute("hidden");
    this.router.navigate(['/app-dialogbody']);
  }


  onClickEditAddress(){
    //this.UserDetails.push("'state':'Telangana','country':'India'");
  
    console.log(this.UserDetails);
    this.ecom.addUseraddressDetails(this.UserDetails).subscribe(data=>{
    if(data!=null){
     console.log("successfully Saved",data)}
     else{
       console.error("error",data);
     }
    }
    );

    //document.getElementById("editaddress").removeAttribute("hidden");
  }


  doubleClick(){
    document.getElementById("editaddress").style.visibility = "hidden";;
  }


 
}
