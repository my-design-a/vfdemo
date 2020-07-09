import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { EmpservicceService} from './empservicce.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './ecommerce/products/products.component';
import { CartComponentComponent } from './ecommerce/cartProducts/cart-component/cart-component.component';
import { EcommerceServicceService } from './ecommerce-servicce.service';
import { AdminviewComponent } from './ecommerce/admin/adminview/adminview.component';
import { ProductCategoryComponent } from './ecommerce/productCategory/product-category/product-category.component';
import { LoginComponent } from './ecommerce/Login/login/login.component';
import { SignupComponent } from './ecommerce/SignUp/signup/signup.component';
import { UseraddressComponent } from './ecommerce/address/useraddress/useraddress.component';
import { SearchComponent } from './ecommerce/productsSearch/search/search.component';
import { AngularFireModule } from '@angular/fire';
import { DialogbodyComponent } from './ecommerce/dialogbox/dialogbody/dialogbody.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    
    ProductsComponent,
    
    CartComponentComponent,
    
    AdminviewComponent,
    
    ProductCategoryComponent,
    
    LoginComponent,
    
    SignupComponent,
    
    UseraddressComponent,
    
    SearchComponent,
    
    DialogbodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [EmpservicceService,EcommerceServicceService,{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  entryComponents:[DialogbodyComponent],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
