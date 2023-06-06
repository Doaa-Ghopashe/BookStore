import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  isLog:any;

  constructor( private _authservice :AuthService, private _router:Router)
  {
    this._authservice.logged()
    this.isLog = this._authservice.isLogin;

  }

  logOut()
  {
    localStorage.clear();
    this._router.navigateByUrl("/user/login");
    location.replace('/user/login');
  }

  ngOnInit() {


    var swiper = new Swiper('.books-slider', {
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 9500,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });

   
  }

}