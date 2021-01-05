import { Component, OnInit } from '@angular/core';
import {NavigationExtras,Router} from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  constructor(public router:Router) { }
  //跳转的方法  方法名一般使用小驼峰命名法
  navigate():void{
    //变量名如果没有被重新赋值的话，我们最好使用const 而不是let
    const queryparams:NavigationExtras = {
      queryParams:{
          name:'home组件跳转过来的'
      }
    }
    this.router.navigate(['/child'],queryparams)
  }
  ngOnInit(): void {
  }

}
