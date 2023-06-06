import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/interfaces/author';
import { AuthorService } from 'src/app/services/author.service';
@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent {
  //first we need to get all authors then i get a specific author

  author!: Author;
  author_id!: string

  constructor(private Author: AuthorService,
    private activetedrouter: ActivatedRoute) { }

  ngOnInit() {
    this.author_id = this.activetedrouter.snapshot.params['id']

    this.Author.loadSpecificAuthor(this.author_id);

    this.Author.getSpecificAuthor().subscribe((res:any)=>{
      this.author = res;
    })


  }

}
