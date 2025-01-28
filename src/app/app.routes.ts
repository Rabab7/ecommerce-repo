import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './layouts/main/main.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { authGuard } from './core/guards/auth.guard';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UserAddressesComponent } from './components/user-addresses/user-addresses.component';


export const routes: Routes = [
    {path:'', redirectTo:'login' , pathMatch:"full"},
    {path:'' , component:AuthComponent , children:[
        {path:'' , redirectTo:'login' , pathMatch:"full"},
        {path:'login' , component:LoginComponent , title:'login'} , 
        {path:'register' , component:RegisterComponent ,title:'register'},
        { path: 'forgotPassword', component: ForgetPasswordComponent },
        { path: 'verifyCode', component: VerifyCodeComponent },
        { path: 'resetPassword', component: ResetPasswordComponent },
    ]},
    {path:'' , component:MainComponent  , canActivate:[authGuard], children:[
        {path:'' , redirectTo:'home' , pathMatch:"full"},
        {path:'home' , component:HomeComponent , title:'Home'},
        {path:'categories' , component:CategoriesComponent , title:'Categories'},
        {path:'brands' , component:BrandsComponent , title:'Brands'},
        {path:'cart' , component:CartComponent , title:'Cart'},
        {path:'wishList' , component:WishListComponent , title:'Wish List'},
        {path:'allorders' , component:AllordersComponent , title:'All Orders'},
        {path:'products' , component:ProductsComponent , title:'Products'},
        {path:'address' , component:UserAddressesComponent , title:'All Addresses'},
        {path:'checkout/:cart_id' , component:CheckoutComponent , title:'Check Out'},
        {path:'productDetails/:p_id' , component:ProductDetailsComponent , title:'ProductDetails'}
    ]},



    {path:"**" , component:NotFoundComponent , title:'notFound'}
];
