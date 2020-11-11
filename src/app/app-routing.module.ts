import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndingPageComponent } from './ending-page/ending-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path:"", component:MainPageComponent},
  {path:"winner", component:EndingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
