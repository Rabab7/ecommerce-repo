import { Category } from './../../core/interfaces/iproduct';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewChildren, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { FormsModule, NgForm } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';
import { NgClass } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { IWishlist } from '../../core/interfaces/iwishlist';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,FormsModule,SearchPipe,NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy  {
  constructor(private _ProductsService:ProductsService ,private _CategoriesService:CategoriesService , private _CartService:CartService){}
  private readonly _WishListService = inject(WishListService)
  private readonly _ToastrService= inject(ToastrService)
  productsData!:IProduct[]
  productSubscription!:Subscription
  CategoryData!:ICategories[]
  CategorySubscription!:Subscription
  wishlistData!:IWishlist[]
  searchkey:string=''
  heartIcon!:boolean
  product_id!: string
  


  CategoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:1000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  staticCategoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

  ngOnInit(): void {
    this.productSubscription= this._ProductsService.getAllProducts().subscribe({  
      next:(res)=>{
        this.productsData=res.data
      },
    })

    this.CategorySubscription = this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
        this.CategoryData = res.data

      },

    })

  }

  addToCart(p_id:string):void{
    this._CartService.addItemToCart(p_id).subscribe({
      next:(res)=>{
        this._CartService.cartCount.next(res.numOfCartItems)
        this._ToastrService.success(res.message , 'freshCart' , {timeOut:2000 , closeButton:true})

      },
    })
  }

  addToWishlist(p_id:string):void{
    this._WishListService.addItemToWishlist(p_id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message , '❤' , {timeOut:2000 , closeButton:true })  
        this.productsData = this.productsData.map((product) =>
          product._id === p_id ? { ...product, heartIcon: true } : product
        );
        
      },
    })
  }


  ngOnDestroy(): void {
    this.productSubscription.unsubscribe()
    this.CategorySubscription.unsubscribe()
  }

  

  

 



  



}
