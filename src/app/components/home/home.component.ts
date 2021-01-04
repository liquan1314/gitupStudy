import { Component, OnInit } from '@angular/core';
import {NavigationExtras,Router} from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public router:Router) { }
  //跳转的方法
  Navigator():void{
    let queryparams:NavigationExtras={
      queryParams:{
          name:'home组件跳转过来的'
      }
    }
    this.router.navigate(['/child'],queryparams)
  }
  ngOnInit(): void {
  }

}
