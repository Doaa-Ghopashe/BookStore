import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-catrgories',
  templateUrl: './catrgories.component.html',
  styleUrls: ['./catrgories.component.scss']
})
export class CatrgoriesComponent {
  allCategories!:any[];

 // items: any[]=[]; // your list of items
  currentPage = 1; // start with the first page
  itemsPerPage = 5; // show 5 items per page
constructor(private _category:CategoryService, private _Route: Router){
  _category.getCategory().subscribe((res)=>{
    this.allCategories=res.data.categories  
  })
}
  getDetailsForGategory(id:any)
  {
    this._Route.navigateByUrl(`categoryDetails/${id}`)
  }
}