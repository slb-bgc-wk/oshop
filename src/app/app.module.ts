import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { LoginComponent } from './login/login.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { UserService } from './user.service';

import { getDatabase, provideDatabase } from '@angular/fire/database';
import { AdminGuardService } from './admin-guard.service';
import { ProductsFormComponent } from './admin/products-form/products-form.component';
import { CategoryService } from './category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { CustomFormsModule } from 'ng2-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DataTablesModule } from 'angular-datatables';
import { MaterialDatatableTestComponent } from './material-datatable-test/material-datatable-test.component';
import { CategoryFilterComponent } from './products/category-filter/category-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartService } from './cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingCartComponent,
    MyOrderComponent,
    LoginComponent,
    NavbarComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductsFormComponent,
    MaterialDatatableTestComponent,
    CategoryFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    RouterModule.forRoot([
      {path:'', component: ProductsComponent},
      {path:'products', component: ProductsComponent, canActivate: [AuthGuardService]},
      {path:'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
      {path:'order-success/:id', component: OrderSuccessComponent},
      {path:'admin/products/new', component: ProductsFormComponent, canActivate: [AuthGuardService, AdminGuardService]},
      {path:'admin/products/:id', component: ProductsFormComponent, canActivate: [AuthGuardService, AdminGuardService]},
      {path:'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminGuardService]},
      {path:'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminGuardService]},
      {path:'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuardService]},
      {path:'my/orders', component: MyOrderComponent, canActivate: [AuthGuardService]},
      {path:'login', component: LoginComponent},
      {path:'material-test', component: MaterialDatatableTestComponent},
      {path:'**', component: NotFoundComponent}
    ]),
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    DataTablesModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    AuthService,
    AuthGuardService,
    UserService,
    AdminGuardService,
    CategoryService,
    ProductService,
    CartService,
    OrderService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
