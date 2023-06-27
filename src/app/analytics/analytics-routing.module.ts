import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ItemComponent } from './analytics/item/item.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent
  },
  {
    path: 'item/:id',
    component: ItemComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class AnalyticsRoutingModule { }