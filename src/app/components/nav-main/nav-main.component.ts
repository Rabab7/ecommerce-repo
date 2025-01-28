import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})
export class NavMainComponent implements OnInit , OnDestroy {
  private readonly _Router = inject(Router)
  private readonly _CartService= inject(CartService)
  isMenuOpen:boolean = false;

  numCartItems!:number
  cartSub!:Subscription

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.numCartItems = res.numOfCartItems
      }
    })


    this.cartSub=this._CartService.cartCount.subscribe({
      next:(value)=>{
        this.numCartItems = value
      }
    })
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    
  }

  closeMenu():void{
    this.isMenuOpen = false;
    
  }

  logout():void{
    sessionStorage.removeItem('token')
    setTimeout(()=>{
      this._Router.navigate(['/login'])
    } , 2000)
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe()
  }

}
