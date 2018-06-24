import { AuthGuard } from './_guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { AcSearchComponent } from './ac-search/ac-search.component';
import { ClickOutsideDirective } from './_directives/click-outside.directive';
import { ProductsComponent } from './products/products/products.component';
import { ProductsAdvancedSearchComponent } from './products/products-advanced-search/products-advanced-search.component';

const routes: Routes=[
  {path:'', redirectTo: 'products', canActivate:[AuthGuard], pathMatch:'full'},
  {path:'home',component:HomeComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'products',component:ProductsComponent, canActivate:[AuthGuard], children:[
    {path:':id', component:ProductDetailComponent},
  ]},
  {path:'prod-adv-search',component:ProductsAdvancedSearchComponent, canActivate:[AuthGuard]},
  {path:'**', redirectTo:''}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ProductDetailComponent,
    AcSearchComponent,
    ClickOutsideDirective,
    ProductsComponent,
    ProductsAdvancedSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
