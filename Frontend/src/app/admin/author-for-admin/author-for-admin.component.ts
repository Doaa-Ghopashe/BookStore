
import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import {FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-for-admin',
  templateUrl: './author-for-admin.component.html',
  styleUrls: ['./author-for-admin.component.scss']
})
export class AuthorForAdminComponent {

  imagefile!:File;
  updatedCurrentElementId:any;
  currentPage = 1; // start with the first page
  itemsPerPage = 4; // show 5 items per page

  allAuthores:any;
  constructor(private __authServices: AuthorService,private fbuilder:FormBuilder)
  {
    this.__authServices.getAuthor().subscribe((res)=>
    {
      console.log(res);
      this.allAuthores = res;
      console.log(this.allAuthores)
    })

  }

  addAuthorForm:FormGroup = new FormGroup(
    {
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      birthOfDate :  new FormControl('',[Validators.required]),
      breif : new FormControl('',[Validators.required]),
      Image : new FormControl('',[Validators.required]),
    }
  )

  updateAuthorForm:FormGroup = new FormGroup(
    {
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      birthOfDate :  new FormControl('',[Validators.required]),
      breif : new FormControl('',[Validators.required]),
      Image : new FormControl('',[Validators.required]),
    }
  )


  addphoto(event:any){
    if(event.target.files.length>0){
     console.log(event.target.files.length);
      this.imagefile=event.target.files[0];
      this.addAuthorForm.patchValue({
        photo:this.imagefile
      });
    }
  }

  addAuthor()
  {
    const formdata=new FormData();
      formdata.append('firstName',this.addAuthorForm.get('firstName')?.value)
      formdata.append('lastName',this.addAuthorForm.get('lastName')?.value)
      formdata.append('dateOfBirth',this.addAuthorForm.get('birthOfDate')?.value)
      formdata.append('breif',this.addAuthorForm.get('breif')?.value)
      formdata.append('Image',this.imagefile)
        this.__authServices.addAuthor(formdata).subscribe(
      {
        
   next: res => {
        alert('Added Successfully');
        console.log(res)
        let layer:any = document.getElementById("layer");
        layer.style.display = "none";
        location.replace("admin/authors");
      },
      error: err => console.log(`${err} Author is already exist`),
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

    updateAuthor()
    {
      const formdata=new FormData();
      formdata.append('firstName',this.updateAuthorForm.get('firstName')?.value)
      formdata.append('lastName',this.updateAuthorForm.get('lastName')?.value)
      formdata.append('birthOfDate',this.updateAuthorForm.get('birthOfDate')?.value)
      formdata.append('breif',this.updateAuthorForm.get('breif')?.value)

      formdata.append('photo',this.imagefile)
      
      this.__authServices.updateAuthor(this.updatedCurrentElementId,formdata).subscribe(
        {
        next: res => {
          alert('Update Successfully')
          let updatelayer:any = document.getElementById("updatelayer");
          updatelayer.style.display = "none";
          location.replace("/admin/authors");
        },
        error: err => alert(`${err.error.status} Author is already exist`),
        complete: () => {
  
        }
      })
    }

    deleteAuthor(id:any)
    {
     let prompt:any = window.prompt("Are You Sure to delete plz write yes or no");
     if(prompt == "yes" ||prompt == "Yes" || prompt == "YES" )
     {
        this.__authServices.deleteAuthor(id).subscribe(
          {
          next: res => {
            alert('Deleted Successfully');
            location.replace("/admin/authors");
          },
          error: err => console.log(`PLZ tray again`),
          complete: () => {
    
         }
        })
     }
    }
}