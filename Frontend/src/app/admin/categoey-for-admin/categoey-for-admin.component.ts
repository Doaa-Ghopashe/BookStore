import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-categoey-for-admin',
  templateUrl: './categoey-for-admin.component.html',
  styleUrls: ['./categoey-for-admin.component.scss']
})
export class CategoeyForAdminComponent {


  updatedCurrentElementId:any;
  currentPage = 1; // start with the first page
  itemsPerPage = 4; // show 5 items per page

  allCategories:any;
  constructor(private _categoryService: CategoryService)
  {
    this._categoryService.getCategory().subscribe((res)=>
    {
      this.allCategories = res.data.categories;
    })
  }

  addCategoryForm:FormGroup = new FormGroup(
    {
      categoryName: new FormControl('',[Validators.required,Validators.minLength(3), Validators.maxLength(20)]),
    }
  )

  addCategory(form:any)
  {
    let formValue:object = form.value;
    this._categoryService.addCategry(formValue).subscribe(
      {
      next: res => {
        alert(res.status)
        let layer:any = document.getElementById("layer");
        layer.style.display = "none";
      },
      error: err => alert(`${err.error.status} Category is already exist`),
      complete: () => {

      }
    })
    }

    showAddBox()
    {
      let layer:any = document.getElementById("layer");
      layer.style.display = "block";
    }
    closeAddBox()
    {
      let layer:any = document.getElementById("layer");
      layer.style.display = "none";
    }

    showUpdateBox(id:any)
    {
      let updatelayer:any = document.getElementById("updatelayer");
      updatelayer.style.display = "block";
      this.updatedCurrentElementId = id;
    }
    closeUpdateBox()
    {
      let updatelayer:any = document.getElementById("updatelayer");
      updatelayer.style.display = "none";
    }
    updateCategory(form:any)
    {
      let formValue:object = form.value
      this._categoryService.updateCategory(this.updatedCurrentElementId,formValue).subscribe(
        {
        next: res => {
          alert(res.status)
          let updatelayer:any = document.getElementById("updatelayer");
          updatelayer.style.display = "none";
        },
        error: err => alert(`${err.error.status} Category is already exist`),
        complete: () => {
  
        }
      })
    }

    deleteCategory(id:any)
    {
     let prompt:any = window.prompt("Are You Sure to delete plz write yes or no");
     if(prompt == "yes" ||prompt == "Yes" || prompt == "YES" )
     {
        this._categoryService.deleteCategory(id).subscribe((res)=>
        {
          console.log(res.data)
        })
     }
    }

}
