import { SavedSearchListComponent } from './products/search/saved-search-list/saved-search-list.component';
import { SavedSearchItemComponent } from './products/search/saved-search-item/saved-search-item.component';
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

import { ClickOutsideDirective } from './_directives/click-outside.directive';
import { ProductsComponent } from './products/products.component';
import { ProductsAdvancedSearchComponent } from './products/search/products-advanced-search/products-advanced-search.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductSimpleSearchComponent } from './products/search/products-simple-search/products-simple-search.component';
import { LoadingIndicatorComponent } from './common/loading-indicator/loading-indicator.component';

const routes: Routes=[
  {path:'', redirectTo: 'products', canActivate:[AuthGuard], pathMatch:'full'},
  {path:'home',component:HomeComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'products',component:ProductsComponent, canActivate:[AuthGuard], children:[
    {path:':id', component:ProductDetailComponent},
  ]},
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
    ProductSimpleSearchComponent,
    ClickOutsideDirective,
    ProductsComponent,
    ProductsAdvancedSearchComponent,
    ProductsListComponent,
    LoadingIndicatorComponent,
    SavedSearchItemComponent,
    SavedSearchListComponent
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
