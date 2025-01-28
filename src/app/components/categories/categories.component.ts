import { Category } from './../../core/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { error } from 'console';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  private readonly _CategoriesService= inject(CategoriesService)

  CategoriesData!:ICategories[]

  ngOnInit(): void {
    this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
        this.CategoriesData=res.data

      }
    })
  }

 

 
}
