import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authenticationService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user:any={};
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {

    
  }


  loginUserData(u:any){
    //console.log("UserData :",u);
    if(u!=null&&u.userPhoneNumber==='7093094220'&&u.password==='7093094220'){
     // alert("SucessFully Logeed In");
      //document.getElementById("dialogBox").removeAttribute('hidden');
      console.log("In User");
      //window.print();
      
      //document.getElementById("show").removeAttribute('hidden');
      this.router.navigate(['/app-products']);
    }
    else{
      alert("Please Enter Correct UserName and Password");
      this.router.navigate(['/app-login']);
     
    }
  }

}
