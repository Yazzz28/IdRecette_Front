import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DietComponent } from './pages/diet.component';

const routes: Routes = [
  { path: '', component: DietComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DietRoutingModule { }
