import { Component, OnInit } from '@angular/core';
import { EcommerceServicceService } from 'src/app/ecommerce-servicce.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  UserDetails;
  villageName:String;
  villageCode:String;
  pinC:String = 'PinCode';

  villages = [
    {name:'Gambhirpur(గంభీర్ పూర్)',code:'GMP'},
    {name:'Thandriyal(తండ్రియాల)',code:'TDL'},
    {name:'Bommena(బొమ్మెన)',code:'BMN'},
    {name:'Rajalingampet(రాజాలింగంపేట)',code:'RGL'},
    {name:'Lingampet(లింగంపేట)',code:'LGT'}
  ];


  pincodes=[
  {code:'GMP',pin:'505306'},
  {code:'TDL',pin:'505305'},
  {code:'BMN',pin:'505304'},
  {code:'RGL',pin:'505303'},
  {code:'LGT',pin:'505302'}
]



  
   
  constructor(private ecom:EcommerceServicceService,private fb: FormBuilder) {}

  


  form = new FormGroup({
    full_name: new FormControl('',[ Validators.required ]),
    mobile_number: new FormControl('',[ Validators.required ]),
    altmobilenumber: new FormControl(''),
    houseno: new FormControl(''),
    roadname: new FormControl(''),
    village: new FormControl(this.villageName),
    pincode: new FormControl(this.pinC),
    state: new FormControl('Telangana'),
    country: new FormControl('India')
  });

  


  

  onClickEditAddress(){
    //this.UserDetails.push("'state':'Telangana','country':'India'");
    console.log(this.form.status);
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


  onSubmit() {

    // TODO: Use EventEmitter with form value
       console.log(this.form.value);
   
      // console.log(this.form.status); 
  }


  selected(){
   
   console.log("Village :",this.villageCode);
    this.pincodes.forEach(data=>{
      if(data.code == this.villageCode){ 
        this.pinC = data.pin;
      }
    });
    // this.villages.forEach(res=>{
    //   if(this.villages== this.villageCode){
    //     this.villageName = res.name;
    //   }
    // });

  }



  get fullName(){return this.form.get('full_name')}
  get mobileNumber(){return this.form.get('mobile_number')}

}
