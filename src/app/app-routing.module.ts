import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ItemComponent } from './item/item.component';
import {HomeComponent} from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path:'home', 
    component:HomeComponent
  },
  {
    path:'tag/:tag', 
    component:HomeComponent
  },
  {
    path:'food/:id', 
    component:ItemComponent
  },
  {
    path:'cart-page', 
    component: CartPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'analytics',
    canLoad: [RoleGuard],
    loadChildren: () => {
      return import('./analytics/analytics.module').then(
          mudule => mudule.AnalyticsModule
      )
  }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }