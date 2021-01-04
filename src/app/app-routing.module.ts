import {NgModule} from '@angular/core'; //引入NgModule包
import {Routes,RouterModule} from '@angular/router'; //从其他地方引入Routes和RouterModule包
import {HomeComponent} from './components/home/home.component';
import {ChildsComponent} from './components/childs/childs.component';
const routes:Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'child',
    component:ChildsComponent
  },
  // {
  //   path:'',
  //   redirectTo:'/home',
  //   pathMatch:'full', //完全匹配
  // }
]
//这是类的修饰符，对当前引用的这个类进行修饰
@NgModule({
  imports:[RouterModule.forRoot(routes)], //生成路由器
  exports:[RouterModule]
})
//生成一个类并把它到处去
export class  AppRoutingModule{ }
